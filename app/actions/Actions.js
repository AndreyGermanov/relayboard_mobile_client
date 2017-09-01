import {getInitialState,saveSettings} from '../utils/Utils';

export const updateState = (state) => {
    return {
        type: 'UPDATE_STATE',
        state: state
    }
}

export const loadState = () => {
    return (dispatch) => {
        getInitialState(function(state) {
            dispatch(updateState(state));
        })
    }
}

export const showDeleteRelayAlertDialog = (number) => {
    return {
        type: 'DISPLAY_DELETE_CONFIRMATION_DIALOG',
        number: number
    }
}

export const updateMode = (mode) => {
    return {
        type: 'UPDATE_MODE',
        mode: mode
    }
}

export const removeRelay = (number) => {
    return {
        type: 'DELETE_RELAY',
        number: number
    }
}

export const deleteRelay = (number,mode) => {
    return (dispatch,getState) => {
        if (mode == 1) {
            dispatch(showDeleteRelayAlertDialog(number));
        } else if (mode == 2) {
            dispatch(removeRelay(number));
            saveSettings(getState());
        }
    }
}

export const switchRelay = (number) => {
    return (dispatch,getState) => {
        var state = getState();
        var mode = 'ON';
        if (state.status[number-1]==1) {
            mode = 'OFF';
        }
        fetch('http://192.168.0.107:'+state.settings.port+'/request/'+mode+'/'+number).then(function(response) {
            dispatch(loadState());
        },function(err) {
        });
    }
}

