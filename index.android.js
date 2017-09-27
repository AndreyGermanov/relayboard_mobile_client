/**
 * RelayBoard Mobile Manager application
 * https://github.com/AndreyGermanov/relayboard_mobile_client
 * @flow
 */
import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import Store from './app/store/Store';
import thunkMiddleware from 'redux-thunk';
import Reducer from './app/reducers/RootReducer';
import Board from './app/components/RelayBoard';

Store.store = createStore(Reducer,applyMiddleware(thunkMiddleware));

// Creating root object based on wrapper "App" container. Store and Reducer provided to it
var RelayBoard = class extends Component {
    render() {
      return (
          <Provider store={Store.store}>
            <Board store={Store.store} />
          </Provider>
      );
    }
};

AppRegistry.registerComponent('RelayBoard', () => RelayBoard);
