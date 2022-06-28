import {
    LOGIN_ADMIN,
    LOGIN_USERS,
    LOGIN_ERROR
  } from "../reducers/types";
  import axios from "axios";
  
  export const LoginAdmin = (id) => async (dispatch) => {
    try {
      const res = await axios.post(global.apiurl + `/api/user/LoginAdmin`, 
      {      
        objRequestData: {
          ethAddress: id
        }
      });
      dispatch({
        type: LOGIN_ADMIN,
        payload: res.data.objData,
      });
      console.log(res.data.objData);
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
      console.log(error);
    }
  };
  
  export const LoginUser = (id) => async (dispatch) => {
    try {
      const res = await axios.post(global.apiurl + `/api/user/LoginUser`, 
      {      
        objRequestData: {
          ethAddress: id
        }
      });
      dispatch({
        type: LOGIN_USERS,
        payload: res.data.objData,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
      console.log(error);
    }
  };

  