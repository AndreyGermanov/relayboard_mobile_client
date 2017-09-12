import React,{Component} from 'react';
import {View,Text,ScrollView} from 'react-native'
import {FormLabel,FormInput,FormValidationMessage,ButtonGroup} from 'react-native-elements';
import styles from '../utils/StyleSheet';
import SaveSettingsFooter from './SaveSettingsFooter';
import Header from './Header';

var AppSettings = class extends Component {
    render() {
        var hostError = null,
            portError =null,
            loginError = null;
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
        if (this.props.errors.login) {
            loginError = <FormValidationMessage>
                {this.props.errors.login};
            </FormValidationMessage>
        }
        var selectedIndex = 0,
            loginField = null,
            passwordField = null;
        if (this.props.mode == 'portal') {
            selectedIndex = 1;
            loginField = [
                <FormLabel key="login_label">Login</FormLabel>,
                <FormInput key="login_input" value={this.props.login} onChangeText={this.props.onChangeLoginField}/>,
            ];
            passwordField = [
                <FormLabel key="password_label">Password</FormLabel>,
                <FormInput key="password_input" value={this.props.password} onChangeText={this.props.onChangePasswordField}/>,
            ]
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
                    <FormLabel>Server type</FormLabel>
                    <ButtonGroup onPress={this.props.onChangeModeField.bind(this)}
                                 buttons={['Local','Portal']}
                                 selectedIndex={selectedIndex}
                                 selectedBackgroundColor="darkgreen"
                                 selectedTextStyle={{color:'white'}}

                    />
                    {loginField}
                    {loginError}
                    {passwordField}
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