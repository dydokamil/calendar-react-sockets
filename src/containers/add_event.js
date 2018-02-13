import React, { Component } from "react";
import { connect } from "react-redux";
import { addEvent } from "../actions";
import $ from "jquery";
import { Input, Row, Col, Card } from "react-materialize";

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.toggleEntireDay = this.toggleEntireDay.bind(this);

    this.state = { entireDay: true };
  }

  toggleEntireDay() {
    this.setState({
      entireDay: !this.state.entireDay
    });
  }

  render() {
    return (
      <Col s={12}>
        <Card>
          <Row className="right-align">
            <Col s={12}>
              <div>
                <i
                  onClick={this.props.closeComponent}
                  className="material-icons pointer bold-hover"
                >
                  close
                </i>
              </div>
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
                  className="validate datepicker"
                />
              </Col>
            </Row>
            <Row>
              <Col s={12}>
                <Input
                  s={12}
                  label="Label"
                  type="textarea"
                  id="textarea1"
                  className="materialize-textarea"
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
            {this.state.entireDay && (
              <div>
                <Row>
                  <Col s={12}>
                    <Input
                      id="time"
                      name="on"
                      s={12}
                      type="time"
                      label="Start"
                      onChange={function(e, value) {
                        console.log(e);
                        console.log(value);
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
                    />
                  </Col>
                </Row>
              </div>
            )}
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
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
