import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../utils/setAuthToken';
import {GET_ERRORS, SET_CURRENT_USER} from './type';

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
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
export const userRegister = (
  username,
  password,
  address,
  referralcode,
  navigation,
) => {
  return async dispatch => {
    axios
      .post(SERVER_URL + '/users/register', {
        username,
        password,
        address,
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
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  AsyncStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
