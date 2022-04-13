import { GET_CARTS, CARTS_ERROR } from "./types";

const initialState = {
  carts: [],
  cart: {},
  loading: true,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARTS:
      return {
        ...state,
        carts: action.payload,
        loading: false,
      };

    case CARTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
