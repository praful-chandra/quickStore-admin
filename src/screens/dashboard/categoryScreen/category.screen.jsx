import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilRuler,
  faTrashAlt,
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import CategoryHeader from "../../../components/categoryHeader/categoryHeader.component";
import DropDownBox from "../../../components/dropDownBox/dropdownBox.component";
import TextBox from "../../../components/textBox/textBox.component";
import ActionButton from "../../../components/actionButton/actionButton.component";

import CategoryBody from "../../../components/categoryBody/categoryBody.component";
import CategorySubHeading from "../../../components/categorySubHeading/categorySubHeading.component";
import CategorySubBody from "../../../components/categorySubBody/categorySubBody.componene";
import CategorySubBodyItem from "../../../components/categorySubBody/categorySubBody.item.component";

import LoadingScreen from "../../loading/loading.screen";

import CategoryOverlay from "../../../overlay/overlayBody/category.overlay";
import ConfirmationOverlayBody from "../../../overlay/confirmationOverlay/conformationBody";

import { showDialog } from "../../../redux/actions/conformation.action";
import { getCategoryAsync ,deleteCategoryAsync } from "../../../redux/actions/category.action";

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      sort: "createdAt",
      sortDirection: true,
    };
  }

  sortFilter = (filter) => {
    this.setState(
      {
        sort: filter,
      },
      () => this.categoryFilters()
    );
  };

  searchFilter = (search) => {
    this.setState(
      {
        search: search.value,
      },
      () => this.categoryFilters()
    );
  };

  categoryFilters = () => {
    const categoryId = this.state.category;
    const search = this.state.search;

    const only = search ? { name: { $regex: search, $options: "i" } } : {};

    if (categoryId !== "View All") {
      only["categoryId"] = categoryId;
    }

    const sort = { [this.state.sort]: this.state.sortDirection ? 1 : -1 };

    const limit = 15;
    const skip = this.state.loaded * 15;

    this.props.getCategoryAsync({ only, sort, skip, limit });
  };

  render() {
    return (
      <div className="window-wrapper">
        <CategoryHeader title="Category">
          <DropDownBox
            label="SortBy"
            options={[
              { name: "date", value: "createdAt" },
              { name: "name", value: "name" },
            ]}
            cb={this.sortFilter}
            value={this.state.category}
          />

          <ActionButton
            title={
              <FontAwesomeIcon
                icon={
                  this.state.sortDirection ? faArrowCircleUp : faArrowCircleDown
                }
              />
            }
            size="3"
            cb={() =>
              this.setState({ sortDirection: !this.state.sortDirection }, () =>
                this.categoryFilters()
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
          <ActionButton
            title="Add Category"
            size="28"
            cb={() =>
              this.props.overlaySelector(<CategoryOverlay new={true} />)
            }
          />
        </CategoryHeader>

        <CategoryBody>
          <CategorySubHeading
            items={[
              { title: "image", size: 25 },
              { title: "name", size: 35 },
              { title: "itemCount", size: 20 },
              { title: "edit", size: 10 },
              { title: "Remove", size: 10 },
            ]}
          />
          {this.props.category.categoryLoading ? (
            <LoadingScreen />
          ) : (
            <CategorySubBody>
              {this.props.category.category.map((category) => (
                <CategorySubBodyItem
                  key={category._id}
                  item={[
                    {
                      item: <img src={`${category.image}`} alt="productItm" />,
                      size: 25,
                    },
                    {
                      item: category.name,
                      size: 35,
                    },
                    {
                      item: category.Products.length,
                      size: 20,
                    },
                    {
                      item: (
                        <FontAwesomeIcon
                          className="pointer"
                          icon={faPencilRuler}
                          onClick={() =>
                            this.props.overlaySelector(
                              <CategoryOverlay item={category} />
                            )
                          }
                        />
                      ),
                      size: 10,
                    },
                    {
                      item: (
                        <FontAwesomeIcon
                          className="pointer"
                          icon={faTrashAlt}
                          onClick={() =>
                            this.props.showDialog(
                              <ConfirmationOverlayBody
                                message={`Are You sure you want to delete ${category.name} with all its products`}
                                cb={()=>this.props.deleteCategoryAsync(category._id)}
                              />
                            )
                          }
                        />
                      ),
                      size: 10,
                    },
                  ]}
                />
              ))}
            </CategorySubBody>
          )}
        </CategoryBody>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { getCategoryAsync, showDialog,deleteCategoryAsync })(
  CategoryScreen
);
