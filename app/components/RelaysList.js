import React,{Component} from 'react';
import {Text,View,ScrollView,TouchableHighlight} from 'react-native';
import styles from '../utils/StyleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const RelayList = class extends Component {
    render() {
        var buttons = [],
            buttonStyle = styles.button,
            buttonTextStyle = styles.buttonText;
        for (var i in this.props.relays) {
            if (typeof(this.props.status[i-1]) != 'undefined') {
                if (this.props.status[i-1]==1) {
                    buttonStyle = [styles.button,styles.buttonActive];
                    buttonTextStyle = styles.buttonActiveText;
                } else if (this.props.status[i-1]==0) {
                    buttonStyle = styles.button;
                    buttonTextStyle = styles.buttonText;
                }
                buttons.push(
                    <View style={styles.buttonContainer} key={'relay_view_'+i}>
                        <View style={buttonStyle} key={'relay_button_'+i}>
                            <TouchableHighlight onPress={this.props.onSwitchRelay.bind(this,i)}>
                                <Icon name="power-off" style={[buttonTextStyle,{width:40,fontSize:24}]}/>
                            </TouchableHighlight>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                                <Text style={[buttonTextStyle,{flex:1}]} key={'relay_text_'+i}>{this.props.relays[i]}</Text>
                            </View>
                            <TouchableHighlight onPress={this.props.onEditRelay.bind(this,i)}>
                                <Icon name="cog" style={[buttonTextStyle,{width:40,fontSize:24}]}/>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.props.onDeleteRelay.bind(this,i,1)}>
                                <Icon name="ban" style={[buttonTextStyle,{width:40,fontSize:24}]}/>
                            </TouchableHighlight>
                        </View>
                    </View>
                )
            }
        }
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