import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
/* import { Button } from "@material-ui/core"; */
import Button from '@mui/material/Button';
import { GetUser } from "../../Actions/UserAction";
import { useDispatch } from "react-redux";
const Error404 = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const dispatch = useDispatch();
  const { login, loading, isAuthenticated, error } = useSelector(
    (state) => state.login
  );
  useEffect(() => {
    dispatch(GetUser());
  }, []);
  const route = () => {
    if (login && login?.status === "active") {
      navigate("/" + login?.role + "/dashboard");
      const role = [login.role];
      setAuth({ login, role });
    } else navigate("/login");
  };

  return (
    <div>
      <div className="d-flex align-items-center text-center error-page bg-primary pt-5 pb-4 h-100">
        <div className="row flex-grow">
          <div className="col-lg-8 mx-auto text-white">
            <div className="row align-items-center d-flex flex-row">
              <div className="col-lg-6 text-lg-right pr-lg-4">
                <h1 className="display-1 mb-0">404</h1>
              </div>
              <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                <h2>SORRY!</h2>
                <h3 className="font-weight-light">
                  The page you’re looking for was not found.
                </h3>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 text-center mt-xl-2">
                <Button
                  className=" btn text-white font-weight-medium"
                  onClick={route}
                >
                  Back to Dashbaord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Error404;
