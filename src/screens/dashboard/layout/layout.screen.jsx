import React, { Component } from "react";

import NavBar from "../../../components/navbar/navbar.component";
import LeftBar from "../../../components/leftBar/leftBar.component";

import ProductsScreen from "../productsScreen/products.screen";
import CategoryScreen from "../categoryScreen/category.screen";
import OrdersScreen from "../ordersScreen/orders.screen";
import CampaignScreen from "../campaignScreen/campaign.screen";
import SalesScreen from "../salesScreen/sales.screen";
import CouponsScreen from "../couponsScreen/coupon.screen";


class DashboardtLayout extends Component {
  state = {
    item : 0
  };

  selectContent = item =>this.setState({item})

  renderContent = ()=>{
    switch (this.state.item){

      case 0 : return <ProductsScreen />;

      case 1 : return <CategoryScreen />;

      case 2 : return <OrdersScreen />;

      case 3 : return <CampaignScreen />;

      case 4: return <SalesScreen />;

      case 5 : return <CouponsScreen />;



      default : return ProductsScreen
    }
  }

  render() {
    return (
        <div className="dashboardLayout-wrapper">
            <NavBar />
            <LeftBar cb={this.selectContent}/>

            <div className="dashboardLayout-content">
                {this.renderContent()}
            </div>
        </div>
    )
  }
}

export default DashboardtLayout;
