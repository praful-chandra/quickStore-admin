//dependency import
import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";

//loading screen
import LoadingScreen from "../../loading/loading.screen";

//components
import CategoryHeader from "../../../components/categoryHeader/categoryHeader.component";
import DropDownBox from "../../../components/dropDownBox/dropdownBox.component";
import TextBox from "../../../components/textBox/textBox.component";
import CategoryBody from "../../../components/categoryBody/categoryBody.component";
import ItemCard from "../../../components/itemCard/itemCard.component";
import ActionButton from "../../../components/actionButton/actionButton.component";
import HollowButton from "../../../components/hollowButton/hollowButton.component";

//overlay
import ProductOverlay from "../../../overlay/overlayBody/product.overlay";

//actions
import { getProductsAsync, } from "../../../redux/actions/products.actions";
import { getCategoryAsync } from "../../../redux/actions/category.action";

class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      category: "View All",
      sort: "createdAt",
      sortDirection: true,
      loaded: 0,
    };
  }

  componentDidMount() {
    //fetch all products only if already not fetched
    if (!this.props.products.init) this.productFilters();
  }

  categoryFilter = (filter) => {
    this.setState(
      {
        category: filter,
        loaded: 0,
      },
      () => this.productFilters(true)
    );
  };

  sortFilter = (filter) => {
    this.setState(
      {
        sort: filter,
      },
      () => this.productFilters(true)
    );
  };

  searchFilter = (search) => {

    this.setState({
      search : search.value
    },()=>    this.productFilters(true))
  };

  productFilters = (neww) => {
    const categoryId = this.state.category;
    const search = this.state.search;

    const only = search ? { name: { $regex: search, $options: "i" } } : {};

    if (categoryId !== "View All") {
      only["categoryId"] = categoryId;
    }

    const sort = { [this.state.sort]: this.state.sortDirection ? 1 : -1 };

    const limit = 15;
    const skip = this.state.loaded * 15;

    this.props.getProductsAsync(
      { only, sort, skip, limit },
      neww ? true : false
    );
  };

  render() {
    return (
      <div className="window-wrapper">
        <span>
          <CategoryHeader title="Products">
            <DropDownBox
              label="Category"
              options={[
                { name: "View All", value: "View All" },
                ...this.props.category.map((cate) => ({
                  name: cate.name,
                  value: cate._id,
                })),
              ]}
              cb={this.categoryFilter}
              value={this.state.category}
            />
            <DropDownBox
              label="Sort By"
              options={[
                { name: "date", value: "createdAt" },
                { name: "name", value: "name" },
                { name: "price", value: "price" },
              ]}
              cb={this.sortFilter}
              value={this.state.sort}
            />
            <ActionButton
              title={
                <FontAwesomeIcon
                  icon={
                    this.state.sortDirection
                      ? faArrowCircleUp
                      : faArrowCircleDown
                  }
                />
              }
              size="3"
              cb={() =>
                this.setState(
                  { sortDirection: !this.state.sortDirection },
                  () => this.productFilters(true)
                )
              }
            />
            <TextBox
              title="Search"
              type="search"
              size="51"
              placeholder="Try hats"
              value={this.state.search}
              cb={this.searchFilter}
            />
          </CategoryHeader>

          <CategoryBody>
            {this.props.products.productsLoading || this.props.category.categoryLoading? (
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
            <div className="products-loadmore">
              {this.props.products.products.length <
              this.props.products.totalCount ? (
                <HollowButton
                  title="load more "
                  size="30"
                  cb={() => {
                    this.setState(
                      {
                        loaded: this.state.loaded + 1,
                      },
                      () => this.productFilters()
                    );
                  }}
                />
              ) : null}
            </div>
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

export default connect(mapStateToProps, { getProductsAsync, getCategoryAsync })(
  ProductsScreen
);
 