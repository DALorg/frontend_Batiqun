import { DASHBOARD_ERROR, GET_DASHBOARD } from "./types";

const initialState = {
    dashboards: [],
    dashboard: {},
    bitSuccessEdit: null,
    loading: true,
};

export default function dashboardReducer(state = initialState, action){
    switch (action.type){
        case GET_DASHBOARD:
            return {
                ...state,
                dashboard: action.payload,
                bitSuccessEdit: null,
                loading: false,
            };
        
            case DASHBOARD_ERROR:
                return {
                    loading: false,
                    error: action.payload,
                };
            
            default:
                return state;
    }
}