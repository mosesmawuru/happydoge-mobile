import {GET_USER_DATA, GET_SELECTED_USER, USER_LOADING} from '../actions/type';

const initialState = {
  userdata: [],
  selectedUser: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_DATA:
      return {
        ...state,
        userdata: action.payload,
        loading: false,
      };
    case GET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
