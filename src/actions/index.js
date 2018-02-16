import axios from "axios";
import moment from "moment";

export const GET_MONTH_DETAILS = "get_month_details";
export const FETCH_EVENTS = "fetch_events";
export const ADD_EVENT = "add_event";
export const ADD_EVENT_SOCKET = "add_event_socket";
export const DELETE_EVENT = "delete_event";
export const DELETE_EVENT_SOCKET = "delete_event_socket";

// const ROOT_URL = "https://calendar-django.herokuapp.com/calendar/rest";
const ROOT_URL = "http://localhost:8000";
const APP_URL = "events";

export function getMonthDetails(year, month) {
  const firstDay = moment({ year, month });
  const lastDay = moment(firstDay).endOf("month");

  return {
    type: GET_MONTH_DETAILS,
    payload: {
      first: {
        weekday: firstDay.isoWeekday(),
        day: firstDay.date(),
        week: firstDay.isoWeek()
      },
      last: {
        weekday: lastDay.isoWeekday(),
        day: lastDay.date(),
        week: lastDay.isoWeek()
      },
      year,
      month,
      monthName: firstDay.format("MMMM")
    }
  };
}

export function addEventSocket(event) {
  return {
    type: ADD_EVENT_SOCKET,
    payload: event
  };
}

export function deleteEventSocket(id) {
  return {
    type: DELETE_EVENT_SOCKET,
    id
  };
}

export function addEvent(
  login, // login/password for brevity
  password,
  date,
  label,
  start = undefined,
  end = undefined
) {
  if (start && end) {
    start = moment
      .utc(`${date}T${start}`, "YYYY-MM-DDThh:mm A")
      .toDate()
      .toISOString();
    end = moment
      .utc(`${date}T${end}`, "YYYY-MM-DDThh:mm A")
      .toDate()
      .toISOString();
  } else {
    start = end = undefined;
  }
  const request = axios.post(
    `${ROOT_URL}/${APP_URL}/`,
    {
      label,
      start,
      end,
      date
    },
    {
      auth: {
        username: login,
        password: password
      }
    }
  );

  return {
    type: ADD_EVENT,
    payload: request
  };
}

export function fetchEvents(
  login,
  password,
  year = undefined,
  month = undefined,
  day = undefined
) {
  month = month ? month + 1 : month;
  const request = axios.get(`${ROOT_URL}/${APP_URL}/`, {
    auth: {
      username: login,
      password: password
    },
    params: {
      year,
      month,
      day
    }
  });

  return {
    type: FETCH_EVENTS,
    payload: request
  };
}

export function deleteEvent(login, password, id) {
  const request = axios.delete(`${ROOT_URL}/${APP_URL}/${id}/`, {
    auth: { username: login, password: password }
  });
  return {
    type: DELETE_EVENT,
    payload: request,
    id
  };
}
