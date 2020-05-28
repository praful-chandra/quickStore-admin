import React, { Component } from "react";
import { connect } from "react-redux";

import ImagePreview from "../../components/imagePreview/imagepreview.component";
import TextBox from "../../components/textBox/textBox.component";
// import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";

import {
  addCategoryAsync,
  updateCategoryAsync,
} from "../../redux/actions/category.action";
import { hideOverlay } from "../../redux/actions/overlay.action";
class CategoryOverlay extends Component {
  state = {
    imageToPreview: "",
    item: {
      image: "",
      name: "",
      // status : false
    },
  };

  // ToggleSwitch = (status) => {
  //   this.setState({
  //     item:{
  //       ...this.state.item,
  //       status
  //     }
  //   })
  // };

  componentDidMount() {
    if (this.props.item)
      this.setState({
        item: this.props.item,
        imageToPreview: this.props.item.image,
      });
  }

  imageSelector = async (e) => {
    //converts the image selected to binary form and added to imageToPreview state
    //attached the raw image to item for sending to server
    let image = e.target.files[0];

    this.setState({
      imageToPreview: URL.createObjectURL(image),
      item: {
        ...this.state.item,
        image,
      },
    });
  };

  productTextEditor = (e) => {
    this.setState({
      item: {
        ...this.state.item,
        [e.name]: e.value,
      },
    });
  };

  generateFormAndRawDataFromState = () => {
    //Two copies created ,
    //first is form data to send to server
    //second is raw js object to update the redux state

    for (const key in this.state.item) {
      if (this.state.item[key] === "" || 0) {
        return alert("all fields reduired");
      }
    }

    const formData = new FormData();

    for (const key in this.state.item) {
      formData.append(key, this.state.item[key]);
    }

    if (this.state.campaign && typeof this.state.campaign.image === "string") {
      formData.delete("image");
    }


    const rawData = {
      ...this.state.item,
      image: this.state.imageToPreview,
    };

    return { formData, rawData };
  };

  createCategory = () => {
    const { formData, rawData } = this.generateFormAndRawDataFromState();
    this.props.addCategoryAsync(formData, rawData);
    this.props.hideOverlay();
  };

  updateCategory = () => {
    const { formData, rawData } = this.generateFormAndRawDataFromState();

    this.props.updateCategoryAsync(formData, rawData);
    this.props.hideOverlay();
  };

  render() {
    return (
      <div className="overlay-form">
        <ImagePreview
          image={this.state.imageToPreview}
          cb={this.imageSelector}
        />
        <div className="overlay-horizontalBlock">
          <TextBox
            title="CategoryName"
            size="95"
            placeholder="Category name"
            type="text"
            value={this.state.item.name}
            cb={this.productTextEditor}
            name="name"
          />
        </div>
        <div className="overlay-verticalBlock">
          {/* <ToggleSwitch
            showText="show"
            hideText="hide"
            cb={this.ToggleSwitch}
            size="10"
            value={this.state.item.status}
          /> */}
          <HollowButton
            title="Save"
            size="9"
            cb={() =>
              this.props.new ? this.createCategory() : this.updateCategory()
            }
          />
        </div>
      </div>
    );
  }
}

export default connect(null, {
  addCategoryAsync,
  updateCategoryAsync,
  hideOverlay,
})(CategoryOverlay);
