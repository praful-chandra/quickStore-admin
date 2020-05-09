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

class SalesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }
  render() {
    return (
      <div className="window-wrapper">
        <CategoryHeader title="Sales">
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
          <ActionButton title="Add Sale" size="28" cb={() => this.props.overlaySelector("Add Sales")} />
        </CategoryHeader>

        <CategoryBody>
          <CategorySubHeading
            items={[
              { title: "image", size: 10 },
              { title: "Sales Name", size: 40 },
              { title: "views", size: 20 },
              { title: "Items\nSold", size: 10 },
              { title: "edit", size: 10 },
              { title: "Remove", size: 10 },
            ]}
          />
          <CategorySubBody>
            <CategorySubBodyItem
            viewItem={()=>this.props.overlaySelector("View Item Sales")}
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
                  item: "The Winter Sale",
                  size: 40,
                },
                {
                  item: 1540,
                  size: 20,
                },
                {
                  item: 150,
                  size: 10,
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

export default SalesScreen;
