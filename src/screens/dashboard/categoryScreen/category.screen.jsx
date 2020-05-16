import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilRuler, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import CategoryHeader from "../../../components/categoryHeader/categoryHeader.component";
import DropDownBox from "../../../components/dropDownBox/dropdownBox.component";
import TextBox from "../../../components/textBox/textBox.component";
import ActionButton from "../../../components/actionButton/actionButton.component";

import _imageEncode from "../../../components/utils/encodeImage";

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
          {
            this.props.category.map(category=>(
              <CategorySubBodyItem
              key={category._id}
              item={[
                {
                  item: (
                    <img
                      src={`${_imageEncode(category.image.data)}`}
                      alt="productItm"
                    />
                  ),
                  size: 10,
                },
                {
                  item: category.name,
                  size: 50,
                },
                {
                  item: category.Products.length,
                  size: 20,
                },
                {
                  item: <FontAwesomeIcon className="pointer" icon={faPencilRuler} onClick={()=>this.props.overlaySelector("View Category")}/>,
                  size: 10,
                },
                {
                  item: <FontAwesomeIcon className="pointer" icon={faTrashAlt} />,
                  size: 10,
                },
              ]}
            />
            ))
          }
          </CategorySubBody>
        </CategoryBody>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  category : state.category.category
})

export default connect(mapStateToProps)(CategoryScreen);
