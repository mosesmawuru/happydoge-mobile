import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {TRANSACTION_LOADING, GET_TRANSACTION_DATA, GET_ERRORS} from './type';
import {getUser} from '../actions/profileAction';
export const getWithdraw = () => {
  return async dispatch => {
    dispatch({type: TRANSACTION_LOADING});
    await axios
      .get(SERVER_URL + '/withdraw')
      .then(res => {
        dispatch({type: GET_TRANSACTION_DATA, payload: res.data});
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
export const rejectWithdraw = item => {
  return async dispatch => {
    dispatch({type: TRANSACTION_LOADING});
    await axios
      .post(SERVER_URL + '/withdraw/reject', {item})
      .then(res => {
        dispatch(getWithdraw());
        // dispatch(getUser(item.))
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
