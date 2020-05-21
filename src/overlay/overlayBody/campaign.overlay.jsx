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
    this.setState({
      campaign:{
        ...this.state.campaign,
        status
      }
    })
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

  selectItemsHandler = items =>{
      
    this.setState({
      campaign:{
        ...this.state.campaign,
        items
      }
    })
  }

  deleteItemsHandler = id =>{
    this.setState({
      campaign : {
        ...this.state.campaign,
        items : this.state.campaign.items.filter(item => item._id !== id)
      }
    })
  }

  handleText = item =>{
    this.setState({
      campaign:{
        ...this.state.campaign,
        [item.name] : item.value
      }
    })
  }

  imageSelector = async (e) => {
    //converts the image selected to binary form and added to imageToPreview state
    //attached the raw image to item for sending to server
    let image = e.target.files[0];
    this.setState({
      imageToPreview: URL.createObjectURL(image),
      campaign: {
        ...this.state.campaign,
        image,
      },
    });
  };

  saveCampaignHandler = ()=>{
    console.log(this.state.campaign);
    
  }

  render() {
    
    return (
      <div className="overlay-form">
      {this.state.productSelectorOverlay ? <ProductSelectorOverlay close={this.toggleProductSelector} items={this.state.campaign.items} itemsCallBack={this.selectItemsHandler}/> : null}
        <div className="overlay-form-left">
          <ImagePreview image={this.state.imageToPreview} cb={this.imageSelector}/>
          <TextBox placeholder="Campaign Name" title="Campaign Name" value={this.state.campaign.name} cb={this.handleText} name="name"/>
          <ToggleSwitch showText="active" hideText="deactive" cb={this.ToggleSwitch} value={this.state.campaign.status} />
          {this.props.neww ? null : (
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
            <HollowButton title="Save" size="9" cb={this.saveCampaignHandler}/>
          </div>
        </div>
        <div className="overlay-form-right">
          <ItemsList title="Items under campaign" items={this.state.campaign.items} cb={this.toggleProductSelector} deleteItem={this.deleteItemsHandler} additems={true} />
        </div>
      </div>
    );
  }
}

export default Campaign;
