import { combineReducers } from "redux";
// import cartReducer from "./cartReducers";
import productReducer from "./productReducers";
import userReducer from "./userReducers";
import loginReducer from "./loginReducers";
import paReducer from "./paReducers";
import verifyReducer from "./verifyReducers";
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
  Products: productReducer,
  Users: userReducer,
  Logins: loginReducer,
  Pas: paReducer,
  Verifs: verifyReducer,
  Dashboards: dashboardReducer,
});
