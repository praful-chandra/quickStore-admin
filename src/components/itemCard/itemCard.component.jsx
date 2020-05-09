import React from "react";

function ItemCard(props) {
        const {image,title,quantity,price} = props.item;
    return <div className="itemCard-wrapper" onClick={props.viewItem}>
        <div className="itemCard-image" style={{backgroundImage : `url(${image})`}}>
        </div>
        <div className="itemCard-info">
                <div className="itemCard-info-title">{title}</div>
                <div className="itemCard-info-quantity">Qty: {quantity}</div>
                <div className="itemCard-info-price">Rs. {price}</div>

        </div>
    </div>
    
}

export default ItemCard;