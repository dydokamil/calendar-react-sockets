import axios from "axios";
import moment from "moment";

export const GET_MONTH_DETAILS = "get_month_details";
export const FETCH_EVENTS = "fetch_events";
export const ADD_EVENT = "add_event";

const ROOT_URL = "http://localhost:8000/calendar/rest";

export function getMonthDetails(year, month) {
  const calendarMonth = month + 1;
  const firstDay = moment(`${year}-${calendarMonth}-1`, "YYYY-MM-DD");
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

export function addEvent(
  day,
  label,
  login, // login/password for brevity
  password,
  start_datetime = null,
  end_datetime = null
) {
  const request = axios.post(`${ROOT_URL}/calendar_entry/`, {
    label,
    start_datetime,
    end_datetime,
    auth: {
      username: login,
      password: password
    }
  });

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
  console.log(year);
  console.log(month);
  const request = axios.get(`${ROOT_URL}/calendar_entry/`, {
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
