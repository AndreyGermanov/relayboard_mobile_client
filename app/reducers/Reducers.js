import {savedState,getObjectKeysById} from '../utils/Utils';
import _ from 'lodash';

var Reducer = (state,action) => {
    if (typeof(state) == 'undefined') {
        state = {
            settings: {},
            relays: [],
            status: [],
            loaded: false,
            mode: 'relay_list',
            current_relay: 0
        }
    };
    var newState = _.cloneDeep(state);
    
    switch(action.type) {
        case 'UPDATE_STATE':
            newState = _.cloneDeep(action.state);
            break;
        case 'DISPLAY_DELETE_CONFIRMATION_DIALOG':
            newState.mode = 'confirm_delete';
            newState.current_relay = action.number;
            break;
        case 'UPDATE_MODE':
            if (newState.mode == 'relay_list') {
                newState.current_relay = 0;
            } else if (newState.mode == 'app_settings' && action.mode == 'relay_list') {
                newState.settings.host = savedState.settings.host;
                newState.settings.port = savedState.settings.port;
                newState.errors = {};
            } else if (newState.mode == 'relay_settings' && action.mode == 'relay_list') {
                if (newState.current_relay) {
                    var index = getObjectKeysById(newState.current_relay,savedState.relays);
                    newState.relays[index].id = savedState.relays[index].id;
                    newState.relays[index].name = savedState.relays[index].name;
                    newState.current_relay = null;
                    newState.errors = {};
                }
            }
            newState.mode = action.mode;
            break;
        case 'DELETE_RELAY':
            var relays = _.cloneDeep(newState.relays);
            var keys = getObjectKeysById(action.number,relays);
            newState.current_relay = null;
            if (keys) {
                while (keys.length) {
                    delete relays.splice(keys[0],1);
                    keys = getObjectKeysById(action.number,relays);
                }
            }

            newState.relays = _.cloneDeep(relays);
            newState.mode = 'relay_list';
            break;
        case 'CLEAR_SETTINGS_ERRORS':
            newState.errors = {};
            break;
        case 'CLEAR_RELAYS_ERRORS':
            newState.errors = {};
            break;
        case 'SET_SETTINGS_ERRORS':
            newState.errors = {};
            for (var i in action.errors) {
                newState.errors[i] = action.errors[i];
            }
            break;
        case 'SET_RELAY_SETTINGS_ERRORS':
            newState.errors = {};
            for (var i in action.errors) {
                newState.errors[i] = action.errors[i];
            }
            break;
        case 'CHANGE_PORT_FIELD':
            newState.settings.port = action.value;
            break;
        case 'CHANGE_HOST_FIELD':
            newState.settings.host = action.value;
            break;
        case 'CHANGE_RELAY_NUMBER_FIELD':
            newState.relays[action.index].id = action.value;
            break;
        case 'CHANGE_RELAY_NAME_FIELD':
            newState.relays[action.index].name = action.value;
            break;
        case 'EDIT_RELAY':
            newState.current_relay = action.number;
            newState.mode = 'relay_settings';
            break;
        default:
    }
    
    return newState;
}

export default Reducer;