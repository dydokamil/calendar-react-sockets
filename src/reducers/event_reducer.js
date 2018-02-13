import _ from "lodash";

import { ADD_EVENT, FETCH_EVENTS } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_EVENT:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_EVENTS:
      return _.mapKeys(action.payload.data, "id");
    default:
      return state;
  }
}
