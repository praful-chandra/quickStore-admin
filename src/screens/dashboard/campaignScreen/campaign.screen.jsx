import React, { Component } from "react";

import CategoryHeader from "../../../components/categoryHeader/categoryHeader.component";
import DropDownBox from "../../../components/dropDownBox/dropdownBox.component";
import TextBox from "../../../components/textBox/textBox.component";
import ActionButton from "../../../components/actionButton/actionButton.component";

class CampaignScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }
  render() {
    return (
      <div className="window-wrapper">
        <CategoryHeader title="Campaign">
          <DropDownBox
            label="SortBy"
            options={["select One", "name", "creation Date", "Number of items"]}
          />
          <TextBox
            title="Search"
            type="search"
            size="51"
            placeholder="Try hats"
            value={this.state.search}
            cb={(e) => this.setState({ search: e.target.value })}
          />
          <ActionButton title="Add Campaign" size="28" cb={() => {}} />
        </CategoryHeader>
      </div>
    );
  }
}

export default CampaignScreen;
