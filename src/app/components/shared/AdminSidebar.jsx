import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetUser, getUser, logoutUser } from "../../../Actions/UserAction";
import "./Sidebar.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import dashboard from "../../../assets/images/Dashboard.png";
import deacivate from "../../../assets/images/deacivate.png";
import branchlist from "../../../assets/images/brancheslist.png";
import todaysloan from "../../../assets/images/todaysloan.png";
import loantype from "../../../assets/images/loantype.png";
import loanStatus from "../../../assets/images/loanstatus.png";
import users from "../../../assets/images/users.png";
import usersmain from "../../../assets/images/usermain.png";
import logout from "../../../assets/images/logout.png";
import logo from "../../../assets/images/clean.svg"
import Swal from "sweetalert2";
const Sidebar = () => {
  const [active, setActive] = useState(1);
  const [expanded, setExpanded] = useState();
  const [subMenuActive, setSubMenuActive] = useState();
  const { login, loading, isAuthenticated } = useSelector(
    (state) => state.login
  );
  const [isUpward, setIsUpward] = useState({
    arrow1: true,
    arrow2: true,
    arrow3: true,
    arrow4: true,
    arrow6: true,
  });
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();
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
  const handleSubMenuClick = (props) => {
    setSubMenuActive(props);
  };
  const isSubMenuActive = (props) => {
    return subMenuActive === props;
  };
  const handleClickarrow = (arrow) => {
    setIsUpward((prevState) => ({ ...prevState, [arrow]: !prevState[arrow] }));
  };
  useEffect(() => {
    if (!user) dispatch(getUser());
  }, [user, dispatch]);
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
    if (loading === false && isAuthenticated === false) history("/login");
    if (login && login?.role !== "admin") {
      history(
        (login && login.role === "bank" ? "/bank" : "/user") + "/dashboard"
      );
    }
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
        <a className="sidebar-brand brand-logo" href={`/${login?.role}/dashboard`}>
          <img
            style={{ position: "fixed", top: "10px" }}
            src={logo}
            alt="logo"
          />
        </a>
        <a className="sidebar-brand brand-logo-mini" href={`/${login?.role}/dashboard`}>
          <img
            src={logo}
            alt="logo"
          />
        </a>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img
                  className="img-xs rounded-circle "
                  src="/logo.svg"
                  alt="profile"
                />
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
                  {user?.name}
                </span>
                <br></br>
                <span id="fontsize">Elite Analytics</span>
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
          <Link className="nav-link" to="/Admin/dashboard">
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
          <Link className="nav-link" to="/admin/loan/todays">
            <span id="iconsize" className="menu-icon">
              <img alt="ToddaysLoan" id="iconsize" src={todaysloan}></img>
            </span>
            <span id="fontsize" className="menu-title">
              Today's Loans
            </span>
          </Link>
        </li>
        <li
          className={
            isPathActive(3)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={isExpanded(3) ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => handleClick(3)}
            data-toggle="collapse"
            style={{ overflow: "hidden" }}
          >
            <span id="iconsize" className="menu-icon">
              <img alt="Add Users" id="iconsize" src={users}></img>
            </span>
            <span
              id="fontsize"
              onClick={() => handleClickarrow("arrow1")}
              className="menu-title"
            >
              Add Users
            </span>

            <i
              //id="arrow5"
              className="menu-icon menu-arrow"
              style={{ color: "#f2f2f2" }}
              onClick={() => handleClickarrow("arrow1")}
            >
              {isUpward.arrow1 ? (
                <FaArrowDown id="arrow5" />
              ) : (
                <FaArrowUp id="arrow5" />
              )}
            </i>
          </div>
          <Collapse in={isExpanded(3)}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item" onClick={() => handleSubMenuClick(1)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(1) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/personalform"
                    id="fontsize"
                  >
                    Personal Loan
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(2)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(2) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/companyform"
                    id="fontsize"
                  >
                    Business Loan
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(3)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(3) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/bankform"
                    id="fontsize"
                  >
                    Bank Registartion
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(13)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(13) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/branchform"
                    id="fontsize"
                  >
                    Branch Registartion
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(23)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(23) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/agentform"
                    id="fontsize"
                  >
                    Agent Registartion
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive(4)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={isExpanded(4) ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => handleClick(4)}
            data-toggle="collapse"
            style={{ overflow: "hidden" }}
          >
            <span id="iconsize" className="menu-icon">
              <img alt="Users" id="iconsize" src={usersmain}></img>
            </span>
            <span
              id="fontsize"
              onClick={() => handleClickarrow("arrow2")}
              className="menu-title"
            >
              Users
            </span>

            <i
              //id="arrow5"
              className="menu-icon menu-arrow"
              style={{ color: "#f2f2f2" }}
              onClick={() => handleClickarrow("arrow2")}
            >
              {isUpward.arrow2 ? (
                <FaArrowDown id="arrow5" />
              ) : (
                <FaArrowUp id="arrow5" />
              )}
            </i>
          </div>
          <Collapse in={isExpanded(4)}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item" onClick={() => handleSubMenuClick(4)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(4) ? "nav-link active" : "nav-link"
                    }
                    to="/personals"
                    id="fontsize"
                  >
                    Personal Users
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(5)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(5) ? "nav-link active" : "nav-link"
                    }
                    to="/companies"
                    id="fontsize"
                  >
                    Business Users
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(6)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(6) ? "nav-link active" : "nav-link"
                    }
                    to="/banks"
                    id="fontsize"
                  >
                    Bank
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(60)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(60) ? "nav-link active" : "nav-link"
                    }
                    to="/availableBranches"
                    id="fontsize"
                  >
                    Branches
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(62)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(62) ? "nav-link active" : "nav-link"
                    }
                    to="/agents"
                    id="fontsize"
                  >
                    Agents
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(7)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(7) ? "nav-link active" : "nav-link"
                    }
                    to="/all"
                    id="fontsize"
                  >
                    All
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive(5)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={isExpanded(5) ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => handleClick(5)}
            data-toggle="collapse"
            style={{ overflow: "hidden" }}
          >
            <span id="iconsize" className="menu-icon">
              <img alt="Loans" id="iconsize" src={loantype}></img>
            </span>
            <span
              id="fontsize"
              onClick={() => handleClickarrow("arrow3")}
              className="menu-title"
            >
              Loans
            </span>
            <i
              //id="arrow5"
              className="menu-icon menu-arrow"
              style={{ color: "#f2f2f2" }}
              onClick={() => handleClickarrow("arrow3")}
            >
              {isUpward.arrow3 ? (
                <FaArrowDown id="arrow5" />
              ) : (
                <FaArrowUp id="arrow5" />
              )}
            </i>
          </div>
          <Collapse in={isExpanded(5)}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item" onClick={() => handleSubMenuClick(8)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(8) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/loans/1"
                    id="fontsize"
                  >
                    Personal
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(9)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(9) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/loans/2"
                    id="fontsize"
                  >
                    Business
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(10)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(10) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/loans/3"
                    id="fontsize"
                  >
                    All
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive(6)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={isExpanded(6) ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => handleClick(6)}
            data-toggle="collapse"
            style={{ overflow: "hidden" }}
          >
            <span id="iconsize" className="menu-icon">
              <img alt="Loan Status" id="iconsize" src={loanStatus}></img>
            </span>
            <span
              id="fontsize"
              onClick={() => handleClickarrow("arrow4")}
              className="menu-title"
            >
              Loan Status
            </span>
            <i
              //id="arrow5"
              className="menu-icon menu-arrow"
              style={{ color: "#f2f2f2" }}
              onClick={() => handleClickarrow("arrow4")}
            >
              {isUpward.arrow4 ? (
                <FaArrowDown id="arrow5" />
              ) : (
                <FaArrowUp id="arrow5" />
              )}
            </i>
          </div>
          <Collapse in={isExpanded(6)}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item" onClick={() => handleSubMenuClick(11)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(11) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/loan/approved"
                    id="fontsize"
                  >
                    Approved
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(12)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(12) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/loan/Pending"
                    id="fontsize"
                  >
                    Pending
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(13)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(13) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/loan/Rejected"
                    id="fontsize"
                  >
                    Rejected
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(14)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(14) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/loan/Closed"
                    id="fontsize"
                  >
                    Closed
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(15)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(15) ? "nav-link active" : "nav-link"
                    }
                    to="/admin/loan/All"
                    id="fontsize"
                  >
                    All
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

        <li
          className={
            isPathActive(50)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={isExpanded(50) ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => handleClick(50)}
            data-toggle="collapse"
            style={{ overflow: "hidden" }}
          >
            <span id="iconsize" className="menu-icon">
              <img alt="Loans" id="iconsize" src={deacivate}></img>
            </span>
            <span
              id="fontsize"
              onClick={() => handleClickarrow("arrow6")}
              className="menu-title"
            >
              Deactivated
            </span>
            <i
              //id="arrow5"
              className="menu-icon menu-arrow"
              style={{ color: "#f2f2f2" }}
              onClick={() => handleClickarrow("arrow6")}
            >
              {isUpward.arrow6 ? (
                <FaArrowDown id="arrow5" />
              ) : (
                <FaArrowUp id="arrow5" />
              )}
            </i>
          </div>
          <Collapse in={isExpanded(50)}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item" onClick={() => handleSubMenuClick(8)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(80) ? "nav-link active" : "nav-link"
                    }
                    to="/trash"
                    id="fontsize"
                  >
                    Users
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(63)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(100) ? "nav-link active" : "nav-link"
                    }
                    to="/trashagents"
                    id="fontsize"
                  >
                    Agents
                  </Link>
                </li>
                <li className="nav-item" onClick={() => handleSubMenuClick(9)}>
                  {" "}
                  <Link
                    className={
                      isSubMenuActive(90) ? "nav-link active" : "nav-link"
                    }
                    to="/trashbranch"
                    id="fontsize"
                  >
                    Branches
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

        <li
          className={
            isPathActive(9)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={isPathActive(9) ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => handleClick(9)}
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
export default Sidebar;
