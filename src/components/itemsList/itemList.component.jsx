import React, { Component } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

import ItemsListItem from "./itemsList-item.component";

class ItemsList extends Component {

  renderItems = () => {
    const result = [];

    this.props.items.map((item) => result.push(<ItemsListItem key={item._id} delete={()=>this.props.deleteItem(item._id)} item={item}/>));

    return result;
  };

  render() {
    return (
      <div className="itemsList-wrapper">
        <div className="itemsList-title">{this.props.title} </div>
        <div className="itemsList-body">{this.renderItems()}</div>

        {this.props.additems ? (
          <div
            className="itemsList-addBtn"
            onClick={this.props.cb}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ItemsList;
