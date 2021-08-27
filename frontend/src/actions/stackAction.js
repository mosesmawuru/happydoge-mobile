import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {getUser} from './profileAction';
import {GET_ERRORS} from './type';

export const addStake = data => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/stack', data)
      .then(res => {
        dispatch(getUser(data.ID));
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
