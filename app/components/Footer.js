import React,{Component} from 'react';
import {View,Text,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../utils/StyleSheet';

var Footer = class extends Component {
    render() {
        return (
            <TouchableHighlight>
                <View style={{height:48}}>
                    <View style={styles.footer}>
                        <Icon name='plus' style={styles.headerText}/>
                        <Text style={[styles.headerText,{paddingLeft:7}]}>Add Relay</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

export default Footer;


