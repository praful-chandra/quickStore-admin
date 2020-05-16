import React, { Component } from "react";
import { connect } from "react-redux";

import { getProductsAsync } from "../../../redux/actions/products.actions";
import {getCategoryAsync} from "../../../redux/actions/category.action";
import LoadingScreen from "../../loading/loading.screen";

import CategoryHeader from "../../../components/categoryHeader/categoryHeader.component";
import DropDownBox from "../../../components/dropDownBox/dropdownBox.component";
import TextBox from "../../../components/textBox/textBox.component";

import CategoryBody from "../../../components/categoryBody/categoryBody.component";
import ItemCard from "../../../components/itemCard/itemCard.component";

import ProductOverlay from "../../../overlay/overlayBody/product.overlay";

class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      category: "View All",
    };
  }

  componentDidMount() {
    if (this.props.products.products.length <= 0) this.props.getProductsAsync();
    // if(!this.props.category.categoryFetched) this.props.getCategoryAsync();
  }

  categoryFilter = (filter) => {
    this.setState(
      {
        category: filter,
      },
     ()=> this.productFilters()
    );
  };

  searchFilter = () => {
    this.productFilters();
  };

  productFilters = () => {
    const categoryId = this.state.category;
    const search = this.state.search;

    const only = search ? { name: { $regex: search, $options: "i" } } : {};

    if (categoryId !== "View All") {
      only["categoryId"] = categoryId;
    }

    this.props.getProductsAsync({ only });
  };

  render() {
    return (
      <div className="window-wrapper">
        <span>
          <CategoryHeader title="Products">
            <DropDownBox
              label="Category"
              options={[
                { name: "View All", value: false },
                ...this.props.category.map((cate) => cate),
              ]}
              cb={this.categoryFilter}
              value={this.state.category}
            />
            <DropDownBox
              label="Sort By"
              options={[
                "select One",
                "name",
                "creation Date",
                "Number of items",
              ]}
            />

            <TextBox
              title="Search"
              type="search"
              size="51"
              placeholder="Try hats"
              value={this.state.search}
              cb={(e) => this.setState({ search: e.target.value })}
              search={this.searchFilter}
            />
          </CategoryHeader>

          <CategoryBody>
            {this.props.products.productsLoading ? (
              <LoadingScreen />
            ) : (
              <div className="products-grid">
                {this.props.products.products.map((item, index) => (
                  <ItemCard
                    viewItem={() =>
                      this.props.overlaySelector(<ProductOverlay item={item} />)
                    }
                    key={`Item${index}`}
                    item={item}
                  />
                ))}
              </div>
            )}
          </CategoryBody>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  admin: state.user.user.admin,
  category: state.category.category,
});

export default connect(mapStateToProps, { getProductsAsync,getCategoryAsync })(ProductsScreen);
