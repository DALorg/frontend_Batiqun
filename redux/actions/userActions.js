import {
  ADD_USERS,
  DELETE_USERS,
  GET_USERS,
  USERS_ERROR,
} from "../reducers/types";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/users`);
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const addUsers = (user) => async (dispatch) => {
  try {
    await axios
      .post(`https://fakestoreapi.com/users`, user)
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
