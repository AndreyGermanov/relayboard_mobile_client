/**
 * RelayBoard Mobile Manager application
 * https://github.com/AndreyGermanov/relayboard_mobile_client
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import Board from './app/components/RelayBoard';
import Reducer from './app/reducers/RootReducer';

const store = createStore(Reducer,applyMiddleware(thunkMiddleware));

// Creating root object based on wrapper "App" container. Store and Reducer provided to it
var RelayBoard = class extends Component {
    render() {
      return (
          <Provider store={store}>
            <Board store={store} />
          </Provider>
      );
    }
};

AppRegistry.registerComponent('RelayBoard', () => RelayBoard);
