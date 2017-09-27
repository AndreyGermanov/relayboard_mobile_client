import _ from 'lodash';
import {connect} from 'react-redux';
import AppSettings from '../components/AppSettings';
import AppSettingsActions from '../actions/AppSettingsActions';
import AppActions from '../actions/AppActions';
import Store from '../store/Store';

const mapStateToProps = (state) => {
    return {
        host: state.AppSettings.host,
        port: state.AppSettings.port,
        mode: state.AppSettings.mode,
        login: state.AppSettings.login,
        password: state.AppSettings.password,
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
                Store.saveSettings({
                    settings: {
                        host: state.AppSettings.host,
                        port: state.AppSettings.port,
                        mode:state.AppSettings.mode,
                        login:state.AppSettings.login,
                        password: state.AppSettings.password
                    }
                }, function () {
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
        onChangeModeField: (index) => {
            if (index==0) {
                value = 'local';
            } else if (index==1) {
                value = 'portal';
            };
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