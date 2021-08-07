import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {getUser} from './profileAction';
import {GET_ERRORS} from './type';

export const transfer = (
  owneraddress,
  toaddress,
  flag,
  amount,
  id,
  setVisible,
) => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/transfer', {owneraddress, toaddress, flag, amount})
      .then(res => {
        dispatch(getUser(id));
        setVisible();
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
