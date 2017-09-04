import React,{Component} from 'react';
import {View,Text,ScrollView} from 'react-native'
import {FormLabel,FormInput,FormValidationMessage} from 'react-native-elements';
import styles from '../utils/StyleSheet';
import SaveSettingsFooter from './SaveSettingsFooter';
import Header from './Header';

var AppSettings = class extends Component {
    render() {
        var hostError = null,
            portError =null;
        if (this.props.errors.host) {
            hostError = <FormValidationMessage>
                {this.props.errors.host};
            </FormValidationMessage>
        }
        if (this.props.errors.port) {
            portError = <FormValidationMessage>
                {this.props.errors.port};
            </FormValidationMessage>
        }
        return (
            <View style={styles.layout}>
                <Header onSettingsClick={this.props.onSettingsClick.bind(this)}/>
                <ScrollView>
                    <FormLabel>Server host</FormLabel>
                    {hostError}
                    <FormInput value={this.props.host} onChangeText={this.props.onChangeHostField}/>
                    <FormLabel>Server port</FormLabel>
                    {portError}
                    <FormInput value={this.props.port.toString()}  onChangeText={this.props.onChangePortField}/>
                </ScrollView>
                <SaveSettingsFooter
                    onSaveClick={this.props.onSaveSettingsClick.bind(this)}
                    onCancelClick={this.props.onCancelSettingsClick.bind(this)}
                />
            </View>
        )
    }
};

export default AppSettings;