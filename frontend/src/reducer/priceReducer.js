import {GET_PRICE_DATA, PRICE_LOADING} from '../actions/type';

const initialState = {
  pricedata: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PRICE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PRICE_DATA:
      return {
        ...state,
        pricedata: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
