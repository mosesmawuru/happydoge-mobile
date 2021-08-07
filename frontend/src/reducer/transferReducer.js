import {GET_TRANSFER_DATA, TRANSFER_LOADING} from '../actions/type';

const initialState = {
  transferdata: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRANSFER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TRANSFER_DATA:
      return {
        ...state,
        transferdata: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
