import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
export const deposit = (data, showModal) => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/deposit', data)
      .then(res => {
        //   dispatch({type: GET_PRICE_DATA, payload: res.data});
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
