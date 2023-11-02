import React from "react";
import { Link } from "react-router-dom";
import { InputGroupAddon, InputGroupText } from "reactstrap";
const AuthenticatedChangePassword = () => {
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
                      <i className="mdi mdi-key"></i>
                    </InputGroupText>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputUsername1"
                      placeholder="New Password"
                    />
                  </InputGroupAddon>
                </div>
                <div className="form-group">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="mdi mdi-key-change"></i>
                    </InputGroupText>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Confirm Password"
                    />
                  </InputGroupAddon>
                </div>

                <div className="mt-3">
                  <Link
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    to="/dashboard"
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

export default AuthenticatedChangePassword;
