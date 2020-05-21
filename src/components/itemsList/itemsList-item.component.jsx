import React from 'react';

function ItemsListItem(props) {
    return <div className="itemsList-item" onClick={props.delete}>
    <img src={props.item.image} alt=""/>
        {props.item.name}
    </div>
}

export default ItemsListItem; 