import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {getUser} from './profileAction';
import {getHistoryById} from '../../actions/historyAction';
import {
  GET_STAKE_DATA,
  STAKE_LOADING,
  GET_EARN_DATA,
  GET_ERRORS,
  EARN_LOADING,
} from './type';

export const addStake = (data, navigation) => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/stack', data)
      .then(res => {
        dispatch(getStake(data.ID));
        dispatch(getUser(data.ID));
        dispatch(getHistoryById(data.ID));

        navigation.navigate('Stacking');
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
export const getStake = ID => {
  return async dispatch => {
    dispatch({type: STAKE_LOADING});
    await axios
      .post(SERVER_URL + '/stack/getStake', {ID})
      .then(res => {
        dispatch({type: GET_STAKE_DATA, payload: res.data});
        dispatch(getUser(ID));
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};

// export const getEarn = ID => {
//   return async dispatch => {
//     await axios
//       .post(SERVER_URL + '/earn', {ID})
//       .then(res => {
//         dispatch({type: GET_EARN_DATA, payload: res.data});
//         dispatch(getUser(ID));
//       })
//       .catch(err => {
//         dispatch({type: GET_ERRORS, payload: err.response.data});
//       });
//   };
// };

export const getStakeByID = ID => {
  return async dispatch => {
    dispatch({type: EARN_LOADING});
    await axios
      .put(SERVER_URL + '/stack/getStake', {ID})
      .then(res => {
        dispatch({type: GET_EARN_DATA, payload: res.data});
        // dispatch(getUser(ID));
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};

export const Clear = () => {
  return async dispatch => {
    dispatch({type: GET_EARN_DATA, payload: {}});
  };
};
