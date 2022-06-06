import {
  ADD_USERS,
  DELETE_USERS,
  GET_USERS,
  USERS_ERROR,
  EDIT_USERS,
} from "../reducers/types";
import axios from "axios";
import "../../styles/GlobalVariable"

export const getUsers = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.post(global.apiurl + `api/user/GetUserByethAddress`, {      
      objRequestData: {
        ethAddress: id
      }
    }, config);
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
    console.log(res.data.objData);
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const getProfile = (id, currentid, token, isCreated, isFav, Page, Length) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.post(global.apiurl + `api/user/GetProfileByethAddress`, {      
      objRequestData: {
        intPage: Page,
        intLength: Length,
        ethAddress: id,
        CurrentethAddress: currentid,
        bitCreated: isCreated,
        bitFav: isFav
      }
    }, config);
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
    console.log(res.data.objData);
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};


export const editUser = (objRequestData, token ) => async (dispatch) => {
  try {
    var testResp = {
      objRequestData
  };
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.post(global.apiurl + `api/user/savedata`, testResp, config);
      dispatch({
        type: EDIT_USERS,
        payload: res.data,
      });
      console.log(res.data);
    } catch (error) {
  dispatch({
    type: USERS_ERROR,
    payload: error,
  });
  console.log(error);
}
};

export const deleteUsers = (id) => async (dispatch) => {
  try {
    await axios
      .delete(`https://fakestoreapi.com/users/${id}`)
      .then((response) => {
        dispatch({
          type: DELETE_USERS,
          payload: response.data,
        });
        console.log(response);
      });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const addUsers = (objRequestData, token) => async (dispatch) => {
  try {
    var testResp = {
      objRequestData
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    debugger;
    await axios
      .post(`https://batiqunapi.azurewebsites.net/api/user/savedata`, testResp, config)
      .then((response) => {
        dispatch({
          type: ADD_USERS,
          payload: response.data,
        });
        console.log(response);
      });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
    console.log(error);
  }
};
