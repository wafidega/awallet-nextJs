import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import transfer from "./transfer";

export default combineReducers({
  auth,
  profile,
  transfer,
});
