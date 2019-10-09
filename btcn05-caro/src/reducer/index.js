import { combineReducers } from "redux";

import history from "./history";
import board from "./board";

export default combineReducers({
  history,
  board
});
