import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {getUser} from './profileAction';
import {GET_ERRORS} from './type';

export const stack = (ID, amount, userid) => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/stack', {ID, amount})
      .then(res => {
        dispatch(getUser(userid));
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
