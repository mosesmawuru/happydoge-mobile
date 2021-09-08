import {GET_WEB3_DATA} from '../actions/type';

const initialState = {
  web3: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WEB3_DATA:
      return {
        ...state,
        web3: action.payload,
      };
    default:
      return state;
  }
}
