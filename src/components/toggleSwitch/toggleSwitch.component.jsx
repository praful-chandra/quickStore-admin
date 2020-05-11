import React, { Component } from "react";

class ToggleSwitch extends Component {
  state = {
    status: false,
  };
  render() {
    return (
      <div
        className="toggleSwitch-wrapper"
        style={{ backgroundColor: `${!this.state.status ? "#eeeeee" : ""}` ,width:`${this.props.width ? this.props.width+"rem" : "" }`}}
      >
        <div
          className="toggleSwitch-nibble"
          style={{ float: `${this.state.status ? "left" : "right"}` }}
          onClick={() => {this.setState({ status: !this.state.status }); this.props.cb(!this.state.status)}}
        ></div>
        <div
          className="toggleSwitch-text"
          style={{ color: `${this.state.status ? "#fff" : ""}` }}
        >
          {this.state.status ? this.props.showText.slice(0, 4) : this.props.hideText.slice(0, 4)}
        </div>
      </div>
    );
  }
}

export default ToggleSwitch;
