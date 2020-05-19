import React, { Component } from "react";

import ImagePreview from "../../components/imagePreview/imagepreview.component";
import TextBox from "../../components/textBox/textBox.component";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";

import ItemsList from "../../components/itemsList/itemList.component";

import ProductSelectorOverlay from "../productSelector/productSelector.overly";
class Campaign extends Component {
  state = {
    campaign :{
      image: "",
      name : "",
      status : false,
      itemsSold : 0,
      amountRaised : 0,
      items : [],
      views : 0
    },
    imageToPreview : null,
    productSelectorOverlay : false
  };

  ToggleSwitch = (status) => {
    console.log(status);
  };

  componentDidMount(){
    if(this.props.campaign){
      this.setState({
        campaign : this.props.campaign,
        imageToPreview : this.props.campaign.image
      })
    }
  }

  toggleProductSelector = () =>{
    this.setState({
      productSelectorOverlay : !this.state.productSelectorOverlay
    })
  }


  render() {
    return (
      <div className="overlay-form">
      {this.state.productSelectorOverlay ? <ProductSelectorOverlay close={this.toggleProductSelector} /> : null}
        <div className="overlay-form-left">
          <ImagePreview image={this.state.imageToPreview}/>
          <TextBox placeholder="Campaign Name" title="Campaign Name" />
          <ToggleSwitch showText="active" hideText="deactive" cb={() => {}} />
          {!this.props.neww ? null : (
            <span>
              <div className="overlay-horizontalBlock">
                <TextBox
                  title="Total Views"
                  size="11"
                  placeholder="0"
                  type="Number"
                  value={this.state.campaign.views}
                  disabled
                />
                <TextBox
                  title="items Sold"
                  size="11"
                  placeholder="0"
                  type="Number"
                  value={this.state.campaign.itemsSold}
                  disabled
                />
              </div>

              <TextBox
                title="Total Amount Raised"
                size="24"
                placeholder="0"
                type="Number"
                value={this.state.campaign.amountRaised}
                disabled
              />
            </span>
          )}
          <div className="overlay-verticalBlock">
            <HollowButton title="Save" size="9" />
          </div>
        </div>
        <div className="overlay-form-right">
          <ItemsList title="Items under campaign" items={this.state.campaign.items} cb={this.toggleProductSelector} additems={true} />
        </div>
      </div>
    );
  }
}

export default Campaign;
