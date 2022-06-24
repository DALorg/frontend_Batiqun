import axios from "axios";
import Cookies from "js-cookie";
import "../../styles/GlobalVariable"
import { DASHBOARD_ERROR, GET_DASHBOARD } from "../reducers/types";

export const getDashboard = () => async (dispatch) => {
    try {
       
        const res = await axios.get(global.apiurl + `/api/Leaderboard/Dashboard`);
      
        dispatch({
            type: GET_DASHBOARD,
            payload: res.data.objData,
        });
        console.log(res.data.objData);
    } catch (error) {
        dispatch({
            type: DASHBOARD_ERROR,
            payload: error,
        });
        console.log(error);
    }
};
