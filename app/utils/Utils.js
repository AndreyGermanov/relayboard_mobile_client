import {AsyncStorage} from 'react-native';
import async from 'async';
import _ from 'lodash';

export var savedState = {};

// Function loads application data on application load
export const getInitialState = (callback) => {
    // default demo data
    var state = {
        settings: {
            host: 'http://localhost',
            port: 8082
        },
        relays: [
            {id:1,name:'Empty now'},
            {id:2,name:'Empty now'},
            {id:3,name:'Empty now'},
            {id:4,name:'Empty now'},
            {id:5,name:'Empty now'},
            {id:6,name:'Empty now'},
            {id:7,name:'Empty now'},
            {id:8,name:'Empty now'},
            {id:9,name:'Empty now'},
            {id:10,name:'Empty now'},
            {id:11,name:'Empty now'},
            {id:12,name:'Empty now'}
        ],
        status: [0,0,1,0,0,0,0,0,0,0,0,0]
    }
    // Get general settings from Application storage
    async.series([
        // Getting global application settings from local storage
        function(callback) {
            AsyncStorage.getItem('settings').then(function(result) {
                var settings = result;
                if (settings) {
                    try {
                        settings = JSON.parse(settings);
                        if (settings.host) {
                            state.settings = settings;
                        }
                        callback();
                    } catch (e) {
                        callback();
                    }
                } else {
                    callback();
                }
            })
        },
        // Getting relay settings from local storage
        function(callback) {
            AsyncStorage.getItem('relays').then(function(result) {
                var relays = result;
                if (relays) {
                    try {
                        relays = JSON.parse(relays);
                        if (relays.length) {
                            state.relays = relays;
                        }
                        callback();
                    } catch (e) {
                        callback();
                    }
                } else {
                    callback();
                }
            });
        },
        // Based on Global settings, requesting server to obtain current status of relays
        function(callback) {
            if (state.settings.host && state.settings.port) {
                fetch(state.settings.host+':'+state.settings.port+'/request/STATUS').then(function(response) {
                    if (response.ok) {
                        var response = response.json();
                        if (typeof(response['STATUS'] != 'undefined') && response['STATUS']) {
                            state.status = response.json();
                        }
                    };
                    callback();
                }).catch(function() {
                    callback();
                })
            } else {
                callback();
            }
        }
    ],function() {
        // Persist this as etalon state
        savedState = _.cloneDeep(state);
        // return loaded state to calling function
        if (callback) {
            callback(state);
        }
    });
}

// Save current state of application to local storage
export const saveSettings = (state,callback) => {
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
        },
        // save relay settings
        function(callback) {
            if (state.relays) {
                AsyncStorage.setItem('relays', JSON.stringify(state.relays))
                    .then(function() {
                        callback();
                    })
            } else {
                callback();
            }
        }
    ],function() {
        if (callback) {
            callback();
        }
    });
}

export const getObjectKeysById = (id,collection) => {
    var result = [];
    for (var key in collection) {
        if (collection[key].id == id) {
            result.push(key);
        }
    }
    return result;
}

export const getMaxId = (collection) =>{
    var max = 0;
    for (var i in collection) {
        if (collection[i].id>max) {
            max = collection[i].id;
        }
    }
    return max;
}

export const findFreeId = (collection) => {
    var current_id = 0;
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