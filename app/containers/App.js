import {connect} from 'react-redux';
import RelayBoard from '../components/RelayBoard';
import {switchRelay, deleteRelay,loadState,updateMode,setSettingsErrors,setRelaySettingsErrors,
    editRelay,changeHostField,changePortField,changeRelayNameField,changeRelayNumberField} from '../actions/Actions';
import {saveSettings,getObjectKeysById} from '../utils/Utils';
import _ from 'lodash';

// Function maps state data to properties of root RelayBoard and child components
const mapStateToProps = (state,ownProps) => {
    var current_relay_index = null;
    if (state.current_relay) {
        current_relay_index = getObjectKeysById(state.current_relay,state.relays)[0];
    }
    return {
        relays: state.relays,
        status: state.status,
        loaded: state.loaded,
        store: ownProps.store,
        host: state.settings.host,
        port: state.settings.port,
        errors: state.errors,
        relay_number: state.current_relay ? state.current_relay :  '',
        relay_name: state.current_relay ? state.relays[current_relay_index].name : ''
    }
};

// Function, which maps all event handlers of RelayBoard and child compoents
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        // RelayList event handlers
        onSwitchRelay: (number) => {
            dispatch(switchRelay(number));
        },
        onDeleteRelay: (number,mode) => {
            dispatch(deleteRelay(number,mode))
        },
        onEditRelay: (number) => {
            dispatch(editRelay(number))
        },
        // Header event handlers
        onSettingsClick: () => {
            dispatch(updateMode('app_settings'));
        },
        // AppSettings event handlers
        onSaveSettingsClick: () => {
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
        onCancelSettingsClick: () => {
            dispatch(updateMode('relay_list'));
        },
        onChangePortField: (value) => {
            dispatch(changePortField(value))
        },
        onChangeHostField: (value) => {
            dispatch(changeHostField(value))
        },
        // RelaySettings event handlers
        onSaveRelaySettingsClick: () => {
            var state = ownProps.store.getState();
            var errors = {};
            var relay_index = getObjectKeysById(state.current_relay,state.relays)[0];
            if (!state.relays[relay_index].id) {
                errors['id'] = 'Relay number must be specified';
            } else if (state.relays[relay_index].id != parseInt(state.relays[relay_index].id)) {
                errors['id'] = 'Relay number must be integer';
            }
            if (!state.relays[relay_index].name) {
                errors['name'] = 'Relay name must be specified';
            }
            if (errors && _.size(errors)) {
                dispatch(setRelaySettingsErrors(errors));
            } else {
                saveSettings({relays: _.cloneDeep(state.relays)}, function () {
                    dispatch(loadState())
                        .then(function () {
                            dispatch(updateMode('relay_list'));
                        });
                })
            }
        },
        onCancelRelaySettingsClick: () => {
            dispatch(updateMode('relay_list'));
        },
        onChangeRelayNumberField: (value) => {
            var state = ownProps.store.getState();
            index = getObjectKeysById(state.current_relay,state.relays)[0];
            dispatch(changeRelayNumberField(index,value))
        },
        onChangeRelayNameField: (value) => {
            var state = ownProps.store.getState();
            index = getObjectKeysById(state.current_relay,state.relays)[0];
            dispatch(changeRelayNameField(index,value))
        }
    }
};

export default App = connect(mapStateToProps,mapDispatchToProps)(RelayBoard);