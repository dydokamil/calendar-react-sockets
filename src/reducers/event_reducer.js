import _ from "lodash";

import { ADD_EVENT, FETCH_EVENTS, DELETE_EVENT } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_EVENT:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_EVENTS:
      return _.mapKeys(action.payload.data, "id");
    case DELETE_EVENT:
      if (action.error) {
        return action.payload.data;
      }
      return _.omit(state, action.id);
    default:
      return state;
  }
}
