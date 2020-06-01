import React, { Component } from "react";

import CategoryHeader from "../../../components/categoryHeader/categoryHeader.component";
import DropDownBox from "../../../components/dropDownBox/dropdownBox.component";
import TextBox from "../../../components/textBox/textBox.component";

import CategoryBody from "../../../components/categoryBody/categoryBody.component";
import CategorySubHeading from "../../../components/categorySubHeading/categorySubHeading.component";
import CategorySubBody from "../../../components/categorySubBody/categorySubBody.componene";
import CategorySubBodyItem from "../../../components/categorySubBody/categorySubBody.item.component";

import OrdersOverlay from "../../../overlay/overlayBody/orders.overlay";

class OrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }
  render() {
    return <div className="window-wrapper">
            {/* <CategoryHeader title="Orders">
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
        </CategoryHeader> */}

        <CategoryBody>
          <CategorySubHeading
            items={[
              { title: "Customer", size: 10 },
              { title: "Time", size: 10},
              { title: "Address", size: 40 },
              { title: "Amount", size: 10 },
              { title: "Payment\nStatus", size: 10 },
              { title: "contact", size: 10 },
              { title: "status", size: 10 },
            ]}
          />
          <CategorySubBody>
          <CategorySubBodyItem
            viewItem={()=>{this.props.overlaySelector(<OrdersOverlay />)}}
              item={[
                {
                  item: "Customer 1",
                  size: 10,
                },
                {
                  item: "7 May 2019",
                  size: 10,
                },
                {
                  item: "29 Eve Street, 543 Evenue Road, Ny 87876",
                  size: 40,
                },
                {
                  item: "Rs.3000",
                  size: 10,
                },
                {
                  item: "Paid",
                  size: 10,
                },
                {
                  item: "9014875356",
                  size: 10,
                },
                {
                  item: "Delevering",
                  size: 10,
                },
              ]}
            />
          </CategorySubBody>
        </CategoryBody>
    </div>;
  }
}

export default OrdersScreen;
