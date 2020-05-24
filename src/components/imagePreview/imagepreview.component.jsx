import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function ImagePreview(props) {
  const { image, size } = props;

  const imageChangeHandler = (e) => {
    const size = e.target.files[0].size / 1024 / 1024;

    if (size > 2)
      alert("file size is " + size + " MB\n please provide file less than 2MB");
    else props.cb(e);
  };

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
      <input
        type="file"
        name="image"
        id="image"
        style={{ display: "none" }}
        onChange={imageChangeHandler}
      />
    </div>
  );
}

export default ImagePreview;
