import React from "react";

function TextBox  (props){
    return (
        <div className="textBox-wrapper">
          {props.title ? (
            <div className="textBox-label">{props.title}</div>
          ) : null}
          <div className="textBox-input">
            <input
              type={props.type}
              style={{
                width: `${props.size ? props.size : "30rem"}rem`,
              }}
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.cb}
              autoComplete="off"
            />
          </div>
        </div>
      );
}

export default TextBox;
