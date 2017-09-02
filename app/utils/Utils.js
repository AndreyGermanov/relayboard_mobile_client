import {AsyncStorage} from 'react-native';
import async from 'async';
import _ from 'lodash';

export var savedState = {};

export const getInitialState = (callback) => {
    var state = {
        mode: 'relay_list',
        settings: {
            host: 'http://192.168.0.107',
            port: 8082
        },
        relays: {
            1: 'Water Pump',
            2: 'Empty now',
            3: 'Lamp',
            4: 'Fan',
            5: 'Empty now',
            6: 'Empty now',
            7: 'Empty now',
            8: 'Empty now',
            9: 'Empty now',
            10: 'Empty now',
            11: 'Empty now',
            12: 'Empty now',
        },
        status: [0,0,1,0,0,0,0,0,0,0,0,0],
        loaded: true,
        errors: {
            settings: {},
            relays: {}
        }
    }

    // Get general settings from Application storage
    async.series([
        function(callback) {
            AsyncStorage.getItem('settings').then(function(result) {
                var settings = result;
                if (settings) {
                    try {
                        settings = JSON.parse(settings);
                        state.settings = settings;
                        callback();
                    } catch (e) {
                        callback();
                    }
                } else {
                    callback();
                }
            })
        },
        function(callback) {
            AsyncStorage.getItem('relays').then(function(result) {
                var relays = result;
                if (relays) {
                    try {
                        state.relays = JSON.parse(relays);
                        callback();
                    } catch (e) {
                        callback();
                    }
                } else {
                    callback();
                }
            });
        },
        function(callback) {
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
        }
    ],function() {
        savedState = _.cloneDeep(state);
        if (callback) {
            callback(state);
        }
    });
}

export const saveSettings = (state,callback) => {
    async.series([
        function(callback) {
            if (state.settings) {
                AsyncStorage.setItem('settings', JSON.stringify(state.settings))
                    .then(function() {
                        callback();
                    });
            } else {
                callback();
            }
        },
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
