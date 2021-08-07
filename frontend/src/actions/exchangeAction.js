import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {GET_ERRORS, GET_PRICE_DATA, PRICE_LOADING} from './type';

export const getPrice = () => {
  return async dispatch => {
    await axios
      .get(SERVER_URL + '/price')
      .then(res => {
        dispatch({type: GET_PRICE_DATA, payload: res.data});
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
export const addPrice = price => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/price', {price})
      .then(res => {
        dispatch(getPrice());
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
