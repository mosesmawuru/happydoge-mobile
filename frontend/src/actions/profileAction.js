import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {GET_ERRORS, GET_PROFILE_DATA, PROFILE_LOADING} from './type';

export const getUser = id => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/users/getuser', {id: id})
      .then(res => {
        dispatch({type: GET_PROFILE_DATA, payload: res.data});
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
