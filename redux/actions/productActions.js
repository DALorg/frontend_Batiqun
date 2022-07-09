import {
  ADD_PRODUCTS,
  EDIT_PRODUCTS,
  DELETE_PRODUCTS,
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  GET_BY_ID_PRODUCTS
} from "../reducers/types";
import axios from "axios";
import Cookies from 'js-cookie';
import "../../styles/GlobalVariable"

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.post(global.apiurl + `/api/product/get`, 
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

export const getById = (id) => async (dispatch) => {
  try {
    await axios.post(global.apiurl + `/api/product/get`, 
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

export const addProduct = (objRequestData, token) => async (dispatch) => {
  try {
    var testResp = {
        objRequestData
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    debugger;
    await axios
      .post(global.apiurl + `/api/product/CreateProduct`, testResp, config)
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

export const editProduct = (objRequestData, token) => async (dispatch) => {
  try {
    var testResp = {
        objRequestData
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    debugger;
    await axios
      .post(global.apiurl + `/api/product/savedata`, testResp, config)
      .then((response) => {
        dispatch({
          type: EDIT_PRODUCTS,
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

export const mintProduct = (objRequestData, token) => async (dispatch) => {
  try {
    var testResp = {
        objRequestData
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    debugger;
    await axios
      .post(global.apiurl + `/api/product/Mint`, testResp, config)
      .then((response) => {
        dispatch({
          type: EDIT_PRODUCTS,
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

export const BuyProduct = (objRequestData, token) => async (dispatch) => {
  try {
    var testResp = {
        objRequestData
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    debugger;
    await axios
      .post(global.apiurl + `/api/product/BuyProduct`, testResp, config)
      .then((response) => {
        dispatch({
          type: EDIT_PRODUCTS,
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

export const SellProduct = (objRequestData, token) => async (dispatch) => {
  try {
    var testResp = {
        objRequestData
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    debugger;
    await axios
      .post(global.apiurl + `/api/product/sell`, testResp, config)
      .then((response) => {
        dispatch({
          type: EDIT_PRODUCTS,
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

export const TransferProduct = (objRequestData, token) => async (dispatch) => {
  try {
    var testResp = {
        objRequestData
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    debugger;
    await axios
      .post(global.apiurl + `/api/product/TransferProduct`, testResp, config)
      .then((response) => {
        dispatch({
          type: EDIT_PRODUCTS,
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
          type: EDIT_PRODUCTS,
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

export const TransferAfterBuy = (objRequestData, token) => async (dispatch) => {
  try {
    var testResp = {
        objRequestData
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    debugger;
    await axios
      .post(global.apiurl + `/api/product/TransferAfterBuy`, testResp, config)
      .then((response) => {
        dispatch({
          type: EDIT_PRODUCTS,
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
    await axios.post(global.apiurl + `/api/product/delete`, 
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

export const ApproveProduct = (id) => async (dispatch) => {
  try {
    debugger;
    await axios.get(global.apiurl + `/api/product/Approve/` + id)
      .then((response) => {
        dispatch({
          type: EDIT_PRODUCTS,
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

export const RejectProduct = (id) => async (dispatch) => {
  try {
    debugger;
    await axios.get(global.apiurl + `/api/product/Reject/` + id)
      .then((response) => {
        dispatch({
          type: EDIT_PRODUCTS,
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