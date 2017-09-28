import async from 'async';
import _ from 'lodash';
import {AsyncStorage} from 'react-native';
import Meteor from 'react-native-meteor';

const Store = class {
    constructor() {
        this.settings = {
            app: {
                host: 'localhost',
                port: '80',
                login: '',
                password: '',
                mode: 'local',
                errors: {}
            },
            relayboards: {}
        };
        this.http_protocol = 'http://';
        this.ws_protocol = 'wss://';
        this.relayboards = {};
        this.currentRelayBoard = null;
        this.lastUpdateTime = 0;
        this.lastConfigUpdateTime = 0;
        this.commandResponseCallbacks = {};
    }

    getSettings(callback) {
        var result = {}

        var self = this;
        // Get general settings from Application storage
        async.series([
            // Getting global application settings from local storage
            function(callback) {
                AsyncStorage.getItem('settings').then(function(response) {
                    var settings = response;
                    if (settings) {
                        try {
                            settings = JSON.parse(settings);
                            if (settings.host) {
                                result.app = settings;
                            }
                            callback();
                        } catch (e) {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }, function(err) {
                    try {
                        callback();
                    } catch(e) {};
                })
            },
        ],function() {
            if (result.app) {
                self.settings.app = result.app;
            };
            if (result.relayboards) {
                self.settings.relayboards = result.relayboards;
            };
            // return loaded settings to calling function
            if (callback) {
                callback(self.settings);
            }
        });
    }

    getRelayStatus(callback) {
        var self = this;
        if (self.settings && self.settings.app) {
            if (typeof(self.settings.app.mode) == 'undefined' || self.settings.app.mode != 'portal') {
                fetch(self.http_protocol+self.settings.app.host + ':' + self.settings.app.port + '/request/STATUS').then(function (response) {
                    if (response.ok) {
                        response.json().then(function(json) {
                            if (typeof(json != 'undefined') && json) {
                                var status = json.split(',');
                                var relays = _.cloneDeep(self.settings.relays);
                                var changed_relays = {};
                                var changed = false;
                                for (var i in status) {
                                    if (!relays[i]) {
                                        changed_relays[i] = {
                                            id: i+1,
                                            name: 'Empty now'
                                        }
                                    } else {
                                        changed_relays[i] = relays[i];
                                    }
                                };
                                if (changed) {
                                    self.saveSettings({relays:changed_relays}, function() {
                                        callback(json.split(','), true);
                                    })
                                } else {
                                    callback(json.split(','));
                                }
                            }
                        });
                    } else {
                        callback();
                    }
                }).catch(function () {
                    callback();
                })
            } else if (self.settings.app.mode == 'portal') {
                async.series([
                    function(callback) {
                        if (!self.isConnectedToPortal()) {
                            var timeout = setTimeout(function() {
                                try {
                                    callback();
                                } catch(e) {}
                            },3000)
                            self.connectToPortal(function(err) {
                                clearTimeout(timeout);
                                try {
                                    callback();
                                } catch(e) {}
                            })
                        } else {
                            callback();
                        }
                    },function(callback) {
                        try {
                           var timeout = setTimeout(function() {
                               try {
                                   callback();
                               } catch(e) {}
                            },3000)
                            Meteor.call('getStatus', {lastConfigUpdateTime:self.lastConfigUpdateTime}, function (err, result) {
                                clearTimeout(timeout);
                                try {
                                    result = JSON.parse(result);
                                } catch (e) {

                                }
                                if (result && typeof(result) == 'object') {
                                    self.lastUpdateTime = Date.now();
                                    var statuses = result.statuses;
                                    var responses = result.command_responses;
                                    for (var i in statuses) {
                                        data = statuses[i];
                                        if (!self.currentRelayBoard) {
                                            self.currentRelayBoard = data.id;
                                        }
                                        if (!self.relayboards[data.id]) {
                                            self.relayboards[data.id] = {};
                                        }
                                        if (typeof(data.config) != 'undefined' && data.config) {
                                            self.relayboards[data.id].config = data.config;
                                            self.lastConfigUpdateTime = Date.now();
                                        }
                                        if (typeof(data.status) != 'undefined' && data.status) {
                                            self.relayboards[data.id].status = data.status;
                                            if (responses && _.toArray(responses) &&
                                                responses[self.currentRelayBoard] && _.toArray(responses[self.currentRelayBoard]).length) {
                                                for (var i in responses[self.currentRelayBoard]) {
                                                    if (self.commandResponseCallbacks[i]) {
                                                        self.commandResponseCallbacks[i](responses[self.currentRelayBoard][i]);
                                                    }
                                                }
                                            }
                                            try {
                                                callback();
                                            } catch (e) {

                                            }
                                        } else {
                                            try {
                                                callback({});
                                            } catch(e) {}
                                        }
                                    }
                                }
                            })
                        } catch (e) {
                            callback();
                        }
                    }
                ],function(res,res1) {
                    callback(self.relayboards,self.currentRelayBoard);
                });
            }
        } else {
            callback();
        }
    };

    saveSettings(state,callback) {
        var self = this;
        async.series([
            function(callback) {
                // save global application settings
                if (state.settings) {
                    AsyncStorage.setItem('settings', JSON.stringify(state.settings))
                        .then(function() {
                            callback();
                        });
                } else {
                    callback();
                }
            }
        ],function() {
            self.lastUpdateTime = 0;
            if (callback) {
                callback();
            }
        });
    };
    
    switchRelay(relayboard_id,index,callback) {
        var mode = 'ON';
        if (this.relayboards[relayboard_id].status[index]==1) {
            mode = 'OFF';
        };
        var number = this.relayboards[relayboard_id].config.pins[index].number;
        var self = this;
        if (this.settings.app.mode == 'local') {
            fetch(this.http_protocol+this.settings.app.host + ':' + this.settings.app.port + '/request/' + mode + '/' + number).then(function (response) {
                if (response.ok) {
                    response.json().then(function(json) {
                        if (typeof(json['STATUS'] != 'undefined') && json['STATUS']) {
                            callback(json['STATUS'].split(','));
                        }
                    });
                } else {
                    callback();
                }
            }, function (err) {
                if (callback) {
                    callback();
                }
            });
        } else if (this.settings.app.mode == 'portal') {
            if (this.isConnectedToPortal()) {
                Meteor.call('switchRelay', {id:this.currentRelayBoard, number:number,mode:mode}, function (err, result) {
                    if (callback) {
                        try {
                            result = JSON.parse(result);
                        } catch (e) {
                        }
                        if (result.status == 'ok') {
                            self.commandResponseCallbacks[result.request_id] = (result) => {
                                callback(result['STATUS'].split(','));
                            }
                        }
                    }
                });
            }
        }
    };

    connectToPortal(callback) {
        var self = this;
        if (this.settings.app.login && this.settings.app.password) {
            if (!this.isConnectedToPortal()) {
                Meteor.connect(this.ws_protocol + this.settings.app.host + ':' + this.settings.app.port + '/websocket');
                Meteor.loginWithPassword(self.settings.app.login, self.settings.app.password, function (err) {
                    callback();
                })
            }
        }
    }

    isConnectedToPortal() {
        return Date.now()-this.lastUpdateTime<=20000;
    }

    getObjectKeysById(id,collection) {
        var collection = this.settings.relays;
        var result = [];
        for (var key in collection) {
            if (collection[key].id == id) {
                result.push(key);
            }
        }
        return result;
    }

    getMaxId(collection) {
        var collection = this.settings.relays;
        var max = 0;
        for (var i in collection) {
            if (collection[i].id>max) {
                max = collection[i].id;
            }
        }
        return max;
    }

    findFreeId(collection) {
        var current_id = 0;
        var collection = this.settings.realys;
        for (var i in collection) {
            if (collection[i].id-current_id>1) {
                return collection[i].id-1;
            }
            current_id = collection[i].id;
            if (current_id>12) {
                return null;
            }
        }
        return null;
    }
}

export default new Store();