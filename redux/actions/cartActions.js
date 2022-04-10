import { GET_CARTS, CARTS_ERROR } from "../reducers/types";
import axios from "axios";

export const getCarts = () => async (dispatch) => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/carts`);
    dispatch({
      type: GET_CARTS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: CARTS_ERROR,
      payload: error,
    });
  }
};
