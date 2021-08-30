import {combineReducers} from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import historyReducer from './historyReducer';
import profileReducer from './profileReducer';
import swapReducer from './swapReducer';
import transferReducer from './transferReducer';
import priceReducer from './priceReducer';
import adminReducer from './adminReducer';
import stakeReducer from './stakeReducer';
import userReducer from './userReducer';

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
  user:userReducer
});
