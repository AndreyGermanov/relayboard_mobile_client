import React,{Component} from 'react';
import {View,Text,ScrollView} from 'react-native'
import {FormLabel,FormInput,FormValidationMessage} from 'react-native-elements';
import styles from '../utils/StyleSheet';
import SaveSettingsFooter from './SaveSettingsFooter';
import Header from './Header';

var RelaySettings = class extends Component {
    render() {
        var relayNameError = null,
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
                <ScrollView>
                    <FormLabel>Digital PIN number</FormLabel>
                    {relayNumberError}
                    <FormInput value={this.props.id.toString()} onChangeText={this.props.onChangeRelayNumberField}/>
                    <FormLabel>Relay name</FormLabel>
                    {relayNameError}
                    <FormInput value={this.props.name.toString()}  onChangeText={this.props.onChangeRelayNameField}/>
                </ScrollView>
                <SaveSettingsFooter
                    onSaveClick={this.props.onSaveSettingsClick.bind(this)}
                    onCancelClick={this.props.onCancelSettingsClick.bind(this)}
                />
            </View>
        )
    }
};

export default RelaySettings;