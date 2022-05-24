import {
    GET_PA,
    EDIT_PA,
    PA_ERROR
  } from "./types";
  
  const initialState = {
    pas: [],
    pa: {},
    loading: true,
  };
  
  export default function paReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PA:
        return {
          ...state,
          pas: action.payload,
          loading: false,
        };
        
      case EDIT_PA:
        return {
          ...state,
          pa: action.payload,
          loading: false,
        };
  
      case PA_ERROR:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  }
  