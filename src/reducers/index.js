import { combineReducers } from "redux";
import monthDetailsReducer from "./month_details_reducer";

const rootReducer = combineReducers({
  monthDetails: monthDetailsReducer
});

export default rootReducer;
