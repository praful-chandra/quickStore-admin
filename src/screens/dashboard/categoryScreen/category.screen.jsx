import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilRuler, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import CategoryHeader from "../../../components/categoryHeader/categoryHeader.component";
import DropDownBox from "../../../components/dropDownBox/dropdownBox.component";
import TextBox from "../../../components/textBox/textBox.component";
import ActionButton from "../../../components/actionButton/actionButton.component";

import CategoryBody from "../../../components/categoryBody/categoryBody.component";
import CategorySubHeading from "../../../components/categorySubHeading/categorySubHeading.component";
import CategorySubBody from "../../../components/categorySubBody/categorySubBody.componene";
import CategorySubBodyItem from "../../../components/categorySubBody/categorySubBody.item.component";

import CategoryOverlay from "../../../overlay/overlayBody/category.overlay";

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  render() {
    return (
      <div className="window-wrapper">
        <CategoryHeader title="Category">
          <DropDownBox
            label="SortBy"
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
          <ActionButton title="Add Category" size="28" cb={() =>this.props.overlaySelector(<CategoryOverlay />)} />
        </CategoryHeader>

        <CategoryBody>
          <CategorySubHeading
            items={[
              { title: "image", size: 10 },
              { title: "name", size: 50 },
              { title: "itemCount", size: 20 },
              { title: "edit", size: 10 },
              { title: "Remove", size: 10 },
            ]}
          />
          <CategorySubBody>
            <CategorySubBodyItem
            viewItem={()=>this.props.overlaySelector("View Category")}
              item={[
                {
                  item: (
                    <img
                      src={`${require("../../../Assets/images/red-beanie.png")}`}
                      alt="productItm"
                    />
                  ),
                  size: 10,
                },
                {
                  item: "Brown Bin Hat",
                  size: 50,
                },
                {
                  item: 150,
                  size: 20,
                },
                {
                  item: <FontAwesomeIcon icon={faPencilRuler} />,
                  size: 10,
                },
                {
                  item: <FontAwesomeIcon icon={faTrashAlt} />,
                  size: 10,
                },
              ]}
            />
          </CategorySubBody>
        </CategoryBody>
      </div>
    );
  }
}

export default CategoryScreen;
