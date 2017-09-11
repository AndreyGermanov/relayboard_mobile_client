var AppSettingsActions = class {

    constructor() {
        this.types = {
            SET_SETTINGS_ERRORS: 'SET_SETTINGS_ERRORS',
            CHANGE_HOST_FIELD: 'CHANGE_HOST_FIELD',
            CHANGE_PORT_FIELD: 'CHANGE_PORT_FIELD',
            CHANGE_MODE_FIELD: 'CHANGE_MODE_FIELD',
            CHANGE_LOGIN_FIELD: 'CHANGE_LOGIN_FIELD',
            CHANGE_PASSWORD_FIELD: 'CHANGE_PASSWORD_FIELD'
        }
    }

    setSettingsErrors(errors) {
        return {
            type: this.types.SET_SETTINGS_ERRORS,
            errors: errors
        }
    }

    changeHostField(value) {
        return {
            type: this.types.CHANGE_HOST_FIELD,
            value: value
        }
    }

    changePortField(value) {
        return {
            type: this.types.CHANGE_PORT_FIELD,
            value: value
        }
    }

    changeModeField(value) {
        return {
            type: this.types.CHANGE_MODE_FIELD,
            value: value
        }
    }

    changeLoginField(value) {
        return {
            type: this.types.CHANGE_LOGIN_FIELD,
            value: value
        }
    }

    changePasswordField(value) {
        return {
            type: this.types.CHANGE_PASSWORD_FIELD,
            value: value
        }
    }
};

export default new AppSettingsActions();