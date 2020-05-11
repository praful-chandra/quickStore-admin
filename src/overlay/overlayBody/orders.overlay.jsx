import React from "react";
import ItemsList from "../../components/itemsList/itemList.component";
import TextBox from "../../components/textBox/textBox.component";
import TextArea from "../../components/textArea/textArea.component";
import DropDownBox from "../../components/dropDownBox/dropdownBox.component";
function OrdersOVerlay(props) {
  return (
    <div className="overlay-form">
      <div className="overlay-form-title">Order #12345</div>

      <div className="overlay-form-card overlay-form-card-top">
        <div className="overlay-form-card-title">Customer Info</div>

        <div className="overlay-form-card-body">
          <div className="overlay-horizontalBlock">
            <div>
              <div>Customer 1</div>
            </div>

            <div className="overlay-form-card-address">
              29 Eve Street, 543 Evenue Road, Ny 87876
            </div>
            <div>987536542</div>
          </div>
        </div>
      </div>
      <div className="overlay-form-card overlay-form-card-bottom">
        <div className="overlay-form-card-title">Order Info</div>
        <div className="overlay-form-card-body">
          <div className="overlay-form-card-left">
            <ItemsList title="Items Ordered" />
          </div>
          <div className="overlay-form-card-right">
            <div className="overlay-horizontalBlock">
              <TextBox
                title="total Amount (Rs.)"
                type="number"
                size="23"
                disabled
                value={5000}
              />
              <TextBox
                title="Payment Method"
                type="text"
                size="32"
                disabled
                value="Cash on delivery"
              />
            </div>

            <TextArea
              title="Order Note"
              width="61"
              height="15"
              disabled
              value="GIft wrap"
            />

            <DropDownBox 
                label="Order Status"
                options={["Initial","processing","delivering","delivered    "]}
                size="61"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersOVerlay;
