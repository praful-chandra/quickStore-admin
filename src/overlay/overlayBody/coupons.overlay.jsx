import React, { Component } from "react";
import { connect } from "react-redux";
import momment from "moment";

import TextBox from "../../components/textBox/textBox.component";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";

import ItemsList from "../../components/itemsList/itemList.component";

import ProductSelectorOverlay from "../productSelector/productSelector.overly";

import {
  createCouponAsync,
  editCouponAsync,
} from "../../redux/actions/coupon.action";
import { hideOverlay } from "../../redux/actions/overlay.action";
class Coupons extends Component {
  state = {
    coupon: {
      name: "",
      code: "",
      status: false,
      remainingCoupons: 0,
      items: [],
      upTo: 0,
      discount: 0,
      expiry: new Date(),
    },
    productSelectorOverlay: false,
  };

  ToggleSwitch = () => {
    this.setState({
      coupon: {
        ...this.state.coupon,
        status: !this.state.coupon.status,
      },
    });
  };
  handleText = (item) => {
    this.setState({
      campaign: {
        ...this.state.campaign,
        [item.name]: item.value,
      },
    });
  };

  toggleProductSelector = () => {
    this.setState({
      productSelectorOverlay: !this.state.productSelectorOverlay,
    });
  };

  selectItemsHandler = (items) => {
    this.setState({
      coupon: {
        ...this.state.coupon,
        items,
      },
    });
  };

  deleteItemsHandler = (id) => {
    this.setState({
      coupon: {
        ...this.state.coupon,
        items: this.state.coupon.items.filter((item) => item._id !== id),
      },
    });
  };

  handleText = (item) => {
    console.log(item);
    
    this.setState({
      coupon: {
        ...this.state.coupon,
        [item.name]: item.value,
      },
    });
  };

  handleExp = date =>{

    this.setState({
      coupon :{
        ...this.state.coupon,
        expiry : new Date(date.value)
      }
    })
  }



  saveCouponHandler = () => {
    this.props.neww ? this.props.createCouponAsync(this.state.coupon) : this.props.editCouponAsync(this.state.coupon);
    this.props.hideOverlay();
  };

  componentDidMount(){
    if(this.props.coupon){
      this.setState({
        coupon : this.props.coupon
      })
    }
  }
  render() {
    
    return (
      <div className="overlay-form">
        {this.state.productSelectorOverlay ? (
          <ProductSelectorOverlay
            close={this.toggleProductSelector}
            items={this.state.coupon.items}
            itemsCallBack={this.selectItemsHandler}
          />
        ) : null}
        <div className="overlay-form-left">
          <TextBox
            placeholder="Coupons Name"
            size="45"
            title="Coupons Name"
            value={this.state.coupon.name}
            name="name"
            cb={this.handleText}
          />
          <div className="overlay-horizontalBlock">
            <div></div>

            <TextBox
              title="Code"
              size="31"
              placeholder="C.O.D.E ..."
              type="Text"
              value={this.state.coupon.code}
              name="code"
              cb={this.handleText}
            />

            <ToggleSwitch
              showText="active"
              hideText="deactive"
              cb={this.ToggleSwitch}
              value={this.state.coupon.status}
            />
            <div></div>
          </div>

          <div className="overlay-horizontalBlock">
            <div className="overlay-verticalBlock">
              <TextBox
                title="No. of coupons"
                size="11"
                placeholder="0"
                type="Number"
                value={this.state.coupon.remainingCoupons}
                name="remainingCoupons"
                cb={this.handleText}
              />

              <TextBox
                title="discount %"
                size="11"
                placeholder="0"
                type="Number"
                value={this.state.coupon.discount}
                name="discount"
                cb={this.handleText}
              />
            </div>
            <div className="overlay-verticalBlock">
              <TextBox
                title="Exp in (Days)"
                size="30"
                placeholder="0"
                type="date"
                value={momment(this.state.coupon.expiry).format('YYYY-MM-DD')}
                name="expiry"
                cb={this.handleExp}
              />
     
              <TextBox
                title="UpTO(Rs.)"
                size="11"
                placeholder="0"
                type="Number"
                value={this.state.coupon.upTo}
                name="upTo"
                cb={this.handleText}
              />
            </div>
          </div>

          <div className="overlay-verticalBlock">
            <HollowButton title="Save" size="9" cb={this.saveCouponHandler} />
          </div>
        </div>
        <div className="overlay-form-right">
          <ItemsList
            title="Items under Coupons"
            items={this.state.coupon.items}
            cb={this.toggleProductSelector}
            deleteItem={this.deleteItemsHandler}
            additems={true}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, {
  createCouponAsync,
  editCouponAsync,
  hideOverlay,
})(Coupons);
