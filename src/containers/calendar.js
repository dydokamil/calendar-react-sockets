import React, { Component } from "react";

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export default class Calendar extends Component {
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="no-margin-bottom row">
              <div className="col s1">
                <span className="fas fa-angle-double-left" />
              </div>
              <div align="center" className="col s10">
                Month
              </div>
              <div className="col s1" align="right">
                <span className="fas fa-angle-double-right" />
              </div>
            </div>
          </div>
          {/* body */}
          <div className="card-action">
            <table>
              <tbody>
                <tr>
                  <td>Test</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
