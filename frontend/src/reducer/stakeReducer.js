import {GET_STAKE_DATA, STAKE_LOADING} from '../actions/type';

const initialState = {
  stakedata: [],
  earndata: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STAKE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_STAKE_DATA:
      return {
        ...state,
        stakedata: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
