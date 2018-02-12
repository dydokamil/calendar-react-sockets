import { GET_MONTH_DETAILS } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_MONTH_DETAILS:
      return action.payload;
    default:
      return state;
  }
}
