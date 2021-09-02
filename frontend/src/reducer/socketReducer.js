import {GET_SOCKET_DATA} from '../actions/type';

const initialState = {
  socket: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SOCKET_DATA:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
}
