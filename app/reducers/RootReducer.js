import _ from 'lodash';
import {savedState} from '../utils/Utils';
import AppSettingsReducer from './AppSettingsReducer';
import RelaySettingsReducer from './RelaySettingsReducer';
import RelayListReducer from './RelayListReducer';
import actions from '../actions/AppActions';

var RootReducer = (state,action) => {
    // Define default empty application state
    if (typeof(state) == 'undefined') {
        state = {
            RelayList: {
                relays: [],
                status: []
            },
            AppSettings: {},
            RelaySettings: {},
            mode: 'relay_list',
            loaded: false,
            current_relay: 0
        }
    }

    var newState = _.cloneDeep(state);

    newState.AppSettings = AppSettingsReducer(state.AppSettings,action);
    newState.RelayList = RelayListReducer(state.RelayList,action);
    newState.RelaySettings = RelaySettingsReducer(state.RelaySettings,action);

    switch(action.type) {
        // Application level actions
        case actions.types.UPDATE_STATE:
            if (action.state.relays) {
                newState.RelayList.relays = _.orderBy(_.cloneDeep(action.state.relays),['id'],['asc']);
            }
            if (action.state.status) {
                newState.RelayList.status = _.cloneDeep(action.state.status);
            }
            if (action.state.settings) {
                newState.AppSettings = _.cloneDeep(action.state.settings);
                newState.AppSettings.errors = {};
            }
            newState.loaded = true;
            newState.current_relay = 0;
            break;
        case actions.types.UPDATE_MODE:
            if (newState.mode == 'relay_list') {
                newState.current_relay = 0;
            } else if (newState.mode == 'app_settings' && action.mode == 'relay_list') {
                newState.AppSettings.host = savedState.settings.host;
                newState.AppSettings.port = savedState.settings.port;
                newState.AppSettings.errors = {};
            } else if (newState.mode == 'relay_settings' && action.mode == 'relay_list') {
                if (newState.current_relay) {
                    newState.RelaySettings.id = '';
                    newState.RelaySettings.index = null;
                    newState.RelaySettings.name = '';
                    newState.current_relay = null;
                    newState.RelaySettings.errors = {};
                }
            }
            newState.mode = action.mode;
            break;
        case actions.types.DISPLAY_DELETE_CONFIRMATION_DIALOG:
            newState.mode = 'confirm_delete';
            newState.current_relay = action.number;
            break;
        default:
    }

    return newState;
};

export default RootReducer;