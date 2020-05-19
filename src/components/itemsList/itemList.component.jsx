import React, { Component } from "react";

import ItemsListItem from "./itemsList-item.component";

class ItemsList extends Component {

  renderItems = () => {
    const result = [];

    this.props.items.map((item) => result.push(<ItemsListItem item={item}/>));

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
            +
          </div>
        ) : null}
      </div>
    );
  }
}

export default ItemsList;
