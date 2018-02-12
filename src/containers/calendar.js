import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";

import { getMonthDetails } from "../actions";

class Calendar extends Component {
  componentWillMount() {
    const now = moment();
    this.props.getMonthDetails(2018, 3);
    this.changeMonth = this.changeMonth.bind(this);
  }

  nextMonth = () => this.changeMonth(true);
  previousMonth = () => this.changeMonth(false);

  changeMonth(next) {
    let currentMonth = moment(
      `${this.props.monthDetails.year}-${this.props.monthDetails.month}-1`,
      "YYYY-MM-DD"
    );
    if (next) {
      currentMonth.add(1, "month");
      return this.props.getMonthDetails(
        currentMonth.year(),
        currentMonth.month() + 1
      );
    } else {
      currentMonth.subtract(1, "month");
      return this.props.getMonthDetails(
        currentMonth.year(),
        currentMonth.month() + 1
      );
    }
  }

  render() {
    let currentMonth = moment(`2018-4-1`, "YYYY-MM-DD");
    console.log(currentMonth.format("MMMM"));
    console.log(currentMonth.isoWeekday());

    return (
      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="no-margin-bottom row">
              <div className="col s1">
                <button onClick={this.previousMonth.bind(this)}>
                  <span className="fas fa-angle-double-left" />
                </button>
              </div>
              <div align="center" className="col s10">
                {this.props.monthDetails.first &&
                  `${this.props.monthDetails.year}, ${
                    this.props.monthDetails.monthName
                  }`}
              </div>
              <div className="col s1" align="right">
                <button onClick={this.nextMonth.bind(this)}>
                  <span className="fas fa-angle-double-right" />
                </button>
              </div>
            </div>
          </div>
          {/* body */}
          <div className="card-action">
            <table>
              <tbody>
                {this.props.monthDetails.first &&
                  _.map(
                    _.range(
                      this.props.monthDetails.last.week -
                        this.props.monthDetails.first.week +
                        1
                    ),
                    week => {
                      return (
                        <tr>
                          {_.map(_.range(7), day => {
                            return week * 7 + day + 1 >=
                              this.props.monthDetails.first.weekday &&
                              week * 7 +
                                day +
                                1 -
                                this.props.monthDetails.first.weekday <
                                this.props.monthDetails.last.day ? (
                              <td>
                                {week * 7 +
                                  day +
                                  2 -
                                  this.props.monthDetails.first.weekday}
                              </td>
                            ) : (
                              <td>-</td>
                            );
                          })}
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { monthDetails: state.monthDetails };
}

export default connect(mapStateToProps, { getMonthDetails })(Calendar);
