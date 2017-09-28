import React,{Component} from 'react';
import {View,ScrollView,TouchableHighlight} from 'react-native';
import {Header,Footer,Content,Container,Title,FooterTab,Button,Left,Right,Body,Icon,Text,Picker,Item,Form,Grid,Row} from 'native-base';
import styles from '../utils/StyleSheet';
import actions from '../actions/RelayListActions';
import Store from '../store/Store';

const RelayList = class extends Component {
    render() {
        var buttonStyle = styles.button,
            buttonTextStyle = styles.buttonText;

        var relayboards_list = [],
            buttons = [];
        if (this.props.relayboards) {
            for (var index in this.props.relayboards) {
                if (!this.props.currentRelayBoard) {
                    Store.store.dispatch(actions.updateCurrentRelayBoard(index));
                }
                relayboards_list.push(<Item key={'relayboard_'+index} label={index} value={index}/>)
            }
            if (relayboards_list && relayboards_list.length && this.props.currentRelayBoard) {
                buttons = this.props.relayboards[this.props.currentRelayBoard].config.pins.map(function (pin, index) {
                    if (typeof(this.props.relayboards[this.props.currentRelayBoard].status[index]) != 'undefined') {
                        var status = this.props.relayboards[this.props.currentRelayBoard].status[index];
                        if (status == 1) {
                            buttonStyle = [styles.button, styles.buttonActive];
                            buttonTextStyle = styles.buttonActiveText;
                        } else if (status == 0) {
                            buttonStyle = styles.button;
                            buttonTextStyle = styles.buttonText;
                        }
                    } else {
                        buttonStyle = [styles.button, styles.buttonInactive];
                        buttonTextStyle = styles.buttonInactiveText;
                    }
                    if (pin.type == 'relay') {
                        if (status == 1) {
                            return (
                                <Button style={{marginBottom:10}} key={'relay_'+index} success block
                                        onPress={this.props.onSwitchRelay.bind(this,this.props.currentRelayBoard,index)}>
                                    <Icon name="md-power"/>
                                    <Text>{pin.title}</Text>
                                </Button>
                            )
                        } else if (status == 0) {
                            return (
                                <Button style={{marginBottom:10}} key={'relay_'+index} danger block
                                        onPress={this.props.onSwitchRelay.bind(this,this.props.currentRelayBoard,index)}>
                                    <Icon name="md-power"/>
                                    <Text>{pin.title}</Text>
                                </Button>
                            )
                        }
                    }
                }, this);
            }
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.props.onSettingsClick.bind(this)}>
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Control Center</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.props.onRefreshClick.bind(this)}>
                            <Icon name="refresh"/>
                        </Button>
                    </Right>
                </Header>
                <Content >
                    <Picker placeholder='Select Relay Board'
                            selectedValue={this.props.currentRelayBoard}
                            onValueChange={this.props.onChangeCurrentRelayboard.bind(this)}>
                        {relayboards_list}
                    </Picker>
                    <ScrollView style={{marginLeft:20,marginRight:20}}>
                    {buttons}
                    </ScrollView>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Add Relay</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
};

export default RelayList;