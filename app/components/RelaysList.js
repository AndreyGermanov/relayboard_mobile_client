import React,{Component} from 'react';
import {Text,View,ScrollView,TouchableHighlight} from 'react-native';
import styles from '../utils/StyleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                return (
                    <View style={styles.buttonContainer} key={'relay_view_'+relay.id}>
                        <View style={buttonStyle} key={'relay_button_'+relay.id}>
                            <TouchableHighlight onPress={this.props.onSwitchRelay.bind(this,relay.id)}>
                                <Icon name="power-off" style={[buttonTextStyle,{width:40,fontSize:24}]}/>
                            </TouchableHighlight>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                                <Text style={[buttonTextStyle,{flex:1}]}
                                      key={'relay_text_'+relay.id}>{relay.name}</Text>
                            </View>
                            <TouchableHighlight onPress={this.props.onEditRelay.bind(this,relay.id)}>
                                <Icon name="cog" style={[buttonTextStyle,{width:40,fontSize:24}]}/>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.props.onDeleteRelay.bind(this,relay.id,1)}>
                                <Icon name="ban" style={[buttonTextStyle,{width:40,fontSize:24}]}/>
                            </TouchableHighlight>
                        </View>
                    </View>
                )
            }
        },this)
        return (
            <ScrollView>
                <View style={styles.relayList}>
                    {buttons}
                </View>
            </ScrollView>
        )
    }
}

export default RelayList;