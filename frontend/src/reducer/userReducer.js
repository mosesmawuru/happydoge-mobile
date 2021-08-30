import {
  GET_USER_DATA,
  GET_SELECTED_USER,
  USER_LOADING,
  GET_USER_WITHDRAW_DATA,
  GET_USER_TRANSFER_DATA,
  GET_USER_STAKE_DATA,
  GET_USER_REFERRAL_DATA,
} from '../actions/type';

const initialState = {
  userdata: [],
  selectedUser: {},
  stakedata: [],
  referraldata: [],
  withdrawdata: [],
  transferdata: [],
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
    case GET_USER_WITHDRAW_DATA:
      return {
        ...state,
        withdrawdata: action.payload,
        loading: false,
      };
    case GET_USER_TRANSFER_DATA:
      return {
        ...state,
        transferdata: action.payload,
        loading: false,
      };
    case GET_USER_STAKE_DATA:
      return {
        ...state,
        stakedata: action.payload,
        loading: false,
      };
    case GET_USER_REFERRAL_DATA:
      return {
        ...state,
        referraldata: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
