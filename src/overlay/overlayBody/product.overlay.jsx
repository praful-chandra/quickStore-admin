import React, { Component } from "react";
import { connect } from "react-redux";

import ImagePreview from "../../components/imagePreview/imagepreview.component";
import TextBox from "../../components/textBox/textBox.component";
import DropDownBox from "../../components/dropDownBox/dropdownBox.component";
import TextArea from "../../components/textArea/textArea.component";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";

import { editProductAsync , createProductAsync } from "../../redux/actions/products.actions";
class ProductOverlay extends Component {
  state = {
    item: {
      name : "",
      quantity : 0,
      price : 0,
      categoryId : this.props.category[0]._id,
      status : false
  },
    imageToPreview: null,
  };

  componentDidMount() {
    if (this.props.item)
      this.setState({
        item: this.props.item,
        imageToPreview: this.props.item.image,
      });

  
      }
  

  ToggleSwitch = (status) => {
    //switches the status of product
    this.setState({
      item: {
        ...this.state.item,
        status,
      },
    });
  };

  categorySelector = (categoryId) => {
    this.setState({
      item: {
        ...this.state.item,
        categoryId: categoryId,
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

  updateProduct = () => {
        //Two copies created , 
    //first is form data to send to server
    //second is raw js object to update the redux state
    const formData = new FormData();

    for (const key in this.state.item) {
      formData.append(key, this.state.item[key]);
    }

    if (this.state.item.image.type === "Buffer") {
      formData.delete("image");
    }

    const rawData = {
      ...this.state.item,
      image : this.state.imageToPreview
    }

    this.props.editProductAsync(formData,rawData);
  };

  createProduct = ()=>{
           //Two copies created , 
    //first is form data to send to server
    //second is raw js object to update the redux state

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
    
    this.props.createProductAsync(formData,rawData);
    
  }

  render() {
    return (
      <div className="overlay-form">
        <ImagePreview
          image={this.state.imageToPreview ? this.state.imageToPreview : "" }
          cb={this.imageSelector}
          size="32"
        />
        <div className="overlay-horizontalBlock">
          <TextBox
            name="name"
            title="ProductName"
            size="40"
            placeholder="Product name"
            type="text"
            value={this.state.item.name }
            cb={this.productTextEditor}
          />
          <DropDownBox
            label="Category"
            options={[
              ...this.props.category.map((cate) => ({
                name: cate.name,
                value: cate._id,
              })),
            ]}
            value={this.state.item.categoryId}
            cb={this.categorySelector}
          />
        </div>
        <div className="overlay-horizontalBlock">
          <div>
            <TextBox
              title="Quantity"
              size="20"
              placeholder="0"
              type="number"
              value={this.state.item.quantity}
              name="quantity"
              cb={this.productTextEditor}
            />
            <TextBox
              title="Price (Rs.)"
              size="20"
              placeholder="0"
              type="number"
              name="price"
              value={this.state.item.price}
              cb={this.productTextEditor}
            />
          </div>
          <TextArea
            title="Description"
            width="47"
            height="19"
            placeholder="product description"
            name="description"
            value={this.state.item.description}
            cb={this.productTextEditor}
          />

          <div>
            <TextBox
              title="Discount %"
              size="11"
              placeholder="0"
              type="number"
              name="discount"
              value={this.state.item.discount}
              cb={this.productTextEditor}
            />
            <ToggleSwitch
              showText="show"
              hideText="hide"
              cb={this.ToggleSwitch}
              value={this.state.item.status}
            />
            <HollowButton title="Save" size="9" cb={this.props.new ? this.createProduct :this.updateProduct} />
          </div>
        </div>
      </div>
    );
  }
}

const mapSateToProps = (state) => ({
  category: state.category.category,
});

export default connect(mapSateToProps, { editProductAsync,createProductAsync })(ProductOverlay);
