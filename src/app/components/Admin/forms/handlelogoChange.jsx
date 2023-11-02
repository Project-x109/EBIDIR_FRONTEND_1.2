import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
// You might need to import other dependencies or modules if require
import { ERROR_MESSAGES } from "./errorConstants";

const HandleLogoChange = ({ handleLogoChange, disabled }) => {
  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    const imagevalid = /\.(jpe?g|png|gif|PNG|JPG?G|GIF|JFIF|jfif)$/i;
    const file = e.target.files[0];
    const fileSize = file.size;
    const maxSize = 1024 * 1024; // 1 MB
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        handleLogoChange(reader.result);
      }
    };

    if (!imagevalid.test(inputValue)) {
      e.target.value = null;
      toast.error(ERROR_MESSAGES.IMAGE_SUPPORTED);
      return;
    } else if (fileSize > maxSize) {
      e.target.value = null;
      toast.error(ERROR_MESSAGES.IMAGE_SIZE);
      return;
    }

    reader.readAsDataURL(file);
  };
  return (
    <>
      <div className="col-md-6">
        <Form.Group className="row">
          <label className="col-sm-3 col-form-label">Upload Image:</label>
          <div className="col-sm-9">
            <Form.Control
              accept=".jpg, .jpeg, .png"
              required
              style={{ paddingTop: "5px" }}
              type="file"
              className="form-control visibility-hidden"
              id="customFileLang"
              lang="es"
              onChange={handleChange}
              disabled={disabled}
            />
          </div>
        </Form.Group>
      </div>
    </>
  );
};

export default HandleLogoChange;
