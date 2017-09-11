import _ from 'lodash';
import actions from '../actions/RelayListActions';

var RelayListReducer = (state,action) => {
    if (typeof(state) == 'undefined') {
        state = {
            relays: [],
            status: []
        }
    }
    var newState = _.cloneDeep(state);
    switch (action.type) {
        case actions.types.UPDATE_STATUS:
            newState.status = action.status;
            break;
    }
    return newState;
};

export default RelayListReducer;
