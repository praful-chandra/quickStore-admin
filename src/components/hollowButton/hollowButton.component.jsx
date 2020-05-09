import React from 'react'

function HollowButton({size,title,cb}) {

    return <div style={{width:`${size}rem`}} className="hollowButton" onClick = {()=>cb()}>
                {title}
    </div>
}

export default HollowButton;