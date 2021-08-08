import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {GET_ERRORS} from './type';
export const withdraw = (data, setVisible) => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/withdraw', data)
      .then(res => {
        console.log(res);
        setVisible();
        //   dispatch({type: GET_PRICE_DATA, payload: res.data});
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
