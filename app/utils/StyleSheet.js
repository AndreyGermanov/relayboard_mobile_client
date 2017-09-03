import React,{Component} from 'react';
import {StyleSheet} from 'react-native';

// Core UI Styles
const styles = StyleSheet.create({
    layout: {
        flex:1,
        flexDirection:'column'
    },
    body: {
        flex:1,
        backgroundColor: 'white'
    },
    header: {
        padding:10,
        backgroundColor: 'darkgreen',
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footer: {
        padding:10,
        backgroundColor: 'darkgreen',
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 24
    },
    buttonContainer: {
        padding:10
    },
    relayList: {
        padding:20,
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between'
    },
    button: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#ff6347',
        borderRadius: 7,
        padding: 5,
        backgroundColor: '#ff6347',
        opacity: 0.5
    },
    buttonActive: {
        borderColor: '#7fff00',
        backgroundColor: '#98fb98',
        opacity: 0.5
    },
    buttonActiveText: {
        color: 'green'
    },
    buttonText: {
        color: 'red'
    }
});

export default styles;