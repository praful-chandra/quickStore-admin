import React, { Component } from "react";

class DropDownBox extends Component {
  state = {};
  render() {
    const { label, options } = this.props;
    return (
      <div className="dropDownBox-wrapper" >
        <div className="dropDownBox-label">{label}</div>
        <select name="category" className="dropDownBox-select" style={{width : `${this.props.size ? this.props.size+"rem" : ""}`}}>
          {options.map((opt, key) => (
            <option value={opt} key={key}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default DropDownBox;
