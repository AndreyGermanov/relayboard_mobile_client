import _ from 'lodash';
import actions from '../actions/AppSettingsActions';

var AppSettingsReducer = (state,action) => {
    if (typeof(state) == 'undefined') {
        state = {
            host: 'localhost',
            port: '8082',
            mode: 'local',
            login: '',
            password: '',
            errors: {}
        };
    }
    var newState = _.cloneDeep(state);
    switch(action.type) {
        case actions.types.CHANGE_PORT_FIELD:
            newState.port = action.value;
            break;
        case actions.types.CHANGE_HOST_FIELD:
            newState.host = action.value;
            break;
        case actions.types.CHANGE_MODE_FIELD:
            newState.mode = action.value;
            break;
        case actions.types.CHANGE_LOGIN_FIELD:
            newState.login = action.value;
            break;
        case actions.types.CHANGE_PASSWORD_FIELD:
            newState.password = action.value;
            break;
        case actions.types.SET_SETTINGS_ERRORS:
            newState.errors = {};
            for (var i in action.errors) {
                newState.errors[i] = action.errors[i];
            }
            break;
    }

    return newState;
};

export default AppSettingsReducer;