import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

function ImagePreview(props) {
  const { image, size } = props;
  return (
    <div
      className="imagePreview"
      style={{
        backgroundImage: `url(${image})`,
        width: `${size ? size + "rem" : "100%"}`,
      }}
    >

      <label htmlFor="image">
      <div className="imagePreview-edit">
        <FontAwesomeIcon icon={faPencilAlt} />
      </div>
      </label>
      <input type="file" name="image" id="image" style={{display:"none"}}/>

    </div>
  );
}

export default ImagePreview;