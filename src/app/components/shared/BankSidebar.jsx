import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getBankDetails,
  GetUser,
  getUser,
  logoutUser,
  getBranchDetails,
  getMyBranchBank,
} from "../../../Actions/UserAction";
import "./Sidebar.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import dashboard from "../../../assets/images/Dashboard.png";
import createbranch from "../../../assets/images/branch.png";
import branchlist from "../../../assets/images/brancheslist.png";
import todaysloan from "../../../assets/images/todaysloan.png";
import loantype from "../../../assets/images/loantype.png";
import loanStatus from "../../../assets/images/loanstatus.png";
import helpcenter from "../../../assets/images/profile.png";
import profile from "../../../assets/images/helpcenter.png";
import logout from "../../../assets/images/logout.png";
import Swal from 'sweetalert2';
import logoMain from "../../../assets/images/clean.svg"

const BankSidebar = () => {
  const [active, setActive] = useState(1);
  const history = useNavigate();
  const [expanded, setExpanded] = useState();
  const [subMenuActive, setSubMenuActive] = useState();
  const { user } = useSelector((state) => state.user);
  const { mybank } = useSelector((state) => state.mybank);
  const { mybranchbank } = useSelector((state) => state.mybranchbank);
  const { mybranch } = useSelector((state) => state.mybranch);
  const { login, loading, isAuthenticated } = useSelector(
    (state) => state.login
  );
  const [role, setRole] = useState();
  const [bank_name, setBankName] = useState(mybank && mybank.bank_name);
  const [bank_nameBranch, setBankNameBranch] = useState(
    mybranch && mybranch.bank_name
  );
  const [branch_name, setBranchName] = useState(
    mybranch && mybranch.branch_name
  );

  const [logo, setlogo] = useState(mybank && mybank.logo);
  //const [isUpward, setIsUpward] = useState(true);
  const [isUpward, setIsUpward] = useState({ arrow1: true, arrow2: true });
  const dispatch = useDispatch();

  const handleClickarrow = (arrow) => {
    setIsUpward((prevState) => ({ ...prevState, [arrow]: !prevState[arrow] }));
  };

  useEffect(() => {
    dispatch(getBankDetails());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBranchDetails());
    dispatch(getMyBranchBank());
  }, [dispatch]);
  useEffect(() => {
    if (login && login.role) setRole(login?.role);
  }, [login]);
  useEffect(() => {
    if (mybranch) {
      setBankNameBranch(mybranch && mybranch.bank_name);
      setBranchName(mybranch && mybranch.branch_name);
    }
  }, [user, mybranch]);

  useEffect(() => {
    if (mybank) {
      setlogo(mybank && mybank.logo);
      setBankName(mybank && mybank.bank_name);
    } else if (role === "branch" && mybranchbank ) {
      setlogo(mybranchbank && mybranchbank?.logo?.url);
    }
  }, [user, mybank, mybranchbank, role]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

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
      title: 'Logout Confirmation',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
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
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <a className="sidebar-brand brand-logo"  href={`/${login?.role}/dashboard`}>
          <img
            style={{ position: "fixed", top: "10px" }}
            src={logoMain}
            alt="logo"
          />
        </a>
        <a className="sidebar-brand brand-logo-mini"  href={`/${login?.role}/dashboard`}>
          <img
            src={logoMain}
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
                  src={logo ? logo.url : mybranchbank?.logo?.url}
                  alt="profile"
                />
                <span className="count bg-success"></span>
              </div>
              {role == "bank" ? (
                <div className="profile-name">
                  <span
                    style={{
                      color: "#128fd8",
                      fontStyle: "italic",
                      fontWeight: "bolder",
                      fontSize: "17px",
                    }}
                    className="mb-0 font-weight-normal"
                    id="Name"
                  >
                    {bank_name}
                  </span>
                  <br></br>
                  <span id="fontsize">{"Head Office"}</span>
                </div>
              ) : (
                <div className="profile-name">
                  <span
                    style={{
                      color: "#128fd8",
                      fontStyle: "italic",
                      fontWeight: "bolder",
                      fontSize: "17px",
                    }}
                    className="mb-0 font-weight-normal"
                    id="Name"
                  >
                    {bank_nameBranch}
                  </span>
                  <br></br>
                  <span id="fontsize">{branch_name}</span>
                </div>
              )}
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
          <Link
            className="nav-link"
            to={role == "bank" ? "/bank/dashboard" : "/branch/dashboard"}
          >
            <span id="iconsize" className="menu-icon">
              <img alt="Dashboard" id="iconsize" src={dashboard}></img>
            </span>
            <span id="fontsize" className="menu-title">
              Dashboard
            </span>
          </Link>
        </li>
        {role == "bank" ? (
          <li
            className={
              isPathActive(10)
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
            onClick={() => handleClick(10)}
          >
            <Link className="nav-link" to="/bank/branchform">
              <span id="iconsize" className="menu-icon">
                <img alt="Create Branch" id="iconsize" src={createbranch}></img>
              </span>
              <span id="fontsize" className="menu-title">
                Create Branch
              </span>
            </Link>
          </li>
        ) : null}

        {role == "bank" ? (
          <li
            className={
              isPathActive(20)
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
            onClick={() => handleClick(20)}
          >
            <Link className="nav-link" to="/bank/branchlists">
              <span id="iconsize" className="menu-icon">
                <img id="iconsize" src={branchlist}></img>
              </span>
              <span id="fontsize" className="menu-title">
                Branches List
              </span>
            </Link>
          </li>
        ) : null}
        {role == "bank" ? (
          <li
            className={
              isPathActive(2)
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
            onClick={() => handleClick(2)}
          >
            <Link className="nav-link" to="/loans/today">
              <span id="iconsize" className="menu-icon">
                <img alt="Today's Loan" id="iconsize" src={todaysloan}></img>
              </span>
              <span id="fontsize" className="menu-title">
                Today's Loans
              </span>
            </Link>
          </li>
        ) : (
          <li
            className={
              isPathActive(2)
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
            onClick={() => handleClick(2)}
          >
            <Link className="nav-link" to="/branchloans/today">
              <span id="iconsize" className="menu-icon">
                <img alt="Today's Loan" id="iconsize" src={todaysloan}></img>
              </span>
              <span id="fontsize" className="menu-title">
                Today's Loans
              </span>
            </Link>
          </li>
        )}

        {/* Loans */}
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
            style={{ overflow: "hidden" }}
            data-toggle="collapse"
          >
            <span id="iconsize" className="menu-icon">
              <img alt="loantype" id="iconsize" src={loantype}></img>
            </span>
            <span
              onClick={() => handleClickarrow("arrow1")}
              id="fontsize"
              className="menu-title"
            >
              Loan Type
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

          {role == "bank" ? (
            <Collapse in={isExpanded(3)}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(1)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(1) ? "nav-link active" : "nav-link"
                      }
                      to="/loan/1"
                    >
                      Personal
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(2)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(2) ? "nav-link active" : "nav-link"
                      }
                      to="/loan/2"
                    >
                      Business
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(3)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(3) ? "nav-link active" : "nav-link"
                      }
                      to="/loan/3"
                    >
                      All
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          ) : (
            <Collapse in={isExpanded(3)}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(1)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(1) ? "nav-link active" : "nav-link"
                      }
                      to="/branchloan/1"
                    >
                      Personal
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(2)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(2) ? "nav-link active" : "nav-link"
                      }
                      to="/branchloan/2"
                    >
                      Business
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(3)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(3) ? "nav-link active" : "nav-link"
                      }
                      to="/branchloan/3"
                    >
                      All
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          )}
        </li>
        {/* view users menu */}
        <li
          className={
            isPathActive(4)
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            style={{ overflow: "hidden" }}
            className={isExpanded(4) ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => handleClick(4)}
            data-toggle="collapse"
          >
            <span id="iconsize" className="menu-icon">
              <img id="iconsize" alt="loanStatus" src={loanStatus}></img>
            </span>
            <span
              id="fontsize"
              onClick={() => handleClickarrow("arrow2")}
              className="menu-title"
            >
              Loan Status
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
          {role == "bank" ? (
            <Collapse in={isExpanded(4)}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(4)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(4) ? "nav-link active" : "nav-link"
                      }
                      to="/loans/approved"
                    >
                      Approved
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(5)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(5) ? "nav-link active" : "nav-link"
                      }
                      to="/loans/Pending"
                    >
                      Pending
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(6)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(6) ? "nav-link active" : "nav-link"
                      }
                      to="/loans/Rejected"
                    >
                      Rejected
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(7)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(7) ? "nav-link active" : "nav-link"
                      }
                      to="/loans/Closed"
                    >
                      Closed
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(8)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(8) ? "nav-link active" : "nav-link"
                      }
                      to="/loans/All"
                    >
                      All
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          ) : (
            <Collapse in={isExpanded(4)}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(4)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(4) ? "nav-link active" : "nav-link"
                      }
                      to="/branchloans/approved"
                    >
                      Approved
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(5)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(5) ? "nav-link active" : "nav-link"
                      }
                      to="/branchloans/Pending"
                    >
                      Pending
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(6)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(6) ? "nav-link active" : "nav-link"
                      }
                      to="/branchloans/Rejected"
                    >
                      Rejected
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(7)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(7) ? "nav-link active" : "nav-link"
                      }
                      to="/branchloans/Closed"
                    >
                      Closed
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => handleSubMenuClick(8)}
                  >
                    {" "}
                    <Link
                      id="fontsize"
                      className={
                        isSubMenuActive(8) ? "nav-link active" : "nav-link"
                      }
                      to="/branchloans/All"
                    >
                      All
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          )}
        </li>
        {/*   <li className={ this.isPathActive('/deactivate') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.AddUsersMenuOpen ? 'nav-link menu-expanded' : 'nav-link' }>
              <span className="menu-icon">
                <i className="mdi mdi-message"></i>
              </span>
              <Link className="menu-title active" to='/personal/request'>Mailing and Messaging</Link>
            </div>
          </li>*/}
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
              <img id="iconsize" alt="Help" src={helpcenter}></img>
            </span>
            <Link id="fontsize" className="menu-title active" to="/help">
              Help Center
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
        {role == "bank" ? (
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
                <img id="iconsize" alt="My Profile" src={profile}></img>
              </span>
              <Link
                id="fontsize"
                className="menu-title active"
                to="/profile/bank"
              >
                My Profile
              </Link>
            </div>
          </li>
        ) : (
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
                <img
                  id="iconsize"
                  alt="My Profile"
                  src="data:image/png;base64,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"
                ></img>
              </span>
              <Link
                id="fontsize"
                className="menu-title active"
                to="/profile/branch"
              >
                My Profile
              </Link>
            </div>
          </li>
        )}
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

export default BankSidebar;
