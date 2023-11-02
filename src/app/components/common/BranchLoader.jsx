import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const BranchLoader = () => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 1500 }} open={true}>
      <CircularProgress color="inherit" />
      <h2 className="text-white">Getting Branches</h2>
    </Backdrop>
  );
};

export default BranchLoader;
