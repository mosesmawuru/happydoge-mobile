import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import isEmpty from './src/utils/isEmpty';
import NotifService from './src/notification/NotifService';
import {getUser} from './src/actions/profileAction';
import {getHistoryById} from './src/actions/historyAction';
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
          dispatch(getHistoryById(store.user.id));

          const message = `Congratulations! ${Number(item.amount).toFixed(2)}${
            item.flag === 'eth' ? 'ETH' : 'HDT'
          } has been successfully credited to your wallet.`;
          const title = 'Deposit Complete Successfully';
          service.localNotif(message, title);
        }
      });

      socket.socket.on('referral_deposit', item => {
        if (store.user.address === item.address) {
          dispatch(getUser(store.user.id));
          dispatch(getHistoryById(store.user.id));
          const message = `Congratulations! Your account has been successfully credited with $${Number(
            item.balance,
          ).toFixed(2)} USDT as Referral bonus`;
          const title = 'Referral Balance Earned';
          service.localNotif(message, title);
        }
      });
      socket.socket.on('hourly_stake', item => {
        if (store.user.id === item.id) {
          dispatch(getUser(store.user.id));
          dispatch(getHistoryById(store.user.id));
          const message = `Congratulations! Your account has been successfully credited with ${Number(
            item.amount,
          ).toFixed(2)} HDT.`;
          const title = `Staking Reward Received`;
          service.localNotif(message, title);
        }
      });
      socket.socket.on('complete_stake', item => {
        if (store.user.id === item.id) {
          dispatch(getUser(store.user.id));
          dispatch(getHistoryById(store.user.id));
          const message = `Congratulations! You have earned ${Number(
            item.earned_amount,
          ).toFixed(
            2,
          )} HDT and your staking contract has expired. Please tap to renew it.`;
          const title = `Staking Reward Earned`;
          service.localNotif(message, title);
        }
      });
      socket.socket.on('app_transaction', item => {
        if (store.user.address === item.address) {
          dispatch(getUser(store.user.id));
          dispatch(getHistoryById(store.user.id));
          const message = `Congratulations! ${Number(item.amount).toFixed(2)} ${
            item.method === 'eth'
              ? 'ETH'
              : item.method === 'hdt'
              ? 'HDT'
              : item.method === 'usdt'
              ? 'USDT'
              : ''
          }  has been successfully withdrawn.`;
          const title = 'Withdraw Complete Successfully';
          service.localNotif(message, title);
        }
      });
      socket.socket.on('complete_transfer', item => {
        if (store.user.address === item.user) {
          dispatch(getUser(store.user.id));
          dispatch(getHistoryById(store.user.id));
          const message = `Congratulations! ${Number(item.amount).toFixed(2)} ${
            item.method === 'eth'
              ? 'ETH'
              : item.method === 'hdt'
              ? 'HDT'
              : item.method === 'usdt'
              ? 'USDT'
              : ''
          } has been successfully Transferred.`;
          const title = 'Transfer Complete Successfully';
          service.localNotif(message, title);
        }
      });
    }
  }, [socket]);
  return <Routes />;
};
export default App;
