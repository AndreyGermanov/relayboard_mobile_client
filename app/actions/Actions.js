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

export const updateMode = (mode,options) => {
    return {
        type: 'UPDATE_MODE',
        mode: mode,
        options: options
    }
}

export const removeRelay = (number) => {
    return {
        type: 'DELETE_RELAY',
        number: number
    }
}

export const clearSettingsErrors = () => {
    return {
        type: 'CLEAR_SETTINGS_ERRORS'
    }
}

export const setSettingsErrors = (errors) => {
    return {
        type: 'SET_SETTINGS_ERRORS',
        errors: errors
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

export const changeHostField = (value) => {
    return {
        type: 'CHANGE_HOST_FIELD',
        value: value
    }
}

export const changePortField = (value) => {
    return {
        type: 'CHANGE_PORT_FIELD',
        value: value
    }
}

export const editRelay = (number) => {
    return {
        type: 'EDIT_RELAY',
        number: number
    }
}

