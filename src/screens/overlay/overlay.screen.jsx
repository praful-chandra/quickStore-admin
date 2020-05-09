import React from "react";

function Overlay  (props){
return (
    <div className="overlay-wrapper">
        <div className="overlay-body">
        <div className="overlay-close" onClick={props.closeOverlay}>X</div>
        {props.component}
        </div>

    </div>
)
}


export default Overlay;