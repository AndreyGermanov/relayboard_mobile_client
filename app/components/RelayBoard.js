import React,{Component} from 'react';
import {View,Text,Alert,ScrollView} from 'react-native';
import RelayList from '../containers/RelayListContainer';
import AppSettings from '../containers/AppSettingsContainer';
import RelaySettings from '../containers/RelaySettingsContainer';
import AppActions from '../actions/AppActions';
import RelayListActions from '../actions/RelayListActions';
import Store from '../store/Store';
import getTheme from '../../native-base-theme/components';
import {StyleProvider} from 'native-base';

const RelayBoard = class extends Component {
    render() {
        var state = this.props.store.getState(); 
        if (state.mode == 'confirm_delete') {
            var self = this;
            Alert.alert(
                'Remove relay',
                'Are you sure',
                [
                    {text: 'Yes', onPress: () => {self.props.store.dispatch(RelayListActions.deleteRelay(state.current_relay,2))}},
                    {text: 'No', onPress: () => self.props.store.dispatch(AppActions.updateMode('relay_list'))}
                ],
                { cancelable: false }
            )
        }
        var rootComponent = <RelayList store={this.props.store}/>;

        if (state.mode == 'app_settings') {
            rootComponent = <AppSettings store={this.props.store} />
        } else if (state.mode == 'relay_settings') {
            rootComponent = <RelaySettings store={this.props.store} />;
        };

        return (
            <StyleProvider  style={getTheme()}>
                {rootComponent}
            </StyleProvider>
        )
    }

    componentDidMount() {
        var state = this.props.store.getState();
        if (!state.loaded) {
            this.props.store.dispatch(AppActions.loadState());
        }
        var self = this;
        this.interval = setInterval(function () {
            Store.getRelayStatus(function (relayboards,currentRelayBoard) {
                if (relayboards) {
                    self.props.store.dispatch(RelayListActions.updateStatus(relayboards,currentRelayBoard));
                } else {
                    self.props.store.dispatch(RelayListActions.updateStatus([]));
                }
            })
        }, 1000);
        this.unsubscribe = this.props.store.subscribe(this.handleChange.bind(this));
    }

    componentWillUnmount() {
        if (typeof(this.unsubscribe) != 'undefined') {
            this.unsubscribe();
        }
    }

    handleChange() {
        this.setState(this.props.store.getState());
    }
};

export default RelayBoard;