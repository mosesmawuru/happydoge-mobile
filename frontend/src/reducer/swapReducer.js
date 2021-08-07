import {GET_SWAP_DATA, SWAP_LOADING} from '../actions/type';

const initialState = {
  swapdata: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SWAP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SWAP_DATA:
      return {
        ...state,
        swapdata: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
