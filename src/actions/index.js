import axios from "axios";
import moment from "moment";

export const GET_MONTH_DETAILS = "get_month_details";

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
