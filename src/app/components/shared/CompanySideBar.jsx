import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanyDetails,
  GetUser,
  logoutUser,
} from "../../../Actions/UserAction";
import "./Sidebar.css";
import dashboard from "../../../assets/images/Dashboard.png";
import loanStatus from "../../../assets/images/loanstatus.png";
import helpcenter from "../../../assets/images/profile.png";
import profile from "../../../assets/images/helpcenter.png";
import logout from "../../../assets/images/logout.png";
import info from "../../../assets/images/info.png";
import collateral from "../../../assets/images/collateral.png";
import request from "../../../assets/images/Request.png";
import company1 from "../../../assets/images/logocam.png";
import Swal from "sweetalert2";
const CompanySideBar = () => {
  const [active, setActive] = useState(1);
  const [expanded, setExpanded] = useState();
  const history = useNavigate();
  const { company } = useSelector((state) => state.company);
  const { login, loading, isAuthenticated } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const isPathActive = (props) => {
    return active === props;
  };
  const isExpanded = (props) => {
    return expanded === props;
  };
  const handleClick = (props) => {
    setActive(props);
    if (!isExpanded(props)) setExpanded(props);
    else setExpanded(0);
  };
  useEffect(() => {
    if (!company) dispatch(getCompanyDetails());
  }, [company, dispatch]);
  useEffect(() => {
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  });
  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        dispatch(logoutUser());
      }
    });
  };
  useEffect(() => {
    if (loading === false && isAuthenticated === false && !login)
      history("/login");
  }, [isAuthenticated, history, login, loading]);
  useEffect(() => {
    dispatch(GetUser());
  }, [dispatch]);
  return (
    <nav
      style={{ textTransform: "capitalize" }}
      className="sidebar sidebar-offcanvas"
      id="sidebar"
    >
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <a className="sidebar-brand brand-logo" href={`/${"user"}/dashboard`}>
          <img
            style={{ position: "fixed", top: "10px" }}
            src={require("../../../assets/images/clean.svg")}
            alt="logo"
          />
        </a>
        <a
          className="sidebar-brand brand-logo-mini"
          href={`/${"user"}/dashboard`}
        >
          <img src={require("../../../assets/images/clean.svg")} alt="logo" />
        </a>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                {company?.logo?.url ? (
                  <img
                    className="img-xs rounded-circle "
                    src={company?.logo?.url}
                    alt="profile"
                  />
                ) : (
                  <img
                    className="img-xs rounded-circle "
                    src={company1}
                    alt="profile"
                  />
                )}
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <span
                  style={{
                    color: "#128fd8",
                    fontStyle: "italic",
                    fontWeight: "bolder",
                    fontSize: "17px",
                  }}
                  id="Name"
                  className="mb-0 font-weight-normal"
                >
                  {company?.cname?.split(" ")[0]}
                </span>
                <br></br>
                <span id="fontsize">Credit Score: {company?.score}</span>
              </div>
            </div>
            <Dropdown alignRight>
              <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                <i className="mdi mdi-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="sidebar-dropdown preview-list">
                <div className="dropdown-divider"></div>
                <a href="/NewPassword" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword  text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject  mb-1 text-small">
                      Change Password
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">Navigation</span>
        </li>
        <li
          className={
            isPathActive(1)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
          onClick={() => handleClick(1)}
        >
          <Link className="nav-link" to="/user/dashboard">
            <span id="iconsize" className="menu-icon">
              <img alt="Dashboard" id="iconsize" src={dashboard}></img>
            </span>
            <span id="fontsize" className="menu-title">
              Dashboard
            </span>
          </Link>
        </li>

        <li
          className={
            isPathActive(2)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
          onClick={() => handleClick(2)}
        >
          <div
            className={isExpanded(2) ? "nav-link menu-expanded" : "nav-link"}
          >
            <span id="iconsize" className="menu-icon">
              <img id="iconsize" alt="requestloan" src={request}></img>
            </span>
            <Link
              id="fontsize"
              className="menu-title active"
              to={"/comapny/loan"}
            >
              Request Loan{" "}
            </Link>
          </div>
        </li>
        <li
          className={
            isPathActive(3)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
          onClick={() => handleClick(3)}
        >
          <div
            className={isExpanded(3) ? "nav-link menu-expanded" : "nav-link"}
          >
            <span id="iconsize" className="menu-icon">
              <img id="iconsize" alt="loanStatus" src={loanStatus}></img>
            </span>
            <Link id="fontsize" className="menu-title active" to={"/mybloans"}>
              My Loans
            </Link>
          </div>
        </li>
        <li
          className={
            isPathActive(4)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
          onClick={() => handleClick(4)}
        >
          <div
            className={isExpanded(4) ? "nav-link menu-expanded" : "nav-link"}
          >
            <span id="iconsize" className="menu-icon">
              <img id="iconsize" alt="Mycollateral" src={collateral}></img>
            </span>
            <Link
              id="fontsize"
              className="menu-title active"
              to="/mycollaterals"
            >
              My Collaterals
            </Link>
          </div>
        </li>
        <li
          className={
            isPathActive(8)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
          onClick={() => handleClick(8)}
        >
          <div
            className={isExpanded(8) ? "nav-link menu-expanded" : "nav-link"}
          >
            <span id="iconsize" className="menu-icon">
              <img id="iconsize" alt="Help" src={profile}></img>
            </span>
            <Link id="fontsize" className="menu-title active" to="/help">
              Help Center
            </Link>
          </div>
        </li>
        <li
          className={
            isPathActive(5)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
          onClick={() => handleClick(5)}
        >
          <div
            className={isExpanded(5) ? "nav-link menu-expanded" : "nav-link"}
          >
            <span id="iconsize" className="menu-icon">
              <img alt="Bankinfo" id="iconsize" src={info}></img>
            </span>
            <Link className="menu-title active" to="/bankinfo" id="fontsize">
              Bank Information
            </Link>
          </div>
        </li>
        <li
          className={
            isPathActive(5)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
          onClick={() => handleClick(5)}
        ></li>
        <li
          className={
            isPathActive(6)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
          onClick={() => handleClick(6)}
        >
          <div
            className={isExpanded(6) ? "nav-link menu-expanded" : "nav-link"}
          >
            <span id="iconsize" className="menu-icon">
              <img id="iconsize" alt="My Profile" src={helpcenter}></img>
            </span>
            <Link
              id="fontsize"
              className="menu-title active"
              to={"/profile/company"}
            >
              My Profile
            </Link>
          </div>
        </li>
        <li
          className={
            isPathActive(7)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
          onClick={() => handleClick(7)}
        >
          <div
            className={isExpanded(7) ? "nav-link menu-expanded" : "nav-link"}
          >
            <span id="iconsize" className="menu-icon">
              <img alt="Logout" id="iconsize" src={logout}></img>
            </span>

            <span
              id="fontsize"
              className="menu-title active"
              onClick={handleLogout}
            >
              Logout
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default CompanySideBar;
