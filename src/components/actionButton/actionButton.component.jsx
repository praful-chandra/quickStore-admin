import React from 'react'

function ActionButton({size,title,cb,disabled}) {

    return <div style={{width:`${size}rem`, backgroundColor : `${disabled ? "#eee" : ""}`}} className="actionButton" onClick = {()=>!disabled ? cb() : {}}>
                {title}
    </div>
}

export default ActionButton;