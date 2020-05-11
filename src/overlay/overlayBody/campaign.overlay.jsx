import React, { Component } from "react";

import ImagePreview from "../../components/imagePreview/imagepreview.component";
import TextBox from "../../components/textBox/textBox.component";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";

import ItemsList from "../../components/itemsList/itemList.component";
class Campaign extends Component {
  state = {};

  ToggleSwitch = (status) => {
    console.log(status);
  };

  render() {
    return (
      <div className="overlay-form">
        <div className="overlay-form-left">
          <ImagePreview />
          <TextBox placeholder="Campaign Name" title="Campaign Name" />
          <ToggleSwitch showText="active" hideText="deactive" cb={() => {}} />
          {/* <div className="overlay-horizontalBlock">
            <TextBox
              title="Total Views"
              size="11"
              placeholder="0"
              type="Number"
              disabled
            />
            <TextBox
              title="Total Amount Raised"
              size="24"
              placeholder="0"
              type="Number"
              disabled
            />
          </div>
          <TextBox
              title="items Sold"
              size="11"
              placeholder="0"
              type="Number"
              disabled
            /> */}

          <div className="overlay-verticalBlock">

            <HollowButton title="Save" size="9" />
          </div>
        </div>
        <div className="overlay-form-right">
            <ItemsList title="Items under campaign" additems={true} />
        </div>
      </div>
    );
  }
}

export default Campaign;
