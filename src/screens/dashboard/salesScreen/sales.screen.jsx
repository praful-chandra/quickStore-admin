import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilRuler,
  faTrashAlt,
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import CategoryHeader from "../../../components/categoryHeader/categoryHeader.component";
import DropDownBox from "../../../components/dropDownBox/dropdownBox.component";
import TextBox from "../../../components/textBox/textBox.component";
import ActionButton from "../../../components/actionButton/actionButton.component";

import CategoryBody from "../../../components/categoryBody/categoryBody.component";
import CategorySubHeading from "../../../components/categorySubHeading/categorySubHeading.component";
import CategorySubBody from "../../../components/categorySubBody/categorySubBody.componene";
import CategorySubBodyItem from "../../../components/categorySubBody/categorySubBody.item.component";

import SalesOverlay from "../../../overlay/overlayBody/sales.overlay";
import ConformationOverlayBody from "../../../overlay/confirmationOverlay/conformationBody";

import {
  getSaleAsync,
  deleteSaleAsync,
} from "../../../redux/actions/sale.action";
import { showDialog } from "../../../redux/actions/conformation.action";

import LoadingScreen from "../../loading/loading.screen";

class SalesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", sort: "createdAt", sortDirection: true };
  }

  salesFilters = () => {
    const search = this.state.search;

    const only = search ? { name: { $regex: search, $options: "i" } } : {};

    const sort = { [this.state.sort]: this.state.sortDirection ? 1 : -1 };

    this.props.getSaleAsync({ only, sort });
  };

  searchFilter = (search) => {
    this.setState(
      {
        search: search.value,
      },
      () => this.salesFilters()
    );
  };

  sortFilter = (filter) => {
    this.setState(
      {
        sort: filter,
      },
      () => this.salesFilters()
    );
  };

  componentDidMount() {
    if (!this.props.sale.init) this.salesFilters();
  }

  handleDelete(id) {
    this.props.deleteSaleAsync(id);
  }

  render() {
    return (
      <div className="window-wrapper">
        <CategoryHeader title="Sales">
          <DropDownBox
            label="SortBy"
            options={[
              { name: "date", value: "createdAt" },
              { name: "name", value: "name" },
            ]}
            cb={this.sortFilter}
            value={this.state.sort}
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
                this.salesFilters()
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
            title="Add Sale"
            size="28"
            cb={() => this.props.overlaySelector(<SalesOverlay neww={true} />)}
          />
        </CategoryHeader>

        <CategoryBody>
          <CategorySubHeading
            items={[
              { title: "image", size: 10 },
              { title: "Sales Name", size: 40 },
              { title: "views", size: 20 },
              { title: "Items\nSold", size: 10 },
              { title: "edit", size: 10 },
              { title: "Remove", size: 10 },
            ]}
          />

          {this.props.sale.saleLoading ? (
            <LoadingScreen />
          ) : (
            <CategorySubBody>
              {this.props.sale.sales.map((sale) => (
                <CategorySubBodyItem
                  key={sale._id}
                  item={[
                    {
                      item: <img src={`${sale.image}`} alt="productItm" />,
                      size: 10,
                    },
                    {
                      item: sale.name,
                      size: 40,
                    },
                    {
                      item: sale.views,
                      size: 20,
                    },
                    {
                      item: sale.itemsSold,
                      size: 10,
                    },
                    {
                      item: (
                        <FontAwesomeIcon
                          icon={faPencilRuler}
                          className="pointer"
                          onClick={() =>
                            this.props.overlaySelector(
                              <SalesOverlay sale={sale} />
                            )
                          }
                        />
                      ),
                      size: 10,
                    },
                    {
                      item: (
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="pointer"
                          onClick={() => {
                            this.props.showDialog(
                              <ConformationOverlayBody
                                message="Are you sure you want to delete ?"
                                cb={() => this.handleDelete(sale._id)}
                              />
                            );
                          }}
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
  sale: state.sale,
});

export default connect(mapStateToProps, {
  getSaleAsync,
  deleteSaleAsync,
  showDialog,
})(SalesScreen);
