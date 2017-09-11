import React,{Component} from 'react';
import {View,Text,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../utils/StyleSheet';

var Header = class extends Component {
    render() {
        return (
            <View style={{height:48}}>
                <View style={styles.header}>
                    <TouchableHighlight  longPressDelayTimeout={false} onPress={this.props.onSettingsClick}><Icon name='bars' style={styles.headerText} /></TouchableHighlight>
                    <Text style={styles.headerText}>Relay Board</Text>
                    <Icon name="wrench" style={[styles.headerText,{color:'darkgreen'}]}/>
                </View>
            </View>
        )
    }
};

export default Header;


