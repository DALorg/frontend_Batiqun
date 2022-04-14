import {
  ADD_PRODUCTS,
  EDIT_PRODUCTS,
  GET_BY_ID_PRODUCTS,
  DELETE_PRODUCTS,
  GET_PRODUCTS,
  PRODUCTS_ERROR,
} from "../reducers/types";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.post(`https://batiqunapi.azurewebsites.net/api/product/get`, 
    {      
      objRequestData: {
        ProductId: "7Tk$K9N2nJIPW1BkBiCjpA__"
      }
    });
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data.objData,
    });
    console.log(res.data.objData);
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: error,
    });
    console.log(error);
  }
};

export const saveProduct = (objRequestData) => async (dispatch) => {
  try {
    var testResp = {
        objRequestData
    };
    debugger;
    await axios
      .post(`https://batiqunapi.azurewebsites.net/api/product/savedata`, testResp)
      .then((response) => {
        dispatch({
          type: ADD_PRODUCTS,
          payload: response.data,
        });
        console.log(response);
      });
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: error,
    });
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    debugger;
    await axios.post(`https://batiqunapi.azurewebsites.net/api/product/delete`, 
    {      
      objRequestData: {
        ProductId: id
      }
    })
      .then((response) => {
        dispatch({
          type: DELETE_PRODUCTS,
          payload: response.data,
        });
        console.log(response);
      });
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: error,
    });
    console.log(error);
  }
};

export const getById = (id) => async (dispatch) => {
  try {
    debugger;
    await axios.post(`https://batiqunapi.azurewebsites.net/api/product/get`, 
    {      
      objRequestData: {
        ProductId: id
      }
    })
      .then((response) => {
        dispatch({
          type: GET_BY_ID_PRODUCTS,
          payload: response.data.objData,
        });
      });
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: error,
    });
    console.log(error);
  }
};
