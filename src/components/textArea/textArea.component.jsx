import React,{useState,useEffect} from "react";

function TextArea  (props){

  const [text,textHandeller] = useState("");
  const [isChanged,isChangedHandeller] = useState(false);


  useEffect(()=>textHandeller(props.value),[props.value])

 const handleSubmit = e =>{
    e.preventDefault();
    props.cb({name : props.name || "", value : text})
    isChangedHandeller(false);
  }

    return (
        <div className="TextArea-wrapper">
          {props.title ? (
            <div className="TextArea-label">{props.title}</div>
          ) : null}
          <div className="TextArea-input">
           <form action="#" onBlur={handleSubmit}>
           <textarea
              style={{
                width: `${props.width ? props.width : "30"}rem`,
                height: `${props.height ? props.height : "10"}rem`,
                backgroundColor : isChanged ? "#c9f3c9" : "",

              }}
              placeholder={props.placeholder}
              value={text}
              onChange={e=>{textHandeller(e.target.value);isChangedHandeller(true)}}
              autoComplete="off"
              disabled={props.disabled ? true : false}
              name={props.name || ""}
            >
            </textarea>
           </form>
          </div>
        </div>
      );
}

export default TextArea;
