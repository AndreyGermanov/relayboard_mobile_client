import _ from 'lodash';
import actions from '../actions/RelayListActions';

var RelayListReducer = (state,action) => {
    if (typeof(state) == 'undefined') {
        state = {
            relayboards: [],
            currentRelayBoard: null
        }
    }
    var newState = _.cloneDeep(state);
    switch (action.type) {
        case actions.types.UPDATE_STATUS:
            newState.relayboards = null;
            newState.relayboards = _.cloneDeep(action.relayboards);
            newState.currentRelayBoard = action.currentRelayBoard;
            break;
        case actions.types.UPDATE_CURRENT_RELAYBOARD: {
            newState.currentRelayBoard = action.currentRelayBoard;
            break;
        }
    }
    return newState;
};

export default RelayListReducer;
