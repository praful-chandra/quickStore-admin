import React, { Component } from "react";

import TextBox from "../../components/textBox/textBox.component";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";

import ItemsList from "../../components/itemsList/itemList.component";
class Coupons extends Component {
  state = {};

  ToggleSwitch = (status) => {
    console.log(status);
  };

  render() {
    return (
      <div className="overlay-form">
        <div className="overlay-form-left">
          <TextBox placeholder="Coupons Name" size="45" title="Coupons Name" />
            <div className="overlay-horizontalBlock">
            <div></div> 

          <TextBox
              title="Code"
              size="31"
              placeholder="CODE50"
              type="Text"
              disabled
            />

          <ToggleSwitch showText="active" hideText="deactive" cb={() => {}} />
          <div></div>
            </div>

           <div className="overlay-horizontalBlock">
           <div></div> 
            <TextBox
              title="No. of coupons"
              size="11"
              placeholder="0"
              type="Number"
              disabled
            />
           
          <TextBox
              title="discount %"
              size="11"
              placeholder="0"
              type="Number"
              disabled
            /> 
            <div></div>
          </div>
          <div className="overlay-verticalBlock">

            <HollowButton title="Save" size="9" cb={()=>{}}/>
          </div>
        </div>
        <div className="overlay-form-right">
            <ItemsList title="Items under Coupons" additems={true} />
        </div>
      </div>
    );
  }
}

export default Coupons;
