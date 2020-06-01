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

import CouponOverlay from "../../../overlay/overlayBody/coupons.overlay";
import ConfirmationOverlayBody from "../../../overlay/confirmationOverlay/conformationBody";

import {
  getCouponAsync,
  deleteCouponAsync,
} from "../../../redux/actions/coupon.action";
import { showDialog } from "../../../redux/actions/conformation.action";

import LoadingScreen from "../../loading/loading.screen";

class CouponScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", sort: "createdAt", sortDirection: true };
  }
  couponFilters = () => {
    const search = this.state.search;

    const only = search ? { name: { $regex: search, $options: "i" } } : {};

    const sort = { [this.state.sort]: this.state.sortDirection ? 1 : -1 };

    this.props.getCouponAsync({ only, sort });
  };

  searchFilter = (search) => {
    this.setState(
      {
        search: search.value,
      },
      () => this.couponFilters()
    );
  };
  sortFilter = (filter) => {
    this.setState(
      {
        sort: filter,
      },
      () => this.couponFilters()
    );
  };

  deleteHandler (id){
    this.props.deleteCouponAsync(id);
  }

  componentDidMount() {
    if (!this.props.coupon.init) {
      this.couponFilters();
    }
  }

  render() {
    return (
      <div className="window-wrapper">
        <CategoryHeader title="Coupons">
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
                this.couponFilters()
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
            title="Add Coupon"
            size="28"
            cb={() => this.props.overlaySelector(<CouponOverlay neww={true} />)}
          />
        </CategoryHeader>

        <CategoryBody>
          <CategorySubHeading
            items={[
              { title: "Name", size: 10 },
              { title: "Gen at", size: 10 },
              { title: "CODE", size: 30 },
              { title: "UpTo", size: 10 },
              { title: "Remaining", size: 10 },
              { title: "Discount\n%", size: 10 },
              { title: "Exp at", size: 10 },
              { title: "Edit", size: 5 },
              { title: "Remove", size: 5 },
            ]}
          />

          {this.props.coupon.couponLoading ? (
            <LoadingScreen />
          ) : (
            <CategorySubBody>
              {this.props.coupon.coupons.map((coupon) => (
                <CategorySubBodyItem
                  key={coupon._id}
                  item={[
                    {
                      item: coupon.name,
                      size: 10,
                    },
                    {
                      item: new Date(coupon.createdAt).toDateString(),
                      size: 10,
                    },
                    {
                      item: coupon.code.toUpperCase(),
                      size: 30,
                    },
                    {
                      item: coupon.upTo ? `${coupon.upTo}.Rs` : "N/A",
                      size: 10,
                    },
                    {
                      item: coupon.remainingCoupons,
                      size: 10,
                    },
                    {
                      item: coupon.discount,
                      size: 10,
                    },
                    {
                      item: new Date(coupon.expiry).toDateString(),
                      size: 10,
                    },
                    {
                      item: (
                        <FontAwesomeIcon
                          icon={faPencilRuler}
                          className="pointer"
                          onClick={() =>
                            this.props.overlaySelector(
                              <CouponOverlay coupon={coupon} />
                            )
                          }
                        />
                      ),
                      size: 5,
                    },
                    {
                      item: (
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="pointer"
                          onClick={() =>
                            this.props.showDialog(
                              <ConfirmationOverlayBody message="Arer you sure you want to delete" cb={()=>this.deleteHandler(coupon._id)} />
                            )
                          }
                        />
                      ),
                      size: 5,
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
  coupon: state.coupon,
});

export default connect(mapStateToProps, {
  getCouponAsync,
  deleteCouponAsync,
  showDialog,
})(CouponScreen);
