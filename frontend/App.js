import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TextInput, Text, View, TouchableOpacity, Alert} from 'react-native';
import isEmpty from './src/utils/isEmpty';
import NotifService from './src/notification/NotifService';
import {getUser} from './src/actions/profileAction';
import Routes from './src/pages';

const App = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.auth);
  const profile = useSelector(state => state.profile);
  const socket = useSelector(state => state.socket);
  const service = new NotifService();

  useEffect(() => {
    if (!isEmpty(store.user) && !isEmpty(socket.socket)) {
      socket.socket.on('success_deposit', async item => {
        console.log(item.address);
        if (item.address === store.user.address) {
          dispatch(getUser(store.user.id));
          const message = `${item.amount}${
            item.flag === 'eth' ? 'ETH' : 'HDT'
          } is deposited`;
          service.localNotif(message);
        }
      });

      socket.socket.on('referral_deposit', item => {
        if (store.user.address === item.address) {
          dispatch(getUser(store.user.id));
          const message = `You got ${item.balance} USDT for referral`;
          service.localNotif(message);
        }
      });
      socket.socket.on('hourly_stake', item => {
        if (store.user._id === item.id) {
          const message = `Houlry is staked`;
          service.localNotif(message);
        }
      });
      socket.socket.on('complete_stake', item => {
        if (store.user._id === item.id) {
          const message = `Staking is completed`;
          service.localNotif(message);
        }
      });
      socket.socket.on('app_transaction', item => {
        if (store.user._id === item.user) {
          const message = `${item.amount} ${item.method} withdraw is success.`;
          service.localNotif(message);
        }
      });
      socket.socket.on('complete_transfer', item => {
        if (store.user._id === item.user) {
          const message = `${item.amount} ${item.method} withdraw is success.`;
          service.localNotif(message);
        }
      });
    }
  }, [socket]);
  return <Routes />;
};
export default App;
