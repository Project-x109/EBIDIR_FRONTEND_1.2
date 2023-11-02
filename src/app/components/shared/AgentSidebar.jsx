import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAgent,
  getAllCompaniesAgent,
  getAllUsersAgent,
  getUser,
  logoutUser,
} from "../../../Actions/UserAction";
import "./Sidebar.css";
import dashboard from "../../../assets/images/Dashboard.png";
import PersonalAccount from "../../../assets/images/PersonalAccount.png";
import PersonalShow from "../../../assets/images/PersonalShow.png";
import BusinessShow from "../../../assets/images/BusinessShow.png";
import BusinessAccount from "../../../assets/images/BussinessAccount.png";
import logout from "../../../assets/images/logout.png";
import male from "../../../assets/images/male.png";
import female from "../../../assets/images/female.png";
import Swal from "sweetalert2";
const AgentSidebar = () => {
  const [active, setActive] = useState(1);
  const [expanded, setExpanded] = useState();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { login, loading, isAuthenticated } = useSelector(
    (state) => state.login
  );
  const [role, setRole] = useState();
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
    dispatch(getUser());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllCompaniesAgent());
    dispatch(getAllUsersAgent());
  }, [dispatch]);

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
    else {
      if (login?.role == "company") setRole("user");
      else setRole(login?.role);
    }
  }, [isAuthenticated, history, login, loading]);
  useEffect(() => {
    dispatch(getAgent());
  }, [dispatch]);

  return (
    <nav
      style={{ textTransform: "capitalize" }}
      className="sidebar sidebar-offcanvas"
      id="sidebar"
    >
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <a className="sidebar-brand brand-logo" href={`/${role}/dashboard`}>
          <img
            style={{ position: "fixed", top: "10px" }}
            src={require("../../../assets/images/clean.svg")}
            alt="logo"
          />
        </a>
        <a
          className="sidebar-brand brand-logo-mini"
          href={`/${role}/dashboard`}
        >
          <img src={require("../../../assets/images/clean.svg")} alt="logo" />
        </a>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                {user?.profile?.url ? (
                  <img
                    className="img-xs rounded-circle "
                    src={user?.profile?.url}
                    alt="profile"
                  />
                ) : user?.gender === "Male" || user?.gender === "male" ? (
                  <img
                    className="img-xs rounded-circle "
                    src={male}
                    alt="profile"
                  />
                ) : user?.gender === "Female" || user?.gender === "female" ? (
                  <img
                    className="img-xs rounded-circle "
                    src={female}
                    alt="profile"
                  />
                ) : null}
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                {user?.gender === "Male" ? (
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
                    Mr. {user?.name?.split(" ")[0]}
                  </span>
                ) : (
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
                    Mrs. {user?.name?.split(" ")[0]}
                  </span>
                )}
                <br></br>
                <span id="fontsize">
                  Accounts: <span id="accounts"> 0</span>
                </span>
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
          <Link className="nav-link" to="/agent/dashboard">
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
              {/* <i className="mdi mdi-account-multiple-plus"></i> */}
              <img id="iconsize" alt="loanStatus" src={PersonalAccount}></img>
            </span>
            <Link
              id="fontsize"
              className="menu-title active"
              to={user?.role === "user" ? "/myloans" : "/admin/personalform"}
            >
              Add Personal Account
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
              {/* <i className="mdi mdi-car"></i> */}
              <img id="iconsize" alt="Mycollateral" src={BusinessAccount}></img>
            </span>
            <Link
              id="fontsize"
              className="menu-title active"
              to="/admin/companyform"
            >
              Add Business Account
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
              <img alt="Bankinfo" id="iconsize" src={PersonalShow}></img>
            </span>
            <Link
              className="menu-title active"
              to="/agent/personals"
              id="fontsize"
            >
              Personal Accounts
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
              <img alt="Bankinfo" id="iconsize" src={BusinessShow}></img>
            </span>
            <Link
              className="menu-title active"
              to="/agent/companies"
              id="fontsize"
            >
              Business Accounts
            </Link>
          </div>
        </li>

        <li
          className={
            isPathActive(6)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
          onClick={() => handleClick(6)}
        ></li>
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

export default AgentSidebar;
