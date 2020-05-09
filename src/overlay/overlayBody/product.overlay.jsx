import React, { Component } from "react";

import ImagePreview from "../../components/imagePreview/imagepreview.component";
import TextBox from "../../components/textBox/textBox.component";
import DropDownBox from "../../components/dropDownBox/dropdownBox.component";
import TextArea from "../../components/textArea/textArea.component"
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";
class ProductOverlay extends Component {
  state = {};

  ToggleSwitch = (status)=>{
    console.log(status);
    
  }

  render() {
    return (
      <div className="overlay-form">
        <ImagePreview />
        <div className="overlay-horizontalBlock">
          <TextBox
            title="ProductName"
            size="40"
            placeholder="Product name"
            type="text"
          />
          <DropDownBox
            label="Category"
            options={["select One", "hats", "shoes", "women", "men", "jackets"]}
          />
        </div>
        <div className="overlay-horizontalBlock">
          <div>
            <TextBox title="Quantity" size="11" placeholder="0" type="number" />
            <TextBox
              title="Price (Rs.)"
              size="11"
              placeholder="0"
              type="number"
            />
          </div>
          <TextArea
            title="Description"
            width="47"
            height="19"
            placeholder="product description"
          />

          <div>
            <TextBox
              title="Discount %"
              size="11"
              placeholder="0"
              type="number"
            />
            <ToggleSwitch 
              showText="show"
              hideText="hide"
              cb={this.ToggleSwitch}
            />
            <HollowButton 
              title="Save"
              size="9"
              cb={()=>{}}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductOverlay;
