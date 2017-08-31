import React,{Component} from 'react';
import {View,Text,Alert} from 'react-native';
import {loadState} from '../actions/Actions';
import styles from '../utils/StyleSheet';
import Header from './Header';
import RelayList from './RelaysList';
import Footer from './Footer';
import {deleteRelay,updateMode} from '../actions/Actions';

const RelayBoard = class extends Component {
    render() {
        if (this.props.store.getState().mode == 'confirm_delete') {
            Alert.alert('Confirm','Are you sure?',[
                {text:'Yes',onPress: () => deleteRelay(this.props.store.getState().current_relay,2)},
                {text:'No',onPress: () => updateMode('relay_list')}
            ])
        }
        return (
            <View style={styles.layout}>
                <Header/>
                <View style={styles.body}>
                    <RelayList onSwitchRelay={this.props.onSwitchRelay} onDeleteRelay={this.props.onDeleteRelay} onEditRelay={this.props.onEditRelay} relays={this.props.relays} status={this.props.status}/>
                </View>
                <Footer/>
            </View>
        )
    }

    componentDidMount() {
        var state = this.props.store.getState();
        if (!state.loaded) {
            this.props.store.dispatch(loadState());
        }
        this.unsubscribe = this.props.store.subscribe(this.handleChange.bind(this));
    }

    componentWillUnmount() {
        this.props.store.unsubscribe(this.unsubscribe);
    }

    handleChange() {
        this.setState(this.props.store.getState());
    }
}

export default RelayBoard;