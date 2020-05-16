import React from "react";

import _imageEncode from "../utils/encodeImage";

function ItemCard(props) {
  const { image, name, quantity, price } = props.item;



  return (
    <div className="itemCard-wrapper" onClick={props.viewItem}>
      <div className="itemCard-image" style={{ backgroundImage: `url(${_imageEncode(image.data)})` }}>
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
