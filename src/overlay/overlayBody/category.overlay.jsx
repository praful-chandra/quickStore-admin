import React, { Component } from "react";
import {connect} from "react-redux";


import ImagePreview from "../../components/imagePreview/imagepreview.component";
import TextBox from "../../components/textBox/textBox.component";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";

import {addCategoryAsync} from "../../redux/actions/category.action";
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
    const that = this;
    const reader = new FileReader();

    reader.onload = function (event) {
      var data = event.target.result;

      that.setState({
        imageToPreview: { data },
        item: {
          ...that.state.item,
          image,
        },
      });
    };
    reader.readAsArrayBuffer(image);
  };

  productTextEditor = (e) => {
    this.setState({
      item: {
        ...this.state.item,
        [e.name]: e.value,
      },
    });
  };

  createCategory = ()=>{
               //Two copies created , 
    //first is form data to send to server
    //second is raw js object to update the redux state
    console.log(this.state.item);
    
    for (const key in this.state.item) {
      if(this.state.item[key] === "" || 0){
        return alert("all fields reduired")
      }
    }

    const formData = new FormData();

    for (const key in this.state.item) {
      formData.append(key, this.state.item[key]);
    }

    const rawData = {
      ...this.state.item,
      image : this.state.imageToPreview
    }
    
    this.props.addCategoryAsync(formData,rawData);
    
  }

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
          <HollowButton title="Save" size="9" cb={() => this.props.new ? this.createCategory() : null} />
        </div>
      </div>
    );
  }
}



export default connect(null,{addCategoryAsync})(CategoryOverlay);
