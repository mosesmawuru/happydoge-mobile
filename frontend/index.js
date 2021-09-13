import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import WalletConnectProvider from 'react-native-walletconnect';
import {store} from './src/store';

import './globals.js';

const RNRedux = () => (
  <WalletConnectProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </WalletConnectProvider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
