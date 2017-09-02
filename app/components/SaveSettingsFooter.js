import React,{Component} from 'react';
import styles from '../utils/StyleSheet';
import {Text,View,TouchableHighlight,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var SaveSettingsFooter = class extends Component {
    render() {
        return (
            <View style={{height:96}}>
                <TouchableHighlight onPress={this.props.onSaveClick} style={{height:48}}>
                    <View style={[styles.footer,buttonStyles.button]}>
                        <Icon name='check' style={styles.headerText}/>
                        <Text style={[styles.headerText,{paddingLeft:7}]}>Save</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.onCancelClick} style={{height:48}}>
                    <View style={[styles.footer,buttonStyles.button,buttonStyles.cancelButton]}>
                        <Icon name='ban' style={styles.headerText}/>
                        <Text style={[styles.headerText,{paddingLeft:7}]}>Cancel</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

buttonStyles = StyleSheet.create({
    button: {
        height: 48,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderTopColor:'green',
        borderBottomColor: 'green'
    },
    cancelButton: {
        backgroundColor: 'red',
        borderBottomColor: 'darkred'
    }
})
export default SaveSettingsFooter;