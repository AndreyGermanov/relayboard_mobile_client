import _ from 'lodash';
import {connect} from 'react-redux';
import AppSettings from '../components/AppSettings';
import AppSettingsActions from '../actions/AppSettingsActions';
import AppActions from '../actions/AppActions';
import {saveSettings} from '../utils/Utils';

const mapStateToProps = (state) => {
    return {
        host: state.AppSettings.host,
        port: state.AppSettings.port,
        errors: state.AppSettings.errors
    }
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onSaveSettingsClick: () => {
            var state = ownProps.store.getState();
            var errors = {};
            if (!state.AppSettings.host) {
                errors['host'] = 'Host must be specified';
            }
            if (!state.AppSettings.port) {
                errors['port'] = 'Port must be specified';
            } else if (state.AppSettings.port != parseInt(state.AppSettings.port)) {
                errors['port'] = 'Port must be a number';
            }
            if (state.AppSettings.mode=='portal') {
                if (!state.AppSettings.login) {
                    errors['login'] = 'Login must be specified';
                }
            }
            if (errors && _.size(errors)) {
                dispatch(AppSettingsActions.setSettingsErrors(errors));
            } else {
                saveSettings({settings: {host: state.AppSettings.host, port: state.AppSettings.port}}, function () {
                    dispatch(AppActions.updateMode('relay_list'));
                    dispatch(AppActions.loadState());
                })
            }
        },
        onCancelSettingsClick: () => {
            dispatch(AppActions.updateMode('relay_list'));
        },
        onChangePortField: (value) => {
            dispatch(AppSettingsActions.changePortField(value))
        },
        onChangeHostField: (value) => {
            dispatch(AppSettingsActions.changeHostField(value))
        },
        onChangeModeField: (value) => {
            dispatch(AppSettingsActions.changeModeField(value))
        },
        onChangeLoginField: (value) => {
            dispatch(AppSettingsActions.changeLoginField(value))
        },
        onChangePasswordField: (value) => {
            dispatch(AppSettingsActions.changePasswordField(value))
        },
        onSettingsClick: () => {

        }
    }
};

export default AppSettingsContainer = connect(mapStateToProps,mapDispatchToProps)(AppSettings);