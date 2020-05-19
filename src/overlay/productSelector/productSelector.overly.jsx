import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextBox from "../../components/textBox/textBox.component";

import { getProductsWithoutRedux } from "../../redux/actions/products.actions";

function ProductSelectorOverlay(props) {
  const [items, itemsHandler] = useState([]);
  const [search, searchHandler] = useState("");
  const [selectedItems, selectedItemsHandler] = useState(props.items || []);
  const getProducts = props.getProductsWithoutRedux;

  useEffect(() => {
    const getter = async () => {
      const products = await getProducts({ filters: { name: 1 } });
      itemsHandler(products);
    };

    getter();
  }, [getProducts]);

  const toggleSelectItem = (item) => {
    selectedItemsHandler((oldItems) => [...oldItems, item]);
  };

  return (
    <div className="ProductSelectorOverlay-wrapper">
      <div className="ProductSelectorOverlay-body">
        <div className="ProductSelectorOverlay-close" onClick={props.close}>
          X
        </div>
        <div className="ProductSelectorOverlay-content">
          <TextBox title="search" cb={() => {}} />

          <div className="ProductSelectorOverlay-content-itemsList">
            {useEffect(
              () =>
                items.map((item) => (
                  <div
                    key={item._id}
                    className={`ProductSelectorOverlay-content-itemsList-item ${selectedItems.find(
                      (id) => item._id === id
                    )}`}
                    onClick={() => toggleSelectItem(item._id)}
                  >
                    {item.name}
                  </div>
                )),
              [selectedItems, items]
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { getProductsWithoutRedux })(
  ProductSelectorOverlay
);
