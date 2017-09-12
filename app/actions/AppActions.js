import Store from '../store/Store';

var AppActions = class {
    constructor() {
        this.types = {
            UPDATE_STATE: 'UPDATE_STATE',
            UPDATE_MODE: 'UPDATE_MODE',
            DISPLAY_DELETE_CONFIRMATION_DIALOG: 'DISPLAY_DELETE_CONFIRMATION_DIALOG'
        }
    }

    updateState(state) {
        return {
            type: this.types.UPDATE_STATE,
            state: state
        }
    }

    loadState()  {
        var self = this;
        return (dispatch) => {
            return Store.getSettings(function(state) {
                dispatch(self.updateState(state));
            })
        }
    }

    updateMode(mode,options) {
        return {
            type: this.types.UPDATE_MODE,
            mode: mode,
            options: options
        }
    }

    showDeleteRelayAlertDialog(number) {
        return {
            type: this.types.DISPLAY_DELETE_CONFIRMATION_DIALOG,
            number: number
        }
    }
};

export default new AppActions();