//This screen will be the Root of all the other screens

//dependency import
import React, { Component } from "react";
import { connect } from "react-redux";

//components Import
import NavBar from "../../../components/navbar/navbar.component";
import LeftBar from "../../../components/leftBar/leftBar.component";

//Screens Import
import ProductsScreen from "../productsScreen/products.screen";
import CategoryScreen from "../categoryScreen/category.screen";
import OrdersScreen from "../ordersScreen/orders.screen";
import CampaignScreen from "../campaignScreen/campaign.screen";
import SalesScreen from "../salesScreen/sales.screen";
import CouponsScreen from "../couponsScreen/coupon.screen";
import OverlayScreen from "../../../overlay/overlay.screen";
import ConformationOverlay from "../../../overlay/confirmationOverlay/conformation.overlay";
//Actions import
import { getCategoryAsync } from "../../../redux/actions/category.action";

import {
  showOverlay,
  hideOverlay,
} from "../../../redux/actions/overlay.action";

class DashboardtLayout extends Component {


  //changes the main screen based upn option selected from leftBar component
  renderContent = () => {
    switch (this.props.leftBar.tab) {
      case 0:
        return <ProductsScreen overlaySelector={this.switchOverlay} />;

      case 1:
        return <CategoryScreen overlaySelector={this.switchOverlay} />;

      case 2:
        return <OrdersScreen overlaySelector={this.switchOverlay} />;

      case 3:
        return <CampaignScreen overlaySelector={this.switchOverlay} />;

      case 4:
        return <SalesScreen overlaySelector={this.switchOverlay} />;

      case 5:
        return <CouponsScreen overlaySelector={this.switchOverlay} />;

      default:
        return ProductsScreen;
    }
  };

  switchOverlay = (component) => {
    this.props.showOverlay(component);
  };

  componentDidMount() {
    if (!this.props.category.init) this.props.getCategoryAsync();
  }

  render() {
    return  (
      //Displays the pop-up component
      <div className="dashboardLayout-wrapper">
        {this.props.overlay.overlay ? (
          <OverlayScreen
            closeOverlay={() => this.props.hideOverlay()}
            component={this.props.overlay.overayContent}
          />
        ) : null}

         {this.props.confirmation.status ? <ConformationOverlay /> : null}
        <NavBar overlaySelector={this.switchOverlay} />
        <LeftBar />

        {/* Main component */}
        <div className="dashboardLayout-content">{this.renderContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category,
  overlay: state.overlay,
  leftBar : state.leftBar,
  confirmation : state.confirmation
});

export default connect(mapStateToProps, {
  getCategoryAsync,
  showOverlay,
  hideOverlay,
})(DashboardtLayout);
