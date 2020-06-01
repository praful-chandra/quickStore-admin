import React, { Component } from "react";
import { connect } from "react-redux";

import ImagePreview from "../../components/imagePreview/imagepreview.component";
import TextBox from "../../components/textBox/textBox.component";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch.component";
import HollowButton from "../../components/hollowButton/hollowButton.component";

import ItemsList from "../../components/itemsList/itemList.component";

import ProductSelectorOverlay from "../productSelector/productSelector.overly";

import {createSaleAsync,editSaleAsync} from "../../redux/actions/sale.action";
import {hideOverlay} from "../../redux/actions/overlay.action";

class Sales extends Component {
  state = {
    imageToPreview: "",
    productSelectorOverlay: false,
    sale: {
      name: "",
      image: "",
      discount: 0,
      status: false,
      items: [],
      views : 0,
      itemsSold : 0
    },
  };

  ToggleSwitch = () => {
    this.setState({
      sale: {
        ...this.state.sale,
        status: !this.state.sale.status,
      },
    });
  };

  handleTextEdit = (e) => {
    this.setState({
      sale: {
        ...this.state.sale,
        [e.name]: e.value,
      },
    });
  };

  toggleProductSelector = () => {
    this.setState({
      productSelectorOverlay: !this.state.productSelectorOverlay,
    });
  };

  selectItemsHandler = (items) => {
    
    this.setState({
      sale: {
        ...this.state.sale,
        items,
      },
    });
  };

  deleteItemsHandler = (id) => {
    this.setState({
      sale: {
        ...this.state.sale,
        items: this.state.sale.items.filter((item) => item._id !== id),
      },
    });
  };

  imageSelector = async (e) => {
    //converts the image selected to binary form and added to imageToPreview state
    //attached the raw image to item for sending to server
    let image = e.target.files[0];
    this.setState({
      imageToPreview: URL.createObjectURL(image),
      sale: {
        ...this.state.sale,
        image,
      },
    });
  };

  generateFormAndRawDataFromState = () => {
    //Two copies created ,
    //first is form data to send to server
    //second is raw js object to update the redux state

    for (const key in this.state.sale) {
      if (this.state.sale[key] === "" || 0) {
        throw new Error("all fields reduired");
      }
    }

    const formData = new FormData();

    for (const key in this.state.sale) {
      formData.append(key, this.state.sale[key]);
    }

    if (typeof this.state.sale.image === "string") {
      formData.delete("image");
    }

    formData.delete("items");
    const items = this.state.sale.items;
    for (var i = 0; i < items.length; i++) {
      for (let key in items[i]) {
        formData.append("items[" + i + "][" + key + "]", items[i][key]);
      }
    }

    const rawData = {
      ...this.state.sale,
      image: this.state.imageToPreview,
    };

    return { formData, rawData };
  };

  saveSaleHandler = () => {    
    try {
      const { formData, rawData } = this.generateFormAndRawDataFromState();      
      this.props.neww
        ? this.props.createSaleAsync(formData, rawData)
        : this.props.editSaleAsync(formData, rawData);
      this.props.hideOverlay();
    } catch (err) {
      alert(err.message);
    }
  };

  componentDidMount(){
    if(this.props.sale){
      this.setState({
        sale : this.props.sale,
        imageToPreview : this.props.sale.image
      })
    }
  }

  render() {
    
    return (
      <div className="overlay-form">
            {this.state.productSelectorOverlay ? (
          <ProductSelectorOverlay
            close={this.toggleProductSelector}
            items={this.state.sale.items}
            itemsCallBack={this.selectItemsHandler}
          />
        ) : null}
        <div className="overlay-form-left">
          <ImagePreview image={this.state.imageToPreview} cb={this.imageSelector} />
          <TextBox
            placeholder="Sales Name"
            title="Sales Name"
            name="name"
            value={this.state.sale.name}
            cb={this.handleTextEdit}
          />
          <ToggleSwitch
            showText="active"
            hideText="deactive"
            value={this.state.sale.status}
            cb={this.ToggleSwitch}
          />

            <TextBox
                  title="Discount"
                  name="discount"
                  cb={this.handleTextEdit}
                  value={this.state.sale.discount}
                  size="24"
                  placeholder="0"
                  type="Number"
                />  
          {!this.props.neww ? (
            <>
              <div className="overlay-horizontalBlock">
                <TextBox
                  title="Total Views"
                  size="11"
                  placeholder="0"
                  type="Number"
                  disabled
                />
                <TextBox
                title="items Sold"
                size="11"
                placeholder="0"
                type="Number"
                disabled
              />
                
              </div>
              
            </>
          ) : null}

          <div className="overlay-verticalBlock">
            <HollowButton title="Save" size="9" cb={this.saveSaleHandler}/>
          </div>
        </div>
        <div className="overlay-form-right">
          <ItemsList
            title="Items under Sales"
            items={this.state.sale.items}
            cb={this.toggleProductSelector}
            deleteItem={this.deleteItemsHandler}
            additems={true}
          />
        </div>
      </div>
    );
  }
}

export default connect(null,{hideOverlay,createSaleAsync,editSaleAsync})(Sales);
