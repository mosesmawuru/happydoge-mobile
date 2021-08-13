import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {GET_ERRORS} from './type';
import {getUser} from './profileAction';
export const deposit = (data, showModal) => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/deposit', data)
      .then(res => {
        showModal(data.flag, data.amount);
        dispatch(getUser(data.id));
        // dispatch({type: GET_PRICE_DATA, payload: res.data});
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
