import React from "react";

function Overlay  (props){
return (
    <div className="overlay-wrapper">
        <div className="overlay-body">
        <div className="overlay-close" onClick={props.closeOverlay}>X</div>
        <div className="overlay-content">{props.component}</div>
        </div>

    </div>
)
}


export default Overlay;