import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {getUser} from '../actions/profileAction';
import {GET_ERRORS} from './type';

export const swaptoeth = (ID, amount, price, onShowModal) => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/swap/swaptoeth', {ID, amount, price})
      .then(res => {
        console.log(res);
        onShowModal('eth');
        dispatch(getUser(ID));
      })
      .catch(err => {
        console.log(err);
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};

export const swaptohdt = (ID, amount, price, onShowModal) => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/swap/swaptohdt', {ID, amount, price})
      .then(res => {
        onShowModal('hdt');
        dispatch(getUser(ID));
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
