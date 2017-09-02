import React,{Component} from 'react';
import {View,Text} from 'react-native'
import {FormLabel,FormInput,FormValidationMessage} from 'react-native-elements';
import styles from '../utils/StyleSheet';
import SaveSettingsFooter from './SaveSettingsFooter';
import Header from './Header';

var RelaySettings = class extends Component {
    render() {
        var self = this,
            hostError = null,
            portError =null;
        if (this.props.errors.settings.relay_number) {
            relayNumberError = <FormValidationMessage>
                {this.props.errors.settings.relay_number};
            </FormValidationMessage>
        }
        if (this.props.errors.settings.relay_name) {
            relayNameError = <FormValidationMessage>
                {this.props.errors.settings.relay_name};
            </FormValidationMessage>
        }
        return (
            <View style={styles.layout}>
                <Header onSettingsClick={this.props.onSettingsClick.bind(this)}/>
                <View style={styles.body}>
                    <FormLabel>Digital PIN number</FormLabel>
                    {relayNumberError}
                    <FormInput value={this.props.relay_number.toString()} onChangeText={this.props.onChangeRelayNumberField}/>
                    <FormLabel>Relay name</FormLabel>
                    {relayNameError}
                    <FormInput value={this.props.relay_name.toString()}  onChangeText={this.props.onChangeRelayNameField}/>
                </View>
                <SaveSettingsFooter
                    onSaveClick={this.props.saveRelaySettingsClick.bind(this)}
                    onCancelClick={this.props.cancelRelaySettingsClick.bind(this)}
                />
            </View>
        )
    }
}

export default RelaySettings;