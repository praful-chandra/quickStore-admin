import React from 'react'

function ActionButton({size,title,cb}) {

    return <div style={{width:`${size}rem`}} className="actionButton" onClick = {()=>cb()}>
                {title}
    </div>
}

export default ActionButton;