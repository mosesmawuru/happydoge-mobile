import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {GET_ERRORS, GET_HISTORY_DATA, HISTORY_LOADING} from './type';

export const getHistoryById = id => {
  return async dispatch => {
    dispatch({type: HISTORY_LOADING});
    await axios
      .post(SERVER_URL + '/history', {id})
      .then(res => {
        dispatch({type: GET_HISTORY_DATA, payload: res.response.data});
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
