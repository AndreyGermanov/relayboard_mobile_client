import React,{Component} from 'react';
import {View,Text} from 'react-native'
import {FormLabel,FormInput,FormValidationMessage} from 'react-native-elements';
import styles from '../utils/StyleSheet';
import SaveSettingsFooter from './SaveSettingsFooter';
import Header from './Header';

var RelaySettings = class extends Component {
    render() {
        var self = this,
            relayNameError = null,
            relayNumberError =null;
        if (this.props.errors.id) {
            relayNumberError = <FormValidationMessage>
                {this.props.errors.id};
            </FormValidationMessage>
        }
        if (this.props.errors.name) {
            relayNameError = <FormValidationMessage>
                {this.props.errors.name};
            </FormValidationMessage>
        }
        return (
            <View style={styles.layout}>
                <Header onSettingsClick={this.props.onSettingsClick.bind(this)}/>
                <View style={styles.body}>
                    <FormLabel>Digital PIN number</FormLabel>
                    {relayNumberError}
                    <FormInput value={this.props.number.toString()} onChangeText={this.props.onChangeRelayNumberField}/>
                    <FormLabel>Relay name</FormLabel>
                    {relayNameError}
                    <FormInput value={this.props.name.toString()}  onChangeText={this.props.onChangeRelayNameField}/>
                </View>
                <SaveSettingsFooter
                    onSaveClick={this.props.saveSettingsClick.bind(this)}
                    onCancelClick={this.props.cancelSettingsClick.bind(this)}
                />
            </View>
        )
    }
}

export default RelaySettings;