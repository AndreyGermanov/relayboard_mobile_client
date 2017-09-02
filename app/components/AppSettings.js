import React,{Component} from 'react';
import {View,Text} from 'react-native'
import {FormLabel,FormInput,FormValidationMessage} from 'react-native-elements';
import styles from '../utils/StyleSheet';
import SaveSettingsFooter from './SaveSettingsFooter';
import Header from './Header';

var AppSettings = class extends Component {
    render() {
        var self = this,
            hostError = null,
            portError =null;
        if (this.props.errors.settings.host) {
            hostError = <FormValidationMessage>
                {this.props.errors.settings.host};
            </FormValidationMessage>
        }
        if (this.props.errors.settings.port) {
            portError = <FormValidationMessage>
                {this.props.errors.settings.port};
            </FormValidationMessage>
        }
        return (
            <View style={styles.layout}>
                <Header onSettingsClick={this.props.onSettingsClick.bind(this)}/>
                <View style={styles.body}>
                    <FormLabel>Server host</FormLabel>
                    {hostError}
                    <FormInput value={this.props.host} onChangeText={this.props.onChangeHostField}/>
                    <FormLabel>Server port</FormLabel>
                    {portError}
                    <FormInput value={this.props.port.toString()}  onChangeText={this.props.onChangePortField}/>
                </View>
                <SaveSettingsFooter
                    onSaveClick={this.props.saveSettingsClick.bind(this)}
                    onCancelClick={this.props.cancelSettingsClick.bind(this)}
                />
            </View>
        )
    }
}

export default AppSettings;