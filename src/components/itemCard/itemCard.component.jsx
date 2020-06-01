import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import ConformationOverlayBody from "../../overlay/confirmationOverlay/conformationBody";

import { showDialog } from "../../redux/actions/conformation.action";
import {deleteProductAsync} from "../../redux/actions/products.actions";

function ItemCard(props) {
  const {_id, image, name, quantity, price,categoryId} = props.item;

  const handleDelete = () => {
    props.deleteProductAsync(_id,categoryId);
  };
  const showDialoug = () => {
    props.showDialog(
      <ConformationOverlayBody
        message={`Are you sure you want to delete ${name}`}
        cb={handleDelete}
      />
    );
  };

  return (
    <div className="itemCard-area">
      <div className="itemCard-wrapper">
        <div
          className="itemCard-image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="itemCard-info">
          <div className="itemCard-info-title">{name}</div>
          <div className="itemCard-info-quantity">Qty: {quantity}</div>
          <div className="itemCard-info-price">Rs. {price}</div>
        </div>
      </div>
      <div className="itemCard-action">
        <div className="itemCard-action-edit" onClick={props.viewItem}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </div>
        <div className="itemCard-action-remove" onClick={showDialoug}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
      </div>
    </div>
  );
}

const mapSateToProps = (state) => ({
  confirmation: state.confirmation,
});

export default connect(mapSateToProps, { showDialog ,deleteProductAsync})(ItemCard);
