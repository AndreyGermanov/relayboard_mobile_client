var Reducer = (state,action) => {
    if (typeof(state) == 'undefined') {
        state = {
            settings: {},
            relays: {},
            status: [],
            loaded: false,
            mode: 'relay_list',
            current_relay: 0
        }
    };
    var newState = Object.assign({},state);
    
    switch(action.type) {
        case 'UPDATE_STATE':
            newState = Object.assign({},action.state);
            break;
        case 'DISPLAY_DELETE_CONFIRMATION_DIALOG':
            newState.mode = 'confirm_delete';
            newState.current_relay = action.number;
            break;
        case 'UPDATE_MODE':
            newState.mode = action.mode;
            if (newState.mode == 'relay_list') {
                newState.current_relay = 0;
            }
            break;
        case 'DELETE_RELAY':
            var relays = Object.assign({},newState.relays);
            delete relays[action.number];
            newState.relays = Object.assign({},relays);
            newState.mode = 'relay_list';
            break;
        default:
    }
    
    return newState;
}

export default Reducer;