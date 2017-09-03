import {AsyncStorage} from 'react-native';
import async from 'async';
import _ from 'lodash';

export var savedState = {};

// Function loads application data on application load
export const getInitialState = (callback) => {
    // default demo data
    var state = {
        mode: 'relay_list',
        settings: {
            host: 'http://localhost',
            port: 8082
        },
        relays: [
            {id:1,name:'Water pump'},
            {id:2,name:'Empty now'},
            {id:3,name:'Lamp'},
            {id:4,name:'Fan'},
            {id:5,name:'Empty now'},
            {id:6,name:'Empty now'},
            {id:7,name:'Empty now'},
            {id:8,name:'Empty now'},
            {id:9,name:'Empty now'},
            {id:10,name:'Empty now'},
            {id:11,name:'Empty now'},
            {id:12,name:'Empty now'}
        ],
        status: [0,0,1,0,0,0,0,0,0,0,0,0],
        loaded: true,
        errors: {
            settings: {},
            relays: {}
        }
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
        // Getting relay settings from local storage
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
        // Based on Global settings, requesting server to obtain current status of relays
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

// Utility function which returns array of indexes of "collection" items, with provided "id" attribute
export const getObjectKeysById = (id,collection) => {
    var result = [];
    for (var key in collection) {
        if (collection[key].id == id) {
            result.push(key);
        }
    }
    return result;
}