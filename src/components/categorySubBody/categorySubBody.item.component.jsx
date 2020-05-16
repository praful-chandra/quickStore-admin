import React from "react";



function CategorySubBodyItem(props) {
    const items=props.item
    return <div className="categorySubBody-item-wrapper" >
         {items.map((item, index) => (
        <div
          key={`SubHeaderItem${index}`}
          style={{ width: `${item.size}%` }}
        >
          {item.item}
        </div>
      ))}
    </div>
}

export default CategorySubBodyItem;