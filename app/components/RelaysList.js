import React,{Component} from 'react';
import {Text,View,ScrollView,TouchableHighlight} from 'react-native';
import styles from '../utils/StyleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../components/Footer';
import Header from '../components/Header';

const RelayList = class extends Component {
    render() {
        var buttonStyle = styles.button,
            buttonTextStyle = styles.buttonText;
        var buttons = this.props.relays.map(function(relay,index) {
            if (typeof(this.props.status[relay.id-1]) != 'undefined') {
                if (this.props.status[relay.id - 1] == 1) {
                    buttonStyle = [styles.button, styles.buttonActive];
                    buttonTextStyle = styles.buttonActiveText;
                } else if (this.props.status[relay.id - 1] == 0) {
                    buttonStyle = styles.button;
                    buttonTextStyle = styles.buttonText;
                }
            } else {
                buttonStyle = [styles.button,styles.buttonInactive];
                buttonTextStyle = styles.buttonInactiveText;
            }
            return (
                <View style={styles.buttonContainer} key={'relay_view_'+index}>
                    <View style={buttonStyle} key={'relay_button_'+index}>
                        <TouchableHighlight onPress={this.props.onSwitchRelay.bind(this,relay.id)}>
                            <Icon name="power-off" style={[buttonTextStyle,{width:40,fontSize:24}]}/>
                        </TouchableHighlight>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                            <Text style={[buttonTextStyle,{flex:1}]}
                                  key={'relay_text_'+relay.id}>{relay.name}</Text>
                        </View>
                        <TouchableHighlight onPress={this.props.onEditRelay.bind(this,index,relay.id,relay.name)}>
                            <Icon name="cog" style={[buttonTextStyle,{width:40,fontSize:24}]}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.props.onDeleteRelay.bind(this,relay.id,1)}>
                            <Icon name="ban" style={[buttonTextStyle,{width:40,fontSize:24}]}/>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        },this);
        var footer = <Footer onNewRelay={this.props.onNewRelay}/>;
        var state = this.props.store.getState();
        if (state.RelayList.relays.length>11) {
            footer = null;
        };
        return (
            <View style={styles.layout}>
                <Header onSettingsClick={this.props.onSettingsClick.bind(this)}/>
                <View style={styles.body}>
                    <ScrollView>
                        <View style={styles.relayList}>
                            {buttons}
                        </View>
                    </ScrollView>
                </View>
                {footer}
            </View>
        );
    }
};

export default RelayList;