import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

import _imageEncode from "../utils/encodeImage";


function ImagePreview(props) {
  const { image, size } = props;
  return (
    <div
      className="imagePreview"
      style={{
        backgroundImage: `url(${_imageEncode(image.data)})`,
        width: `${size ? size + "rem" : "100%"}`,
      }}
    >

      <label htmlFor="image">
      <div className="imagePreview-edit">
        <FontAwesomeIcon icon={faPencilAlt} />
      </div>
      </label>
      <input type="file" name="image" id="image" style={{display:"none"}} onChange={props.cb}/>

    </div>
  );
}

export default ImagePreview;
