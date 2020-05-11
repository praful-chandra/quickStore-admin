import React, { Component } from "react";

import NavBar from "../../../components/navbar/navbar.component";
import LeftBar from "../../../components/leftBar/leftBar.component";

import ProductsScreen from "../productsScreen/products.screen";
import CategoryScreen from "../categoryScreen/category.screen";
import OrdersScreen from "../ordersScreen/orders.screen";
import CampaignScreen from "../campaignScreen/campaign.screen";
import SalesScreen from "../salesScreen/sales.screen";
import CouponsScreen from "../couponsScreen/coupon.screen";

import OverlayScreen from "../../../overlay/overlay.screen";
import OrdersOverlay from "../../../overlay/overlayBody/orders.overlay";

class DashboardtLayout extends Component {
  state = {
    item: 0,
    overLayItem:  null,
    overlay:false,
  };

  selectContent = (item) => this.setState({ item });

  renderContent = () => {
    switch (this.state.item) {
      case 0:
        return <ProductsScreen overlaySelector={this.switchOverlay} />;

      case 1:
        return <CategoryScreen overlaySelector={this.switchOverlay}  />;

      case 2:
        return <OrdersScreen overlaySelector={this.switchOverlay}  />;

      case 3:
        return <CampaignScreen overlaySelector={this.switchOverlay}  />;

      case 4:
        return <SalesScreen overlaySelector={this.switchOverlay}  />;

      case 5:
        return <CouponsScreen overlaySelector={this.switchOverlay}  />;

      default:
        return ProductsScreen;
    }
  };

  switchOverlay = (component) => {
    this.setState({ overLayItem: component ,overlay : component ? true : false});
  };

  render() {
    return (
      <div className="dashboardLayout-wrapper">
        {this.state.overlay ? (
          <OverlayScreen
            closeOverlay={() => this.setState({ overlay: false,overLayItem :"" })}
            component={this.state.overLayItem}
          />
        ) : null}
        <NavBar overlaySelector={this.switchOverlay} />
        <LeftBar cb={this.selectContent} />

        <div className="dashboardLayout-content" >{this.renderContent()}</div>
      </div>
    );
  }
}

export default DashboardtLayout;
