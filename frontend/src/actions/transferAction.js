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
  onShowModal,
) => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/transfer', {owneraddress, toaddress, flag, amount})
      .then(res => {
        console.log(res.data);
        if (res.data.msg === 'success') {
          onShowModal(toaddress, flag, amount);
          dispatch(getUser(id));
        }
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};