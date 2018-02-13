import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
// import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Row } from "react-materialize";

import { getMonthDetails, fetchEvents } from "../actions";
import AddEvent from "./add_event";
import Events from "./events";

export function createDate(year, month, day) {
  return `${year > 9 ? year : `0${year}`}-${month > 9 ? month : `0${month}`}-${
    day > 9 ? day : `0${day}`
  }`;
}

class Calendar extends Component {
  componentWillMount() {
    const now = moment();
    this.props.getMonthDetails(now.year(), now.month());
    this.changeMonth = this.changeMonth.bind(this);
    this.displayAddEvent = this.displayAddEvent.bind(this);

    this.setState({
      day: null, // currently selected day
      showAddEventComponent: false // display add_event component?
    });

    this.props.fetchEvents("admin", "zaq12wrx", now.year(), now.month());
  }

  nextMonth = () => this.changeMonth(true);
  previousMonth = () => this.changeMonth(false);

  changeMonth(next) {
    // when an arrow has been pressed
    this.setState({ day: 1 });
    let currentMonth = moment({
      year: this.props.monthDetails.year,
      month: this.props.monthDetails.month
    });
    next ? currentMonth.add(1, "month") : currentMonth.subtract(1, "month");
    this.props.getMonthDetails(currentMonth.year(), currentMonth.month());

    this.props.fetchEvents(
      "admin",
      "zaq12wrx",
      currentMonth.year(),
      currentMonth.month()
    );
  }

  displayAddEvent(test, day) {
    this.setState({ showAddEventComponent: true, day });
  }

  displayEvents(id) {
    this.setState({ showEventsComponent: true });
  }

  closeAddEvent() {
    this.setState({ showAddEventComponent: false, day: undefined });
  }

  closeShowEvents() {
    this.setState({ showEventsComponent: false });
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-content blue lighten-4">
            <Row className="no-margin-bottom">
              <div className="col s2">
                <div>
                  <i
                    onClick={this.previousMonth.bind(this)}
                    className="pointer bold-hover material-icons"
                  >
                    keyboard_arrow_left
                  </i>
                </div>
              </div>
              <div align="center" className="col s8">
                {this.props.monthDetails.first &&
                  `${this.props.monthDetails.year}, ${
                    this.props.monthDetails.monthName
                  }`}
              </div>
              <div className="col s2 right-align">
                <div>
                  <i
                    onClick={this.nextMonth.bind(this)}
                    className="pointer bold-hover material-icons"
                  >
                    keyboard_arrow_right
                  </i>
                </div>
              </div>
            </Row>
          </div>
          {/* body */}
          <div className="card-action">
            <table className="center">
              <tbody>
                <tr className="calendar-header">
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
                                <div
                                  onClick={event => {
                                    this.displayAddEvent(
                                      event,
                                      week * 7 +
                                        day +
                                        2 -
                                        this.props.monthDetails.first.weekday
                                    );
                                    this.displayEvents(
                                      event,
                                      week * 7 +
                                        day +
                                        2 -
                                        this.props.monthDetails.first.weekday
                                    );
                                  }}
                                  className={`calendar-day ${
                                    moment().year() ===
                                      this.props.monthDetails.year &&
                                    moment().month() ===
                                      this.props.monthDetails.month &&
                                    parseInt(moment().format("DD"), 10) ===
                                      week * 7 +
                                        day +
                                        2 -
                                        this.props.monthDetails.first.weekday
                                      ? "red lighten-5"
                                      : ""
                                  } ${
                                    _.some(this.props.events, [
                                      "date",
                                      createDate(
                                        this.props.monthDetails.year,
                                        this.props.monthDetails.month + 1,
                                        week * 7 +
                                          day +
                                          2 -
                                          this.props.monthDetails.first.weekday
                                      )
                                    ])
                                      ? "teal lighten-5"
                                      : ""
                                  }
                                  `}
                                >
                                  {week * 7 +
                                    day +
                                    2 -
                                    this.props.monthDetails.first.weekday}
                                </div>
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
        {this.state.showEventsComponent &&
          _.some(this.props.events, [
            "date",
            createDate(
              this.props.monthDetails.year,
              this.props.monthDetails.month + 1,
              this.state.day
            )
          ]) && (
            <Events
              year={this.props.monthDetails.year}
              month={this.props.monthDetails.month + 1}
              day={this.state.day}
              closeComponent={this.closeShowEvents.bind(this)}
            />
          )}
        {this.state.showAddEventComponent && (
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
