import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";

import { getMonthDetails, fetchEvents } from "../actions";
import AddEvent from "./add_event";

class Calendar extends Component {
  componentWillMount() {
    const now = moment();
    this.props.getMonthDetails(now.year(), now.month());
    this.changeMonth = this.changeMonth.bind(this);
    this.displayAddEvent = this.displayAddEvent.bind(this);
    // this.closeAddEvent = this.closeAddEvent.bind(this);

    this.setState({
      day: null, // currently selected day
      showComponent: false // display add_event component?
    });

    this.props.fetchEvents("admin", "zaq12wrx", now.year(), now.month() + 1);
  }

  nextMonth = () => this.changeMonth(true);
  previousMonth = () => this.changeMonth(false);

  changeMonth(next) {
    // when an arrow has been pressed
    this.setState({ day: 1 });
    let currentMonth = moment(
      `${this.props.monthDetails.year}-${this.props.monthDetails.month + 1}-1`,
      "YYYY-MM-DD"
    );
    if (next) {
      currentMonth.add(1, "month");
      this.props.getMonthDetails(currentMonth.year(), currentMonth.month());
    } else {
      currentMonth.subtract(1, "month");

      this.props.getMonthDetails(currentMonth.year(), currentMonth.month());
    }
    this.props.fetchEvents(
      "admin",
      "zaq12wrx",
      currentMonth.year(),
      currentMonth.month() + 1
    );
  }

  displayAddEvent(test, id) {
    this.setState({ showComponent: true, day: id });
  }

  closeAddEvent() {
    this.setState({ showComponent: false, day: undefined });
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-content blue lighten-4">
            <div className="no-margin-bottom row">
              <div className="col s2">
                <button
                  className="unstylized-button blue lighten-4"
                  onClick={this.previousMonth.bind(this)}
                >
                  <i className="material-icons">keyboard_arrow_left</i>
                </button>
              </div>
              <div align="center" className="col s8">
                {this.props.monthDetails.first &&
                  `${this.props.monthDetails.year}, ${
                    this.props.monthDetails.monthName
                  }`}
              </div>
              <div className="col s2" align="right">
                <button
                  className="unstylized-button blue lighten-4"
                  onClick={this.nextMonth.bind(this)}
                >
                  <i className="material-icons">keyboard_arrow_right</i>
                </button>
              </div>
            </div>
          </div>
          {/* body */}
          <div className="card-action">
            <table className="center">
              <tbody>
                <tr>
                  <td>M</td>
                  <td>T</td>
                  <td>W</td>
                  <td>T</td>
                  <td>F</td>
                  <td>S</td>
                  <td>S</td>
                </tr>
                {this.props.monthDetails.first &&
                  _.map(
                    _.range(
                      Math.ceil(
                        (this.props.monthDetails.last.day +
                          this.props.monthDetails.first.weekday -
                          1) /
                          7
                      )
                    ),
                    week => {
                      return (
                        <tr key={week}>
                          {_.map(_.range(7), day => {
                            return week * 7 + day + 1 >=
                              this.props.monthDetails.first.weekday &&
                              week * 7 +
                                day +
                                1 -
                                this.props.monthDetails.first.weekday <
                                this.props.monthDetails.last.day ? (
                              <td key={day}>
                                <button
                                  onClick={event => {
                                    this.displayAddEvent(
                                      event,
                                      week * 7 +
                                        day +
                                        2 -
                                        this.props.monthDetails.first.weekday
                                    );
                                  }}
                                  className={`btn-floating waves-effect ${
                                    moment().month() ===
                                      this.props.monthDetails.month &&
                                    parseInt(moment().format("DD"), 10) ===
                                      week * 7 +
                                        day +
                                        2 -
                                        this.props.monthDetails.first.weekday
                                      ? "red"
                                      : ""
                                  }`}
                                >
                                  {week * 7 +
                                    day +
                                    2 -
                                    this.props.monthDetails.first.weekday}
                                </button>
                              </td>
                            ) : (
                              <td key={day} />
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
        {this.state.showComponent && (
          <AddEvent
            year={this.props.monthDetails.year}
            month={this.props.monthDetails.month + 1}
            day={this.state.day}
            closeComponent={this.closeAddEvent.bind(this)}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { monthDetails: state.monthDetails, events: state.events };
}

export default connect(mapStateToProps, { getMonthDetails, fetchEvents })(
  Calendar
);
