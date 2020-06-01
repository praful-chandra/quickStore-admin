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

import CampaignOverlay from "../../../overlay/overlayBody/campaign.overlay";
import LoadingScreen from "../../loading/loading.screen";
import ConformationOverlayBody from "../../../overlay/confirmationOverlay/conformationBody";

import {
  getCampaignASync,
  deleteCampaignAsync,
} from "../../../redux/actions/campaign.action";
import { showDialog } from "../../../redux/actions/conformation.action";

class CampaignScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", sort: "createdAt", sortDirection: true };
  }

  CampaignFilters = () => {
    const search = this.state.search;

    const only = search ? { name: { $regex: search, $options: "i" } } : {};

    const sort = { [this.state.sort]: this.state.sortDirection ? 1 : -1 };

    this.props.getCampaignASync({ only, sort });
  };

  searchFilter = (search) => {
    this.setState(
      {
        search: search.value,
      },
      () => this.CampaignFilters()
    );
  };
  sortFilter = (filter) => {
    this.setState(
      {
        sort: filter,
      },
      () => this.CampaignFilters()
    );
  };

  handleDelete = id=>{
    this.props.deleteCampaignAsync(id);
  }

  componentDidMount() {
    if (!this.props.campaign.init) this.CampaignFilters();
  }

  render() {
    return (
      <div className="window-wrapper">
        <CategoryHeader title="Campaign">
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
                this.CampaignFilters()
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
            title="Add Campaign"
            size="28"
            cb={() =>
              this.props.overlaySelector(<CampaignOverlay neww={true} />)
            }
          />
        </CategoryHeader>

        <CategoryBody>
          <CategorySubHeading
            items={[
              { title: "image", size: 10 },
              { title: "Campaign Name", size: 40 },
              { title: "views", size: 20 },
              { title: "Items\nSold", size: 10 },
              { title: "edit", size: 10 },
              { title: "Remove", size: 10 },
            ]}
          />
          {this.props.campaign.campaignLoading ? (
            <LoadingScreen />
          ) : (
            <CategorySubBody>
              {this.props.campaign.campaigns.map((campaign) => (
                <CategorySubBodyItem
                  key={campaign._id}
                  item={[
                    {
                      item: <img src={`${campaign.image}`} alt="productItm" />,
                      size: 10,
                    },
                    {
                      item: [campaign.name],
                      size: 40,
                    },
                    {
                      item: [campaign.views],
                      size: 20,
                    },
                    {
                      item: [campaign.itemsSold],
                      size: 10,
                    },
                    {
                      item: (
                        <FontAwesomeIcon
                          icon={faPencilRuler}
                          className="pointer"
                          onClick={() =>
                            this.props.overlaySelector(
                              <CampaignOverlay campaign={campaign} />
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
                          onClick={() =>
                            this.props.showDialog(
                              <ConformationOverlayBody
                                message="Are you sure you want to delete ?"
                                cb={() => this.handleDelete(campaign._id)}
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
  campaign: state.campaign,
});

export default connect(mapStateToProps, {
  getCampaignASync,
  deleteCampaignAsync,
  showDialog,
})(CampaignScreen);
