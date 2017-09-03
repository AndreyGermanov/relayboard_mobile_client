import {savedState,findObjectKeysById} from '../utils/Utils';
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
            }
            newState.mode = action.mode;
            break;
        case 'DELETE_RELAY':
            var relays = _.cloneDeep(newState.relays);
            var keys = findObjectKeysById(relays,action.number);
            while (keys.length) {
                delete relays[keys[0]];
                keys = findObjectKeysById(relays,action.number);
            }
            newState.relays = _.cloneDeep(relays);
            newState.mode = 'relay_list';
            break;
        case 'CLEAR_SETTINGS_ERRORS':
            newState.errors.settings = {};
            break;
        case 'SET_SETTINGS_ERRORS':
            newState.errors.settings = {};
            for (var i in action.errors) {
                newState.errors.settings[i] = action.errors[i];
            }
            break;
        case 'CHANGE_PORT_FIELD':
            newState.settings.port = action.value;
            break;
        case 'CHANGE_HOST_FIELD':
            newState.settings.host = action.value;
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