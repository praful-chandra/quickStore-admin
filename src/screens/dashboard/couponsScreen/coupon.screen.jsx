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

import CouponOverlay from "../../../overlay/overlayBody/coupons.overlay";

class CouponScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }
  render() {
    return (
      <div className="window-wrapper">
        <CategoryHeader title="Coupons">
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
          <ActionButton title="Add Coupon" size="28" cb={() => this.props.overlaySelector(<CouponOverlay />)} />
        </CategoryHeader>

        <CategoryBody>
          <CategorySubHeading
            items={[
              { title: "Name", size: 10 },
              { title: "Gen at", size: 10},
              { title: "CODE", size: 30 },
              { title: "UpTo", size: 10 },
              { title: "Remaining", size: 10 },
              { title: "Discount\n%", size: 10 },
              { title: "Edit", size: 10 },
              { title: "Remove", size: 10 },
            ]}
          />
          <CategorySubBody>
          <CategorySubBodyItem
          viewItem={()=>this.props.overlaySelector("view Coupon")}
              item={[
                {
                  item: "CouponKing",
                  size: 10,
                },
                {
                  item: "7 May 2019",
                  size: 10,
                },
                {
                  item: "FLAT50",
                  size: 30,
                },
                {
                  item: "NA",
                  size: 10,
                },
                {
                  item: "10/50",
                  size: 10,
                },
                {
                  item: "50",
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

export default CouponScreen;
