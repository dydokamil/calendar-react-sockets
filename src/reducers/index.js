import { combineReducers } from "redux";
import monthDetailsReducer from "./month_details_reducer";
import eventsReducer from "./event_reducer";

const rootReducer = combineReducers({
  monthDetails: monthDetailsReducer,
  events: eventsReducer
});

export default rootReducer;
