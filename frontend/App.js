import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {TextInput, Text, View, TouchableOpacity, Alert} from 'react-native';
import isEmpty from './src/utils/isEmpty';
import NotifService from './src/notification/NotifService';
import Routes from './src/pages';

const App = () => {
  const store = useSelector(state => state.auth);
  const socket = useSelector(state => state.socket);
  const profile = useSelector(state => state.profile);
  const service = new NotifService();

  useEffect(() => {
    if (
      !isEmpty(store.user) &&
      !isEmpty(socket.socket) &&
      !isEmpty(profile.profiledata)
    ) {
      socket.socket.on('success_deposit', item => {
        if (item.address === profile.profiledata.address) {
          const message = `${item.amount}${
            item.flag === 'eth' ? 'ETH' : 'HDT'
          }is deposited`;
          console.log(message);
          service.localNotif(message);
        }
      });

      socket.socket.on('referral_deposit', item => {
        if (store.user.address === item.address) {
          const message = `You got ${item.balance} USDT for referral`;
          service.localNotif(message);
        }
      });
      socket.socket.on('hourly_stake', item => {
        if (store.user._id === item.id) {
          service.localNotif();
        }
      });
      socket.socket.on('complete_stake', item => {
        if (store.user._id === item.id) {
          service.localNotif();
        }
      });
      socket.socket.on('app_transaction', item => {
        if (store.user._id === item.id) {
          service.localNotif();
        }
      });
    }
  });
  return <Routes />;
};
export default App;
