import React, { Component } from "react";
import { connect } from "react-redux";
import { addEvent } from "../actions";
import { Input, Row, Col, Card } from "react-materialize";

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.toggleEntireDay = this.toggleEntireDay.bind(this);

    this.state = { entireDay: false, label: "" };
  }

  toggleEntireDay() {
    this.setState({
      entireDay: !this.state.entireDay
    });
  }

  changeLabel(event) {
    this.setState({ label: event.target.value });
  }

  setStartTime(time) {
    this.setState({ start: time });
  }

  setEndTime(time) {
    this.setState({ end: time });
  }

  render() {
    return (
      <Col s={12}>
        <Card>
          <Row className="right-align">
            <Col s={12}>
              <i
                onClick={this.props.closeComponent}
                className="material-icons pointer bold-hover"
              >
                close
              </i>
            </Col>
          </Row>
          <form>
            <Row>
              <Col s={12}>
                <Input
                  label="Date"
                  s={12}
                  disabled
                  id="date"
                  value={`${this.props.year}-${
                    this.props.month < 10
                      ? `0${this.props.month}`
                      : this.props.month
                  }-${
                    this.props.day < 10 ? `0${this.props.day}` : this.props.day
                  }`}
                  type="date"
                  className="validate"
                />
              </Col>
            </Row>
            <Row>
              <Col s={12}>
                <Input
                  s={12}
                  label="Label"
                  twelvehour="false"
                  type="textarea"
                  id="textarea1"
                  className="materialize-textarea"
                  onChange={this.changeLabel.bind(this)}
                />
              </Col>
            </Row>
            <Row>
              <Col s={12}>
                <div className="switch">
                  <label>
                    <input type="checkbox" onChange={this.toggleEntireDay} />
                    <span className="lever" />
                    Entire day
                  </label>
                </div>
              </Col>
            </Row>
            {!this.state.entireDay && (
              <div>
                <Row>
                  <Col s={12}>
                    <Input
                      id="time"
                      name="on"
                      s={12}
                      type="time"
                      label="Start"
                      onChange={(e, value) => {
                        this.setStartTime(value);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col s={12} className="input-field">
                    <Input
                      id="time2"
                      type="time"
                      s={12}
                      label="End"
                      className="validate timepicker"
                      onChange={(e, value) => {
                        this.setEndTime(value);
                      }}
                    />
                  </Col>
                </Row>
              </div>
            )}
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              disabled={
                !this.state.label.length ||
                (!this.state.entireDay && !this.state.start) ||
                (!this.state.entireDay && !this.state.end)
              }
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </Card>
      </Col>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { addEvent })(AddEvent);
