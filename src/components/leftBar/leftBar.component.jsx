import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faBox,
  faBriefcase,
  faPaperPlane,
  faCreditCard,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";

import {connect} from "react-redux";
import {switchTab} from "../../redux/actions/leftBar.action";

class LeftBar extends Component {

  items = [
    {
      icon: faShoppingBasket,
      title: "Products",
    },
    {
      icon: faBox,
      title: "Category",
    },
    {
      icon: faBriefcase,
      title: "Orders",
    },
    {
      icon: faPaperPlane,
      title: "Campaign",
    },
    {
      icon: faCreditCard,
      title: "Sales",
    },
    {
      icon: faMoneyCheckAlt,
      title: "Coupons",
    },
  ];

  handleSelect = (index) => {
    this.props.switchTab(index);
  };


  render() {
    return (
      <div className="leftBar-wrapper">
        <div className="leftBar-itemsList">
          {/*  ----------------------------------------------------------------------------------------------------- */}

          {this.items.map((item, index) => (
            <div
            key={index}
              className={`leftBar-item ${
                index === this.props.tab ? "leftBar-active" : ""
              }`}
              onClick={() =>{
                this.handleSelect(index)
              }}
            >
              <span className="leftBar-item-icon">
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span className="leftBar-item-title">{item.title}</span>
            </div>
          ))}

          {/*  ----------------------------------------------------------------------------------------------------- */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  tab : state.leftBar.tab
})


export default connect(mapStateToProps,{switchTab})(LeftBar);
