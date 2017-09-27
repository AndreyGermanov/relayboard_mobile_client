var RelaySettingsActions = class {

    constructor() {
        this.types = {
            CHANGE_RELAY_NUMBER_FIELD: 'CHANGE_RELAY_NUMBER_FIELD',
            CHANGE_RELAY_NAME_FIELD: 'CHANGE_RELAY_NAME_FIELD',
            SET_RELAY_SETTINGS_ERRORS: 'SET_RELAY_SETTINGS_ERRORS',
            EDIT_RELAY: 'EDIT_RELAY'
        }
    }

    changeRelayNumberField(value) {
        return {
            type: this.types.CHANGE_RELAY_NUMBER_FIELD,
            value: value
        }
    }

    changeRelayNameField(value) {
        return {
            type: this.types.CHANGE_RELAY_NAME_FIELD,
            value: value
        }
    }

    setRelaySettingsErrors(errors) {
        return {
            type: this.types.SET_RELAY_SETTINGS_ERRORS,
            errors: errors
        }
    }

    editRelay(index,id,name) {
        return {
            type: this.types.EDIT_RELAY,
            index: index,
            id: id,
            name: name
        }
    }
};

export default new RelaySettingsActions();