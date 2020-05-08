import React from "react";


function CategoryHeader(props) {
    
    return <div className="categoryHeader-wrapper">
    <div className="categoryHeader-title">{props.title}</div>
    <div className="categoryHeader-right">
        {props.children}
    </div>
  </div>
}

export default CategoryHeader;