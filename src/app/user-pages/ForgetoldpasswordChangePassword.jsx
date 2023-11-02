import React from "react";
import { Link } from "react-router-dom";
import { InputGroupAddon, InputGroupText } from "reactstrap";
const ChangePassword = () => {
  return (
    <div>
      <div className="d-flex align-items-center auth px-0 h-100">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/logo.svg")} alt="logo" />
              </div>
              <h4>Change Password</h4>
              <form className="pt-3">
                <div className="form-group">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="mdi mdi-email"></i>
                    </InputGroupText>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                    />
                  </InputGroupAddon>
                </div>
                <div className="mt-3">
                  <Link
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    to="/user-pages/Authenticated_changepassword-1"
                  >
                    Submit
                  </Link>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account?{" "}
                  <Link to="/user-pages/login-1" className="text-primary">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
