import React, { useState, useEffect } from "react";

function TextBox(props) {
  const [text, textHandeler] = useState("");
  const [isChanged, isCHangedHandeler] = useState(false);

  const handelSubmit = (e) => {
    e.preventDefault();
    props.cb({ name: props.name || "", value: text });
    isCHangedHandeler(false);
  };

  useEffect(() => textHandeler(props.value || ""), [props.value]);

  return (
    <div className="textBox-wrapper">
      {props.title ? <div className="textBox-label">{props.title}</div> : null}
      <div className="textBox-input">
        <form onBlur={handelSubmit} onSubmit={handelSubmit}>
          <input
            type={props.type}
            style={{
              width: `${props.size ? props.size : "30rem"}rem`,
              backgroundColor: isChanged ? "#c9f3c9" : "",
              ...props.style,
            }}
            placeholder={props.placeholder}
            value={text}
            onChange={(e) => {
              textHandeler(e.target.value);
              isCHangedHandeler(true);
            }}
            autoComplete="off"
            disabled={props.disabled ? true : false}
            name={props.name || ""}
          />
        </form>
      </div>
    </div>
  );
}

export default TextBox;
