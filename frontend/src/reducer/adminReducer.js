import {GET_TRANSACTION_DATA, TRANSACTION_LOADING} from '../actions/type';

const initialState = {
  transdata: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TRANSACTION_DATA:
      return {
        ...state,
        transdata: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
