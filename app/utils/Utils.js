import {AsyncStorage} from 'react-native';
export const getInitialState= (callback) => {
    var state = {
        settings: {
            host: 'http://localhost',
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
        loaded: true
    }

    // Get general settings from Application storage
    var settings = AsyncStorage.getItem('settings');
    if (settings) {
        try {
            settings = JSON.parse(settings);
            state.settings = settings;
        } catch (e) {
        }
    }

    // Get settings of relays from Application storage
    var relays = AsyncStorage.getItem('relays');
    if (relays) {
        try {
            state.relays = JSON.parse(relays);
        } catch(e) {

        }
    }

    // Request Relayboard to get current status of relays
    fetch(state.settings.host+':'+state.settings.port).then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network error');
        }
    }).then(function(responseJSON) {
        if (responseJSON && responseJSON['STATUS']) {
            state.status = responseJSON['STATUS'].split(',');
        }
        if (callback) {
            callback(state);
        }
    }).catch(function(e) {
        if (callback) {
            callback(state);
        }
    })
}

export const saveSettings = (state) => {
    AsyncStorage.setItem('settings',JSON.stringify(state.settings));
    AsyncStorage.setItem('relays',JSON.stringify(state.relays));
}
