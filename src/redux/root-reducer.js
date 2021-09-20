// the root-reducer is the actual base reducer object that rapresents all of the states of our app

//in order to gather all the reducers, we call combineReducers
import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";

export default combineReducers({
  user: userReducer,
});
 