import React, { Component } from "react";
import { connect } from "react-redux";
import { addEvent } from "../actions";

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
      <div className="card">
        <div className="card-content">
          <div className="row no-margin-bottom">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    disabled
                    id="date"
                    value={`${this.props.year}-${this.props.month}-${
                      this.props.day
                    }`}
                    type="text"
                    className="validate datepicker"
                  />
                </div>
                <div className="switch">
                  <label>
                    <input type="checkbox" onChange={this.toggleEntireDay} />
                    <span className="lever" />
                    Entire day
                  </label>
                </div>
                {this.state.entireDay && (
                  <div>
                    <div className="input-field col s12">
                      <input
                        id="time1"
                        type="text"
                        className="validate timepicker"
                      />
                      <label htmlFor="time">Start Time</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="time2"
                        type="text"
                        className="validate timepicker"
                      />
                      <label htmlFor="time">End Time</label>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { addEvent })(AddEvent);
