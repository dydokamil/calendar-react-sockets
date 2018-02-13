import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Row, Col } from "react-materialize";
import _ from "lodash";

import { createDate } from "./calendar";

class Events extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const eventsThisDay = _.mapKeys(
      _.filter(
        this.props.events,
        event =>
          event.date ===
          createDate(this.props.year, this.props.month, this.props.day)
      ),
      "id"
    );

    return (
      <Card>
        <Row>
          <Col s={12} className="right-align">
            <i
              onClick={this.props.closeComponent}
              className="material-icons pointer bold-hover"
            >
              close
            </i>
          </Col>
        </Row>
        {_.map(eventsThisDay, event => {
          return (
            <Row key={event.id}>
              <Col s={12}>{event.label}</Col>
            </Row>
          );
        })}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default connect(mapStateToProps)(Events);
