import _ from "lodash";

import {
  ADD_EVENT,
  FETCH_EVENTS,
  DELETE_EVENT,
  ADD_EVENT_SOCKET,
  DELETE_EVENT_SOCKET
} from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_EVENT:
      return { ...state, [action.payload.data._id]: action.payload.data };
    case ADD_EVENT_SOCKET:
      console.log(action.payload);
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_EVENTS:
      return _.mapKeys(action.payload.data, "_id");
    case DELETE_EVENT:
      if (action.error) {
        return action.payload.data;
      }
      return _.omit(state, action.id);
    case DELETE_EVENT_SOCKET:
      return _.omit(state, action.id);
    default:
      return state;
  }
}
