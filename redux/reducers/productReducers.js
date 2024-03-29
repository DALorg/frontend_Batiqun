import {
  ADD_PRODUCTS,
  EDIT_PRODUCTS,
  DELETE_PRODUCTS,
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  GET_BY_ID_PRODUCTS
} from "./types";

const initialState = {
  products: [],
  product: {},
  bitSuccessEdit: null,
  loading: true,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        bitSuccessEdit: null,
        loading: false,
      };
      
    case GET_BY_ID_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        bitSuccessEdit: null,
        loading: false,
      };

    case ADD_PRODUCTS:
      return {
        ...state,
        products: state.products.concat(action.payload),
        bitSuccessEdit: action.payload.bitSuccess,
        loading: false,
      };

    case EDIT_PRODUCTS:
      return {
        ...state,
        products: state.products.map((product) =>
          Number(product.id) === Number(action.payload.id)
            ? (product = action.payload)
            : product
        ),
        loading: false,
      };

    case DELETE_PRODUCTS:
      const filteredState = state.products.filter(
        (product) => Number(product.id) !== Number(action.payload.id)
      );
      return { ...state, products: filteredState };

    case PRODUCTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
