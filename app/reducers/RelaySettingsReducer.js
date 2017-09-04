import _ from 'lodash';
import actions from '../actions/RelaySettingsActions';

var RelaySettingsReducer = (state,action) => {
    if (typeof(state) == 'undefined') {
        state = {
            id: 0,
            name: '',
            index: null,
            errors: {}
        }
    }
    var newState = _.cloneDeep(state);

    switch (action.type) {
        case actions.types.SET_RELAY_SETTINGS_ERRORS:
            newState.errors = {};
            for (var i in action.errors) {
                newState.errors[i] = action.errors[i];
            }
            break;
        case actions.types.CHANGE_RELAY_NUMBER_FIELD:
            newState.id = action.value;
            break;
        case actions.types.CHANGE_RELAY_NAME_FIELD:
            newState.name = action.value;
            break;
        case actions.types.EDIT_RELAY:
            newState.id = action.id;
            newState.name = action.name;
            newState.index = action.index;
            newState.errors = {};
            break;
    }
    return newState;
};

export default RelaySettingsReducer;
