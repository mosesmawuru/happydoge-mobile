import {combineReducers} from 'redux';

import errorReducer from './errorReducer';
import transferReducer from './transferReducer';
import historyReducer from './historyReducer';
import profileReducer from './profileReducer';
import priceReducer from './priceReducer';
import adminReducer from './adminReducer';
import stakeReducer from './stakeReducer';
import swapReducer from './swapReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import socketReducer from './socketReducer';
import web3Reducer from './web3Reducer';

export default combineReducers({
  auth: authReducer,
  history: historyReducer,
  profile: profileReducer,
  swap: swapReducer,
  transfer: transferReducer,
  errors: errorReducer,
  price: priceReducer,
  transaction: adminReducer,
  stake: stakeReducer,
  user: userReducer,
  socket: socketReducer,
  web3: web3Reducer,
});
