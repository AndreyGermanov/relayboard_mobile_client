import React,{Component} from 'react';
import {Text} from 'react-native'
import styles from '../utils/StyleSheet';
import {FormValidationMessage} from 'react-native-elements';
import {Container,Header,Left,Body,Right,Content,Form,Item,Label,Input,Picker,Footer,FooterTab,Button,Icon,Title} from 'native-base';

var AppSettings = class extends Component {
    render() {
        var hostError = null,
            portError =null,
            loginError = null;
        if (this.props.errors.host) {
            hostError = <FormValidationMessage>
                {this.props.errors.host}
            </FormValidationMessage>
        }
        if (this.props.errors.port) {
            portError = <FormValidationMessage>
                {this.props.errors.port}
            </FormValidationMessage>
        }
        if (this.props.errors.login) {
            loginError = <FormValidationMessage>
                {this.props.errors.login}
            </FormValidationMessage>
        }

        var loginField = null,
            passwordField = null;

        if (this.props.mode == 'portal') {
            loginField =
                <Item>
                    <Label>Login</Label>
                    <Input value={this.props.login} onChangeText={this.props.onChangeLoginField.bind(this)}/>
                </Item>;
            passwordField =
                <Item>
                    <Label>Password</Label>
                    <Input value={this.props.password} onChangeText={this.props.onChangePasswordField.bind(this)}/>
                </Item>;
        }

        return (
        <Container>
            <Header  style={styles.header}>
                <Left>
                    <Button transparent onPress={this.props.onSettingsClick.bind(this)}>
                        <Icon name="menu"/>
                    </Button>
                </Left>
                <Body>
                <Title>Settings</Title>
                </Body>
            </Header>
            <Content>
                <Form>
                    <Item stackedLabel>
                        <Label>Server host</Label>
                        <Input value={this.props.host} onChangeText={this.props.onChangeHostField.bind(this)}/>
                    </Item>
                    {hostError}
                    <Item stackedLabel>
                        <Label>Server port</Label>
                        <Input value={this.props.port.toString()} onChangeText={this.props.onChangePortField.bind(this)}/>
                    </Item>
                    {portError}
                    <Picker mode="dropdown"
                            placeholder='Server Type'
                            selectedValue={this.props.mode}
                            onValueChange={this.props.onChangeModeField.bind(this)}>
                        <Item label='Local' value="local"/>
                        <Item label="Portal" value="portal"/>
                    </Picker>
                    {loginField}
                    {passwordField}
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button style={styles.button} inonLeft full onPress={this.props.onSaveSettingsClick.bind(this)}>
                        <Icon name="ios-checkmark" style={styles.text}/>
                        <Text style={styles.text}>Save</Text>
                    </Button>
                    <Button style={[styles.button,{backgroundColor:'red'}]} full onPress={this.props.onCancelSettingsClick.bind(this)}>
                        <Icon name="md-close" style={styles.text}/>
                        <Text style={styles.text}>Cancel</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
        )
    }
};

export default AppSettings;