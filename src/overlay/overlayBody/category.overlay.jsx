import React, { Component } from "react";

import ImagePreview from "../../components/imagePreview/imagepreview.component";
import TextBox from "../../components/textBox/textBox.component";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";
class CategoryOverlay extends Component {
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
            title="CategoryName"
            size="80"
            placeholder="Category name"
            type="text"
          />

        </div>
     <div className="overlay-verticalBlock">
     <ToggleSwitch 
              showText="show"
              hideText="hide"
              cb={this.ToggleSwitch}
              size="10"
            />
            <HollowButton 
              title="Save"
              size="9"
              cb={()=>{}}
            />
     </div>
      </div>
    );
  }
}

export default CategoryOverlay;
