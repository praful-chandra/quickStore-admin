import React, { Component } from "react";

import CategoryHeader from "../../../components/categoryHeader/categoryHeader.component";
import DropDownBox from "../../../components/dropDownBox/dropdownBox.component";
import TextBox from "../../../components/textBox/textBox.component";

import CategoryBody from "../../../components/categoryBody/categoryBody.component";
import ItemCard from "../../../components/itemCard/itemCard.component";


class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  items = [
    {
      image : require("../../../Assets/images/green-beanie.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },
    {
      image : require("../../../Assets/images/grey-brim.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },{
      image : require("../../../Assets/images/palm-tree-cap.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },{
      image : require("../../../Assets/images/red-beanie.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },
    {
      image : require("../../../Assets/images/green-beanie.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },
    {
      image : require("../../../Assets/images/grey-brim.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },{
      image : require("../../../Assets/images/palm-tree-cap.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },{
      image : require("../../../Assets/images/red-beanie.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },
    {
      image : require("../../../Assets/images/green-beanie.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },
    {
      image : require("../../../Assets/images/grey-brim.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },{
      image : require("../../../Assets/images/palm-tree-cap.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },{
      image : require("../../../Assets/images/red-beanie.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },
    {
      image : require("../../../Assets/images/green-beanie.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },
    {
      image : require("../../../Assets/images/grey-brim.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },{
      image : require("../../../Assets/images/palm-tree-cap.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },{
      image : require("../../../Assets/images/red-beanie.png"),
      title : "Brown Ban Hat",
      quantity : 10,
      price : 500
    },
  ]
  render() {
    return (
      <div className="window-wrapper">

        <CategoryHeader title="Products">
          <DropDownBox
            label="Category"
            options={["select One", "hats", "shoes", "women", "men", "jackets"]}
          />
          <DropDownBox
            label="Sort By"
            options={["select One", "name", "creation Date", "Number of items"]}
          />

          <TextBox
            title="Search"
            type="search"
            size="51"
            placeholder="Try hats"
            value={this.state.search}
            cb={(e) => this.setState({ search: e.target.value })}
          />
        </CategoryHeader>

        <CategoryBody>
          <div className="products-grid">
            
            {
              this.items.map((item,index)=><ItemCard  key={`Item${index}`} item={item} />)
            }

          </div>
        </CategoryBody>
      </div>
    );
  }
}

export default ProductsScreen;
