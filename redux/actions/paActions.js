import {
    GET_PA,
    PA_ERROR,
    EDIT_PA
  } from "../reducers/types";
  import axios from "axios";
  import Cookies from 'js-cookie';
  
  
  export const getPApaging = (Page, Length, Search, asc) => async (dispatch) => {
    try {
      const res = await axios.post(global.apiurl + `/api/ProductActivity/GetPaid`, 
      {      
        objRequestData: {
        intPage: Page,
        intLength: Length,
        txtSearch: Search,
        bitAscending: asc
      }
      });
      dispatch({
        type: GET_PA,
        payload: res.data,
      });
      console.log(res.data.objData);
    } catch (error) {
      dispatch({
        type: PA_ERROR,
        payload: error,
      });
      console.log(error);
    }
  };
  
  export const PayUser = (objRequestData, token) => async (dispatch) => {
    try {
      var testResp = {
          objRequestData
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      debugger;
      await axios
        .post(global.apiurl + `/api/ProductActivity/PayUser`, testResp, config)
        .then((response) => {
          dispatch({
            type: EDIT_PA,
            payload: response.data,
          });
          console.log(response);
        });
    } catch (error) {
      dispatch({
        type: PA_ERROR,
        payload: error,
      });
      console.log(error);
    }
  };
