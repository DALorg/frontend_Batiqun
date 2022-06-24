import {
    GET_VERIFY,
    VERIFY_ADMIN,
    VERIFY_ERROR
  } from "../reducers/types";
  import axios from "axios";
  import Cookies from 'js-cookie';
  
  
  export const getVerifpaging = (Page, Length, Search, token) => async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.post(global.apiurl + `/api/user/GetUnverifyProfile`, 
      {      
        objRequestData: {
        intPage: Page,
        intLength: Length,
        txtSearch: Search
      }
      }, config);
      dispatch({
        type: GET_VERIFY,
        payload: res.data,
      });
      console.log(res.data.objData);
    } catch (error) {
      dispatch({
        type: VERIFY_ERROR,
        payload: error,
      });
      console.log(error);
    }
  };
  
  export const VerifAdmin = (ethAddress, token) => async (dispatch) => {
    try {
      var testResp ={
        objRequestData: {
            ethAddress: ethAddress
        }
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      debugger;
      await axios
        .post(global.apiurl + `/api/user/VerifyasAdmin`, testResp, config)
        .then((response) => {
          dispatch({
            type: VERIFY_ADMIN,
            payload: response.data,
          });
          console.log(response);
        });
    } catch (error) {
      dispatch({
        type: VERIFY_ERROR,
        payload: error,
      });
      console.log(error);
    }
  };
