import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_SOCKET_DATA,
  GET_WEB3_DATA,
  CLEAR_ERRORS,
} from './type';
import io from 'socket.io-client';
import Web3 from 'web3';
//@user Login
export const userLogin = (username, password, navigation) => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/users/login', {username, password})
      .then(res => {
        const {token} = res.data;
        AsyncStorage.setItem('jwtToken', token);
        setAuthToken(token);

        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        navigation.navigate('Main');
        var socket = io(SERVER_URL, {
          transports: ['websocket'],
        });
        const web3 = new Web3(
          new Web3.providers.HttpProvider(
            'https://ropsten.infura.io/v3/43abad80628540079b649332f37de4fb',
          ),
        );
        dispatch({type: GET_WEB3_DATA, payload: web3});
        dispatch({type: GET_SOCKET_DATA, payload: socket});
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
//@user Register
export const userRegister = (username, password, referralcode, navigation) => {
  return async dispatch => {
    axios
      .post(SERVER_URL + '/users/register', {
        username,
        password,
        referralcode,
      })
      .then(res => {
        if (res.data.msg === 'success') {
          navigation.navigate('Login');
        }
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
//@user Logout
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  AsyncStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
//@set Current User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
