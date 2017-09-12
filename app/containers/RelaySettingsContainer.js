import _ from 'lodash';
import {connect} from 'react-redux';
import RelaySettings from '../components/RelaySettings';
import AppActions from '../actions/AppActions';
import RelaySettingsActions from '../actions/RelaySettingsActions';
import Store from '../store/Store';

var mapStateToProps = (state) => {
    return {
        id: state.RelaySettings.id,
        name: state.RelaySettings.name,
        index: state.RelaySettings.index,
        errors: state.RelaySettings.errors
    }
};

var mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onSaveSettingsClick: () => {
            var state = ownProps.store.getState();
            var errors = {};
            var state_relay = state.RelaySettings;
            var relay_list = _.cloneDeep(Store.settings.relays);
            if (!state_relay.id) {
                errors['id'] = 'Relay number must be specified';
            } else if (state_relay.id != parseInt(state_relay.id)) {
                errors['id'] = 'Relay number must be integer';
            } else if (state_relay.id>12) {
                errors['id'] = 'Relay number must be less than 12';
            } else {
                var duplicates = Store.getObjectKeysById(state_relay.id);
                if (state_relay.index!==null && relay_list[state_relay.index].id != state_relay.id) {
                    if (duplicates.length>0) {
                        errors['id'] = 'Relay with provided number already exists';
                    }
                } else if (state_relay.index===null && duplicates.length>0) {
                    errors['id'] = 'Relay with provided number already exists';
                }
            }
            if (!state_relay.name) {
                errors['name'] = 'Relay name must be specified';
            }
            if (errors && _.size(errors)) {
                dispatch(RelaySettingsActions.setRelaySettingsErrors(errors));
            } else {
                var index = state_relay.index;
                if (!index || typeof(index) == 'undefined') {
                    index = relay_list.length;
                }
                relay_list[index] = {
                    id: state_relay.id,
                    name: state_relay.name
                };
                Store.saveSettings({relays: relay_list}, function () {
                    dispatch(AppActions.loadState());
                    dispatch(AppActions.updateMode('relay_list'));
                })
            }
        },
        onCancelSettingsClick: () => {
            dispatch(AppActions.updateMode('relay_list'));
        },
        onChangeRelayNumberField: (value) => {
            dispatch(RelaySettingsActions.changeRelayNumberField(value))
        },
        onChangeRelayNameField: (value) => {
            dispatch(RelaySettingsActions.changeRelayNameField(value))
        },
        onSettingsClick: () => {
            dispatch(AppActions.updateMode('app_settings'));
        }
    }
};

export default RelaySettingsContainer = connect(mapStateToProps,mapDispatchToProps)(RelaySettings);