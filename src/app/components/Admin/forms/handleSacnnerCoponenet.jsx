import React from "react";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "./errorConstants";
import { Form } from "react-bootstrap";
const HandleProductImageChange = ({ handleProductImageChange,disabled }) => {
  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    const imagevalid = /\.(pdf|PDF)$/i;
    const file = e.target.files[0];
    const fileSize = file.size;
    const maxSize = 1024 * 1024; // 1 MB
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          handleProductImageChange(reader.result);
        }
      };

      if (!imagevalid.test(inputValue)) {
        e.target.value = null;
        toast.error(ERROR_MESSAGES.FILE_TYPE);
        return;
      } else if (fileSize > maxSize) {
        e.target.value = null;
        toast.error(ERROR_MESSAGES.FILE_SIZE);
        return;
      }

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="col-md-6">
      <Form.Group className="row">
        <label className="col-sm-3 col-form-label">Upload File:</label>
        <div className="col-sm-9">
          <Form.Control
            accept=".pdf"
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
  );
};

export default HandleProductImageChange;
