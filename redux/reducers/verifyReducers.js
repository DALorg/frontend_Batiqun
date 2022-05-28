import {
    GET_VERIFY,
    VERIFY_ADMIN,
    VERIFY_ERROR
  } from "./types";
  
  const initialState = {
    verifs: [],
    verif: {},
    loading: true,
  };
  
  export default function verifyReducer(state = initialState, action) {
    switch (action.type) {
      case GET_VERIFY:
        return {
          ...state,
          verifs: action.payload,
          loading: false,
        };
        
      case VERIFY_ADMIN:
        return {
          ...state,
          verif: action.payload,
          loading: false,
        };
  
      case VERIFY_ERROR:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  }
  