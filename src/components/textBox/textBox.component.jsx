import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons";

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
                ...props.style
              }}
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.cb}
              autoComplete="off"
              disabled={props.disabled ? true : false}
            />
          {props.search ? <button className="textBox-submit" onClick={props.search}><FontAwesomeIcon icon={faSearch} /></button> : null}  
          </div>
        </div>
      );
}

export default TextBox;
