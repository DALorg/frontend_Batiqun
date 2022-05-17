import {
    LOGIN_ADMIN,
    LOGIN_ERROR,
    LOGIN_USERS
  } from "./types";
  
  const initialState = {
    userdatas: [],
    userdata: {},
    loading: true,
  };
  
  export default function loginReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_ADMIN:
        return {
          ...state,
          userdata: action.payload,
          loading: false,
        };
        
      case LOGIN_USERS:
        return {
          ...state,
          userdata: action.payload,
          loading: false,
        };
  
      case LOGIN_ERROR:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  }
  