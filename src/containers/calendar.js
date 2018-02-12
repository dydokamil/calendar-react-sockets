import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";

function getMonthDetails(year, month) {
  const firstDay = moment(`${year}-${month}-1`, "YYYY-MM-DD");
  const firstDayConst = firstDay;
  const daysInMonth = firstDay.daysInMonth();

  return _.map(_.range(daysInMonth - 1), addDays => {
    return moment(firstDay).add(addDays, "days");
  });
}

export default class Calendar extends Component {
  render() {
    console.log(getMonthDetails(2018, 1));
    return (
      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="no-margin-bottom row">
              <div className="col s1">
                <span className="fas fa-angle-double-left" />
              </div>
              <div align="center" className="col s10">
                {moment().weeksInYear()}
              </div>
              <div className="col s1" align="right">
                <span className="fas fa-angle-double-right" />
              </div>
            </div>
          </div>
          {/* body */}
          <div className="card-action">
            <table>
              <tbody />
            </table>
          </div>
        </div>
      </div>
    );
  }
}
