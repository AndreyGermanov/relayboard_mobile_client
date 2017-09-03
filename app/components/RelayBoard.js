import React,{Component} from 'react';
import {View,Text,Alert,ScrollView} from 'react-native';
import {loadState} from '../actions/Actions';
import styles from '../utils/StyleSheet';
import Header from './Header';
import RelayList from './RelaysList';
import Footer from './Footer';
import AppSettings from './AppSettings';
import RelaySettings from './RelaySettings';

import {deleteRelay,updateMode} from '../actions/Actions';

const RelayBoard = class extends Component {
    render() {
        var state = this.props.store.getState(); 
        if (state.mode == 'confirm_delete') {
            var self = this;
            Alert.alert(
                'Remove relay',
                'Are you sure',
                [
                    {text: 'Yes', onPress: () => {self.props.store.dispatch(deleteRelay(state.current_relay,2))}},
                    {text: 'No', onPress: () => self.props.store.dispatch(updateMode('relay_list'))},
                ],
                { cancelable: false }
            )
        }
        if (state.mode == 'app_settings') {
            return (
                <AppSettings
                    host={this.props.host}
                    port={this.props.port}
                    errors={this.props.errors}
                    onSaveSettingsClick={this.props.onSaveSettingsClick}
                    onCancelSettingsClick={this.props.onCancelSettingsClick}
                    onSettingsClick={this.props.onSettingsClick}
                    onChangePortField={this.props.onChangePortField}
                    onChangeHostField={this.props.onChangeHostField}
                />
            )
        } else if (state.mode == 'relay_settings') {
            return (
                <RelaySettings
                    number={this.props.relay_number}
                    name={this.props.relay_name}
                    errors={this.props.errors}
                    onSaveSettingsClick={this.props.onSaveRelaySettingsClick}
                    onCancelSettingsClick={this.props.onCancelRelaySettingsClick}
                    onSettingsClick={this.props.onSettingsClick}
                    onChangeRelayNumberField={this.props.onChangeRelayNumberField}
                    onChangeRelayNameField={this.props.onChangeRelayNameField}
                />
            )
        } else {
            return (
                <View style={styles.layout}>
                    <Header onSettingsClick={this.props.onSettingsClick.bind(this)}/>
                    <View style={styles.body}>
                        <RelayList onSwitchRelay={this.props.onSwitchRelay} onDeleteRelay={this.props.onDeleteRelay}
                                   onEditRelay={this.props.onEditRelay} relays={this.props.relays}
                                   status={this.props.status}/>
                    </View>
                    <Footer/>
                </View>
            )
        }
    }

    componentDidMount() {
        var state = this.props.store.getState();
        if (!state.loaded) {
            this.props.store.dispatch(loadState());
        }
        this.unsubscribe = this.props.store.subscribe(this.handleChange.bind(this));
    }

    componentWillUnmount() {
        if (typeof(this.unsubscribe) != 'undefined') {
            this.unsubscribe();
        };
    }

    handleChange() {
        this.setState(this.props.store.getState());
    }
}

export default RelayBoard;