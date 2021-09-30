import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import isEmpty from './src/utils/isEmpty';
import NotifService from './src/notification/NotifService';
import {getUser} from './src/actions/profileAction';
import Routes from './src/pages';

const App = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.auth);
  const socket = useSelector(state => state.socket);
  const service = new NotifService();
  useEffect(() => {
    if (!isEmpty(store.user) && !isEmpty(socket.socket)) {
      socket.socket.on('success_deposit', async item => {
        if (item.address === store.user.address) {
          dispatch(getUser(store.user.id));
          const message = `${item.amount}${
            item.flag === 'eth' ? 'ETH' : 'HDT'
          } is deposited`;
          const title = 'Success Deposit';
          service.localNotif(message, title);
        }
      });

      socket.socket.on('referral_deposit', item => {
        if (store.user.address === item.address) {
          dispatch(getUser(store.user.id));
          const message = `You got ${item.balance} USDT for referral`;
          const title = 'Success Referral';
          service.localNotif(message, title);
        }
      });
      socket.socket.on('hourly_stake', item => {
        if (store.user.id === item.id) {
          dispatch(getUser(store.user.id));
          const message = `Houlry is staked`;
          const title = `Complete Hourly Staking. You got ${item.amount} HDT`;
          service.localNotif(message, title);
        }
      });
      socket.socket.on('complete_stake', item => {
        if (store.user.id === item.id) {
          dispatch(getUser(store.user.id));
          const message = `Staking is completed`;
          const title = `Complete Staking. You earned ${item.earned_amount} HDT`;
          service.localNotif(message, title);
        }
      });
      socket.socket.on('app_transaction', item => {
        if (store.user.address === item.address) {
          dispatch(getUser(store.user.id));
          const message = `${item.amount} ${item.method} withdraw is success.`;
          const title = 'Success withdraw';
          service.localNotif(message, title);
        }
      });
      socket.socket.on('complete_transfer', item => {
        if (store.user.address === item.user) {
          dispatch(getUser(store.user.id));
          const message = `${item.amount} ${item.method} transfer is success.`;
          const title = 'Success transfer';
          service.localNotif(message, title);
        }
      });
    }
  }, [socket]);
  return <Routes />;
};
export default App;
