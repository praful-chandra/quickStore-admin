import React from "react";

function CategorySubHeading(props) {
  const items = props.items;

  return (
    <div className="categorySubHeading-wrapper">
      {items.map((item, index) => (
        <div
          key={`SubHeaderItem${index}`}
          className="categorySubHeading-item"
          style={{ width: `${item.size}%` }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default CategorySubHeading;
