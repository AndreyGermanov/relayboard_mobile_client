import {connect} from 'react-redux';
import RelayBoard from '../components/RelayBoard';
import {switchRelay,deleteRelay,loadState,updateMode,setSettingsErrors,editRelay,changeHostField,changePortField} from '../actions/Actions';
import {saveSettings} from '../utils/Utils';
import _ from 'lodash';

const mapStateToProps = (state,ownProps) => {
    return {
        relays: state.relays,
        status: state.status,
        loaded: state.loaded,
        store: ownProps.store,
        host: state.settings.host,
        port: state.settings.port,
        errors: state.errors,
        relay_number: state.current_relay ? state.current_relay : '',
        relay_name: state.current_relay ? state.relays[current_relay] : ''
    }
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onSwitchRelay: (number) => {
            dispatch(switchRelay(number));
        },
        onDeleteRelay: (number,mode) => {
            dispatch(deleteRelay(number,mode))
        },
        onEditRelay: (number) => {
            dispatch(editRelay(number))
        },
        saveSettingsClick: () => {
            var state = ownProps.store.getState();
            var errors = {};
            if (!state.settings.host) {
                errors['host'] = 'Host must be specified';
            }
            if (!state.settings.port) {
                errors['port'] = 'Port must be specified';
            } else if (state.settings.port != parseInt(state.settings.port)) {
                errors['port'] = 'Port must be a number';
            }
            if (errors && _.size(errors)) {
                dispatch(setSettingsErrors(errors));
            } else {
                saveSettings({settings: {host: state.settings.host, port: state.settings.port}}, function () {
                    dispatch(loadState())
                        .then(function () {
                            dispatch(updateMode('relay_list'));
                        });
                })
            }
        },
        cancelSettingsClick: (hostInput,portInput) => {
            dispatch(updateMode('relay_list'));
        },
        onSettingsClick: () => {
            dispatch(updateMode('app_settings'));
        },
        onChangePortField: (value) => {
            dispatch(changePortField(value))
        },
        onChangeHostField: (value) => {
            dispatch(changeHostField(value))
        }
    }
};

export default App = connect(mapStateToProps,mapDispatchToProps)(RelayBoard);