import React, { Component } from "react";
import { connect } from "react-redux";
import ImagePreview from "../../components/imagePreview/imagepreview.component";
import TextBox from "../../components/textBox/textBox.component";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";

import ItemsList from "../../components/itemsList/itemList.component";

import ProductSelectorOverlay from "../productSelector/productSelector.overly";

import {
  createCampaignAsync,
  editCampaignAsync,
} from "../../redux/actions/campaign.action";
import { hideOverlay } from "../../redux/actions/overlay.action";
class Campaign extends Component {
  state = {
    campaign: {
      image: "",
      name: "",
      status: false,
      itemsSold: 0,
      amountRaised: 0,
      items: [],
      views: 0,
    },
    imageToPreview: null,
    productSelectorOverlay: false,
  };

  ToggleSwitch = (status) => {
    this.setState({
      campaign: {
        ...this.state.campaign,
        status,
      },
    });
  };

  componentDidMount() {
    if (this.props.campaign) {
      this.setState({
        campaign: this.props.campaign,
        imageToPreview: this.props.campaign.image,
      });
    }
  }

  toggleProductSelector = () => {
    this.setState({
      productSelectorOverlay: !this.state.productSelectorOverlay,
    });
  };

  selectItemsHandler = (items) => {
    
    this.setState({
      campaign: {
        ...this.state.campaign,
        items,
      },
    });
  };

  deleteItemsHandler = (id) => {
    this.setState({
      campaign: {
        ...this.state.campaign,
        items: this.state.campaign.items.filter((item) => item._id !== id),
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

  generateFormAndRawDataFromState = () => {
    //Two copies created ,
    //first is form data to send to server
    //second is raw js object to update the redux state

    for (const key in this.state.campaign) {
      if (this.state.campaign[key] === "" || 0) {
        throw new Error("all fields reduired");
      }
    }

    const formData = new FormData();

    for (const key in this.state.campaign) {
      formData.append(key, this.state.campaign[key]);
    }

    if (this.state.campaign.image && typeof this.state.campaign.image === "string") {
      formData.delete("image");
    }

    formData.delete("items");
    const items = this.state.campaign.items;
    for (var i = 0; i < items.length; i++) {
      for (let key in items[i]) {
        formData.append("items[" + i + "][" + key + "]", items[i][key]);
      }
    }

    const rawData = {
      ...this.state.campaign,
      image: this.state.imageToPreview,
    };

    return { formData, rawData };
  };

  saveCampaignHandler = () => {
    try {
      const { formData, rawData } = this.generateFormAndRawDataFromState();      
      this.props.neww
        ? this.props.createCampaignAsync(formData, rawData)
        : this.props.editCampaignAsync(formData, rawData);
      this.props.hideOverlay();
    } catch (err) {
      alert(err.message);
    }
  };

  render() {
    
    return (
      <div className="overlay-form">
        {this.state.productSelectorOverlay ? (
          <ProductSelectorOverlay
            close={this.toggleProductSelector}
            items={this.state.campaign.items}
            itemsCallBack={this.selectItemsHandler}
          />
        ) : null}
        <div className="overlay-form-left">
          <ImagePreview
            image={this.state.imageToPreview}
            cb={this.imageSelector}
          />
          <TextBox
            placeholder="Campaign Name"
            title="Campaign Name"
            value={this.state.campaign.name}
            cb={this.handleText}
            name="name"
          />
          <ToggleSwitch
            showText="active"
            hideText="deactive"
            cb={this.ToggleSwitch}
            value={this.state.campaign.status}
          />
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
            <HollowButton title="Save" size="9" cb={this.saveCampaignHandler} />
          </div>
        </div>
        <div className="overlay-form-right">
          <ItemsList
            title="Items under campaign"
            items={this.state.campaign.items}
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
  createCampaignAsync,
  editCampaignAsync,
  hideOverlay,
})(Campaign);
