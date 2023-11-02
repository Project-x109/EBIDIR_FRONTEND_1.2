import React from "react";
const CommonSidebar = () => {
  return (
    <nav style={{textTransform:"capitalize"}} className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <a className="sidebar-brand brand-logo" href="index.html">
          <img src={require("../../../assets/images/logo.svg")} alt="logo" />
        </a>
        <a className="sidebar-brand brand-logo-mini" href="index.html">
          <img
            src={require("../../../assets/images/logo-mini.svg")}
            alt="logo"
          />
        </a>
      </div>
    </nav>
  );
};
export default CommonSidebar;
