import React,{Component} from 'react';
import {View,ScrollView,TouchableHighlight} from 'react-native';
import {Header,Footer,Content,Container,Title,FooterTab,Button,Left,Right,Body,Icon,Text,Picker,Item,Card,CardItem,Grid,Col} from 'native-base';
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
                relayboards_list.push(<Item key={'relayboard_'+index} label={this.props.relayboards[index].config.title} value={index}/>)
            }
            if (relayboards_list && relayboards_list.length && this.props.currentRelayBoard) {
                buttons = this.props.relayboards[this.props.currentRelayBoard].config.pins.map(function (pin, index) {
                    if (pin.type == 'relay') {
                        var status = this.props.relayboards[this.props.currentRelayBoard].status[pin.number];
                        if (status == 1) {
                            return (
                                <Button style={{marginBottom:10}} key={'relay_'+index} success block
                                        onPress={this.props.onSwitchRelay.bind(this,this.props.currentRelayBoard,index)}>
                                    <Grid>
                                        <Col style={{width:55}}>
                                            <Icon name="md-power"/>
                                        </Col>
                                        <Col>
                                            <Text>{pin.title}</Text>
                                        </Col>
                                    </Grid>
                                </Button>
                            )
                        } else if (status == 0) {
                            return (
                                <Button style={{marginBottom:10}} key={'relay_'+index} danger block
                                        onPress={this.props.onSwitchRelay.bind(this,this.props.currentRelayBoard,index)}>
                                    <Grid>
                                        <Col style={{width:55}}>
                                            <Icon name="md-power"/>
                                        </Col>
                                        <Col>
                                            <Text>{pin.title}</Text>
                                        </Col>
                                    </Grid>
                                </Button>
                            )
                        } else {
                            return (
                                <Button style={{marginBottom:10}} key={'relay_'+index} light block>
                                    <Grid>
                                        <Col style={{width:55}}>
                                            <Icon name="md-power"/>
                                        </Col>
                                        <Col>
                                            <Text>{pin.title}</Text>
                                        </Col>
                                    </Grid>
                                </Button>
                            )
                        }
                    } else if (pin.type == 'temperature') {
                        var status = this.props.relayboards[this.props.currentRelayBoard].status[pin.number];
                        if (status) {
                            status = status.split('|');
                            var temperature = parseFloat(status.shift()).toFixed(2),
                                humidity = parseFloat(status.pop()).toFixed(2);
                            var temperature_color = '#FF8C00',
                                humidity_color = 'blue';
                        } else {
                            var temperature = 0,
                                humidity = 0;
                            var temperature_color = 'gray',
                                humidity_color = 'gray';
                        }
                        return (
                            <Card style={{marginBottom:15}} key={'temperature_'+index}>
                                <CardItem>
                                    <Body>
                                    <Grid>
                                        <Col>
                                            <Icon name="ios-sunny-outline" style={{color:temperature_color}}/>
                                            <Text style={{color:temperature_color}}>{temperature} C</Text>
                                        </Col>
                                        <Col>
                                            <Icon name="ios-water" style={{color:humidity_color}}/>
                                            <Text style={{color:humidity_color}}>{humidity} %</Text>
                                        </Col>
                                    </Grid>
                                    </Body>
                                </CardItem>
                            </Card>
                        )
                    }
                }, this);
            }
        }
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={this.props.onSettingsClick.bind(this)}>
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.props.onRefreshClick.bind(this)}>
                            <Icon name="refresh"/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Picker placeholder='Select Relay Board'
                            selectedValue={this.props.currentRelayBoard}
                            onValueChange={this.props.onChangeCurrentRelayboard.bind(this)}>
                        {relayboards_list}
                    </Picker>
                    <ScrollView style={styles.relaylist}>
                    {buttons}
                    </ScrollView>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button iconLeft style={styles.button}>
                            <Icon name="md-add" style={styles.text}/>
                            <Text style={styles.text}>Add Relay</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
};

export default RelayList;