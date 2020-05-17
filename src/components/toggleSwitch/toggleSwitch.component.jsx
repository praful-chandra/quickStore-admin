import React, { Component } from "react";

class ToggleSwitch extends Component {

  render() {
    return (
      <div
        className="toggleSwitch-wrapper"
        style={{ backgroundColor: `${!this.props.value ? "#eeeeee" : ""}` ,width:`${this.props.width ? this.props.width+"rem" : "" }`}}
      >
        <div
          className="toggleSwitch-nibble"
          style={{ float: `${this.props.value ? "left" : "right"}` }}
          onClick={() => {this.setState({ status: !this.props.value }); this.props.cb(!this.props.value)}}
        ></div>
        <div
          className="toggleSwitch-text"
          style={{ color: `${this.props.value ? "#fff" : ""}` }}
        >
          {this.props.value ? this.props.showText.slice(0, 4) : this.props.hideText.slice(0, 4)}
        </div>
      </div>
    );
  }
}

export default ToggleSwitch;
