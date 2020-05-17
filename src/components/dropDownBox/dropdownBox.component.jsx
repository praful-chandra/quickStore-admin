import React, { Component } from "react";

class DropDownBox extends Component {
  state = {};
  render() {
    const { label, options ,cb ,value} = this.props;
    return (
      <div className="dropDownBox-wrapper" >
        <div className="dropDownBox-label">{label}</div>
        <select name="category" className="dropDownBox-select" style={{width : `${this.props.size ? this.props.size+"rem" : ""}`}} onChange={(e)=>cb(e.target.value)} value={value}>
          {options.map((opt, key) => (
            <option value={opt.value} key={key}>{opt.name}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default DropDownBox;
