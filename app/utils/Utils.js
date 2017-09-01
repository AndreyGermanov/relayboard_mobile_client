import {AsyncStorage} from 'react-native';
export const getInitialState = (callback) => {
    var state = {
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
        loaded: true
    }

    // Get general settings from Application storage
    AsyncStorage.getItem('settings').then(function(result) {
        var settings = result;
        if (settings) {
            try {
                settings = JSON.parse(settings);
                state.settings = settings;
            } catch (e) {
            }
        }
        AsyncStorage.getItem('relays').then(function(result) {
            var relays = result;
            if (relays) {
                try {
                    state.relays = JSON.parse(relays);
                } catch(e) {

                }
            }
            // Request Relayboard to get current status of relays
            fetch('http://192.168.0.107:'+state.settings.port+'/request/STATUS').then(function(response) {
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
        })
    });


}

export const saveSettings = (state) => {
    AsyncStorage.setItem('settings',JSON.stringify(state.settings));
    AsyncStorage.setItem('relays',JSON.stringify(state.relays));
}
