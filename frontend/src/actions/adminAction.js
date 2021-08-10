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
        dispatch({type: GET_TRANSACTION_DATA, payload: res.response.data});
      })
      .catch(err => {
        console.log(err);
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
