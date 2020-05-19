import React from "react";


function ItemCard(props) {
  const { image, name, quantity, price } = props.item;



  return (
    <div className="itemCard-wrapper" onClick={props.viewItem}>
      <div className="itemCard-image" style={{ backgroundImage: `url(${image})` }}>
      </div>
      <div className="itemCard-info">
        <div className="itemCard-info-title">{name}</div>
        <div className="itemCard-info-quantity">Qty: {quantity}</div>
        <div className="itemCard-info-price">Rs. {price}</div>
      </div>
    </div>
  );
}

export default ItemCard;
