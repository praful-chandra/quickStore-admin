import React from "react";

function TextArea  (props){

    return (
        <div className="TextArea-wrapper">
          {props.title ? (
            <div className="TextArea-label">{props.title}</div>
          ) : null}
          <div className="TextArea-input">
            <textarea
              style={{
                width: `${props.width ? props.width : "30"}rem`,
                height: `${props.height ? props.height : "10"}rem`,
              }}
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.cb}
              autoComplete="off"
            >
            </textarea>
          </div>
        </div>
      );
}

export default TextArea;
