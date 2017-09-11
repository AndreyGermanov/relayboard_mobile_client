import React,{Component} from 'react';
import {View,Text,Alert,ScrollView} from 'react-native';
import RelayList from '../containers/RelayListContainer';
import AppSettings from '../containers/AppSettingsContainer';
import RelaySettings from '../containers/RelaySettingsContainer';
import AppActions from '../actions/AppActions';
import RelayListActions from '../actions/RelayListActions';
import {getRelayStatus,savedState,connectToPortal} from '../utils/Utils';

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
        if (state.mode == 'app_settings') {
            return (
                <AppSettings store={this.props.store} />
            )
        } else if (state.mode == 'relay_settings') {
            return (
                <RelaySettings store={this.props.store} />
            )
        } else {
            return (
                <RelayList store={this.props.store}/>
            )
        }
    }

    componentDidMount() {
        var state = this.props.store.getState();
        if (!state.loaded) {
            this.props.store.dispatch(AppActions.loadState());
        }
        var self = this;

        this.interval = setInterval(function () {
            getRelayStatus(function (status) {
                if (status) {
                    console.log(status);
                    self.props.store.dispatch(RelayListActions.updateStatus(status));
                }
            })
        }, 5000);
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