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

class LeftBar extends Component {
  state = {
    active: 3,
  };

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
    this.setState({
      active: index,
    });
  };

  componentDidMount(){
    this.props.cb(this.state.active);
  }

  render() {
    return (
      <div className="leftBar-wrapper">
        <div className="leftBar-itemsList">
          {/*  ----------------------------------------------------------------------------------------------------- */}

          {this.items.map((item, index) => (
            <div
            key={index}
              className={`leftBar-item ${
                index === this.state.active ? "leftBar-active" : ""
              }`}
              onClick={() =>{
                this.handleSelect(index)
                this.props.cb(index)
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

export default LeftBar;
