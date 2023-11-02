import { Box, Button } from "@chakra-ui/react";
import "./Personalprofile.css";

import React from "react";
function Actions() {
  return (
    <Box
      style={{ textTransform: "capitalize", justifyContent: "right" }}
      mt={5}
      py={5}
      px={8}
      borderTopWidth={1}
      borderColor="brand.light"
    >
      <Button id="button">
        <a href="/NewPassword" className="dropdown-item preview-item">
          <div className="preview-thumbnail">
            <div className="preview-icon bg-dark rounded-circle">
              <i className="mdi mdi-onepassword  text-info"></i>
            </div>
          </div>
          <div className="preview-item-content">
            <span id="mainspan" className="preview-subject  mb-1 text-medium">
              Change Password
            </span>
          </div>
        </a>
      </Button>
    </Box>
  );
}

export default Actions;
