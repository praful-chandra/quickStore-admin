import React, { Component } from "react";
import { connect } from "react-redux";

import ImagePreview from "../../components/imagePreview/imagepreview.component";
import TextBox from "../../components/textBox/textBox.component";
import DropDownBox from "../../components/dropDownBox/dropdownBox.component";
import TextArea from "../../components/textArea/textArea.component";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";

import { editProductAsync } from "../../redux/actions/products.actions";
class ProductOverlay extends Component {
  state = {
    item: null,
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
        [e.target.name]: e.target.value,
      },
    });
  };

  imageSelector = async (e) => {
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

  render() {
    return (
      <div className="overlay-form">
        <ImagePreview
          image={this.state.imageToPreview ? this.state.imageToPreview : ""}
          cb={this.imageSelector}
        />
        <div className="overlay-horizontalBlock">
          <TextBox
            name="name"
            title="ProductName"
            size="40"
            placeholder="Product name"
            type="text"
            value={this.state.item ? this.state.item.name : ""}
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
            value={this.state.item ? this.state.item.categoryId : ""}
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
              value={this.state.item ? this.state.item.quantity : 0}
              name="quantity"
              cb={this.productTextEditor}
            />
            <TextBox
              title="Price (Rs.)"
              size="20"
              placeholder="0"
              type="number"
              name="price"
              value={this.state.item ? this.state.item.price : 0}
              cb={this.productTextEditor}
            />
          </div>
          <TextArea
            title="Description"
            width="47"
            height="19"
            placeholder="product description"
            name="description"
            value={this.state.item ? this.state.item.description : ""}
            cb={this.productTextEditor}
          />

          <div>
            <TextBox
              title="Discount %"
              size="11"
              placeholder="0"
              type="number"
              name="discount"
              value={this.state.item ? this.state.item.discount : ""}
              cb={this.productTextEditor}
            />
            <ToggleSwitch
              showText="show"
              hideText="hide"
              cb={this.ToggleSwitch}
              value={this.state.item ? this.state.item.status : false}
            />
            <HollowButton title="Save" size="9" cb={this.updateProduct} />
          </div>
        </div>
      </div>
    );
  }
}

const mapSateToProps = (state) => ({
  category: state.category.category,
});

export default connect(mapSateToProps, { editProductAsync })(ProductOverlay);
