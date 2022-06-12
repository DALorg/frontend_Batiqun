import axios from "axios";
import "../../styles/GlobalVariable"
import { DASHBOARD_ERROR, GET_DASHBOARD } from "../reducers/types";

export const getDashboard = (id, token) => async (dispatch) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await axios.post(global.apiurl + `/api/Leaderboard/Dashboard`,{
            objRequestData: {
                ethAddress: id
            }
        }, config);
        dispatch({
            type: GET_DASHBOARD,
            payload: res.data,
        });
        console.log(res.data.objData);
    } catch (error) {
        dispatch({
            type: DASHBOARD_ERROR,
            payload: error,
        });
    }
};