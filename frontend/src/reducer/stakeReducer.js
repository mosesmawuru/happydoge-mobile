import {
  GET_STAKE_DATA,
  GET_EARN_DATA,
  STAKE_LOADING,
  EARN_LOADING,
} from '../actions/type';

const initialState = {
  stakedata: [],
  earndata: {},
  loading: true,
  enloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STAKE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case EARN_LOADING:
      return {
        ...state,
        enloading: true,
      };
    case GET_STAKE_DATA:
      return {
        ...state,
        stakedata: action.payload,
        loading: false,
        enloading: false,
      };
    case GET_EARN_DATA:
      return {
        ...state,
        earndata: action.payload,
        loading: false,
        enloading: false,
      };
    default:
      return state;
  }
}
