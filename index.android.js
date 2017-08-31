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
import App from './app/containers/App';
import Reducer from './app/reducers/Reducers';

const store = createStore(Reducer,applyMiddleware(thunkMiddleware));

var RelayBoard = class extends Component {
render() {
  return (
      <Provider store={store}>
        <App store={store} />
      </Provider>
  );
}
}

AppRegistry.registerComponent('RelayBoard', () => RelayBoard);
