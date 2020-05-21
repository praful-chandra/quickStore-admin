import React, { Component } from "react";
import { connect } from "react-redux";
import TextBox from "../../components/textBox/textBox.component";

import { getProductsWithoutRedux } from "../../redux/actions/products.actions";

class ProductSelectorOverlay extends Component {
  state = {
    items: [],
    search: "",
    selectedItems: [],
  };

  getter = async () => {
    const only = this.state.search
      ? { name: { $regex: this.state.search, $options: "i" } }
      : {};
    const items = await this.props.getProductsWithoutRedux({
      filters: { name: 1 },
      only,
    });

    this.setState({
      items,
      selectedItems: this.props.items || [],
    });
  };

  componentDidMount() {
    this.getter();
  }

  toggleSelectItem = (item) => {
    const selectedItem = this.state.selectedItems.filter(
      (sItem) => sItem._id === item._id
    );

    if (selectedItem.length > 0) {
      this.setState({
        selectedItems: this.state.selectedItems.filter(
          (sItem) => sItem._id !== item._id
        ),
      },()=>itemsCallback());
    } else
      this.setState({
        selectedItems: this.state.selectedItems.concat([item]),
      },()=>itemsCallback());

      const itemsCallback = () =>this.props.itemsCallBack(this.state.selectedItems);
  };

  searchHandler = (search) => {
    this.setState(
      {
        search: search.value,
      },
      () => this.getter()
    );
  };

  render() {
    return (
      <div className="ProductSelectorOverlay-wrapper">
        <div className="ProductSelectorOverlay-body">
          <div
            className="ProductSelectorOverlay-close"
            onClick={this.props.close}
          >
            X
          </div>
          <div className="ProductSelectorOverlay-content">
            <TextBox
              type="search"
              title="search"
              cb={this.searchHandler}
              value={this.state.search}
              
            />

            <div className="ProductSelectorOverlay-content-itemsList">
              {this.state.items.map((item) => (
                <div
                  key={item._id}
                  className={`ProductSelectorOverlay-content-itemsList-item ${
                    this.state.selectedItems.some((sItem) => item._id === sItem._id)
                      ? "ProductSelectorOverlay-content-itemsList-item-selected"
                      : ""
                  }`}
                  onClick={() => this.toggleSelectItem(item)}
                > <img src={item.image} alt=""/>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getProductsWithoutRedux })(
  ProductSelectorOverlay
);
