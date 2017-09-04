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
    return newState;
};

export default RelayListReducer;
