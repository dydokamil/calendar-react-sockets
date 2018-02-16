import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Collapsible,
  CollapsibleItem,
  Icon
} from "react-materialize";
import _ from "lodash";

import { createDate, createDatetime, getTimeFromDatetime } from "./calendar";
import { deleteEvent } from "../actions";

class Events extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.dispatchDeleteEvent = this.dispatchDeleteEvent.bind(this);
  }

  dispatchDeleteEvent(event_id) {
    this.props.deleteEvent("admin", "zaq12wrx", event_id);
  }

  render() {
    const eventsThisDay = _.mapKeys(
      _.filter(
        this.props.events,
        event =>
          event.date ===
          createDatetime(this.props.year, this.props.month, this.props.day)
      ),
      "_id"
    );
    console.log(eventsThisDay);

    return (
      eventsThisDay && (
        <Collapsible>
          <div className="collapsible-header blue lighten-4 default-cursor">
            <Icon>perm_contact_calendar</Icon>
            {createDate(this.props.year, this.props.month, this.props.day)}
          </div>
          {_.map(eventsThisDay, event => {
            return (
              <CollapsibleItem header={event.label} key={event.id}>
                {!event.start && !event.end ? (
                  <Row>
                    <Col s={12} className="valign-wrapper">
                      {" "}
                      <Icon>timer</Icon>
                      <span>All day</span>
                    </Col>
                  </Row>
                ) : (
                  <div>
                    <Row>
                      <Col s={12} className="valign-wrapper">
                        <Icon>timer</Icon>
                        <span>
                          {getTimeFromDatetime(event.start)
                            .split(":")
                            .slice(0, 2)
                            .join(":")}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col s={12} className="valign-wrapper">
                        <Icon>timer</Icon>
                        <span>
                          {getTimeFromDatetime(event.end)
                            .split(":")
                            .slice(0, 2)
                            .join(":")}
                        </span>
                      </Col>
                    </Row>
                  </div>
                )}
                <button
                  className="btn red waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={() => this.dispatchDeleteEvent(event._id)}
                >
                  Delete
                  <i className="material-icons right">close</i>
                </button>
              </CollapsibleItem>
            );
          })}
        </Collapsible>
      )
    );
  }
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default connect(mapStateToProps, { deleteEvent })(Events);
