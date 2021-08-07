import {GET_HISTORY_DATA, HISTORY_LOADING} from '../actions/type';

const initialState = {
  historydata: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HISTORY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_HISTORY_DATA:
      return {
        ...state,
        historydata: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
