import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import {
  getCompanyDetails,
  getUser,
  getBankDetails,
  GetUser,
  getBranchDetails,
} from "../../../Actions/UserAction";
import moment from "moment";
import "./Navbar.css";
import sidebar from "./side.png"
const Navbar = () => {
  const toggleOffcanvas = () => {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  };
  const { user } = useSelector((state) => state.user);
  const { login } = useSelector((state) => state.login);
  const { company } = useSelector((state) => state.company);
  const { mybranch } = useSelector((state) => state.mybranch);
  const { mybank } = useSelector((state) => state.mybank);

  const [logo, setlogo] = useState(mybank && mybank.logo);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform the search action or redirect to the search results page
    // based on the searchQuery value
    // For example:
    navigate(`/admin?query=${searchQuery}`);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUser());
  }, []);

  //user
  const [gender, setgender] = useState(user && user.gender);
  const [role, setrole] = useState(login && login.role);

  let [name, setname] = useState();
  const [image, setimage] = useState("");

  // set data ojn change
  useEffect(() => {
    if (login) {
      if (login.role == "company") setrole("user");
      else setrole(login.role);
      if ((login && login.role == "user") || login.role == "admin") {
        setname(user?.name);
        setimage(user?.profile?.url);
      } else if (login && login.role === "company") {
        setname(company?.cname);
        setimage(company?.logo?.url);
      } else if (login && login.role === "bank") {
        setname(mybank?.bank_name);
        setimage(mybank?.logo?.url);
      } else if (login && login.role === "branch") {
        setname(mybranch?.branch_name);
        setimage(mybranch?.logo?.url);
      }
      setgender(user && user.gender);
    }
  }, [login]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getCompanyDetails());
    dispatch(getBankDetails());
    dispatch(getBranchDetails());
  }, [dispatch]);

  useEffect(() => {}, [dispatch]);

  var DateCreated = moment(login?.createdAt).utc().format("DD-MM-YYYY");

  const [showResults, setShowResults] = React.useState(true);
  const onClick = () => setShowResults(false);

  return (
    <nav
      style={{ textTransform: "capitalize" }}
      className="navbar p-0 fixed-top d-flex flex-row"
    >
      <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <Link
          className="navbar-brand brand-logo-mini"
          to={`/${role}/dashboard`}
        >
          <img
            src={require("../../../assets/images/clean.svg")}
            alt="logo"
          />
        </Link>
      </div>
      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        <button
          className="navbar-toggler align-self-center"
          style={{ boxShadow: "none" }}
          type="button"
          onClick={() => document.body.classList.toggle("sidebar-icon-only")}
        >
          {/* <span className="mdi mdi-menu"></span> */}
          <MenuIcon />
        </button>
        <ul className="navbar-nav w-100">
          <li className="nav-item w-100">
            {/*<form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                <input type="text" className="form-control" placeholder="Search products" />
              </form>*/}
            {/* <form
              className="nav-link mt-2 mt-md-0 d-none d-lg-flex search"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search products"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form> */}
          </li>
        </ul>
        <ul className="navbar-nav navbar-nav-right">
          <Dropdown alignRight as="li" className="nav-item d-none d-lg-block">
            {/*<Dropdown.Toggle className="nav-link btn btn-success create-new-button no-caret">
                Create New User
                </Dropdown.Toggle>*/}
            <Dropdown.Menu className="navbar-dropdown preview-list create-new-dropdown-menu">
              <h6 className="p-3 mb-0">Forms</h6>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={(evt) => evt.preventDefault()}
                className="preview-item"
              >
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-account text-primary"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <Link
                    className="preview-item text-white"
                    style={{ textDecoration: "none" }}
                    to="/admin/personalform"
                  >
                    Personal
                  </Link>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                href="/admin/personalform"
                onClick={(evt) => evt.preventDefault()}
                className="preview-item"
              >
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-account-switch text-info"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p>Company</p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                href="!#"
                onClick={(evt) => evt.preventDefault()}
                className="preview-item"
              >
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-bank text-danger"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p>Banks</p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <p className="p-3 mb-0 text-center">See all users</p>
            </Dropdown.Menu>
          </Dropdown>
          <li className="nav-item d-none d-lg-block">
            <a
              className="nav-link"
              href="!#"
              onClick={(event) => event.preventDefault()}
            >
              {/*<i className="mdi mdi-theme-light-dark"></i>*/}
            </a>
          </li>
          <Dropdown alignRight as="li" className="nav-item border-left">
            <Dropdown.Toggle
              as="a"
              className="nav-link count-indicator cursor-pointer"
            >
              <i onClick={onClick} className="mdi mdi-bell">
                <NotificationsIcon />
              </i>
              {showResults ? (
                <span onClick={onClick} className="count bg-danger"></span>
              ) : null}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list mobilesize">
              <h6 className="p-3 mb-0">Notifications</h6>
              <Dropdown.Divider />
              <Dropdown.Item
                className="dropdown-item preview-item"
                onClick={(evt) => evt.preventDefault()}
              >
                <div id="Size" className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <img
                      className="img-xs rounded-circle"
                      src="/clean.svg"
                      alt="profile"
                    />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p id="fontheader" className="preview-subject mb-1">
                    E-BIDIR
                  </p>
                  <p id="fontsize" className="text-muted  mb-0 para">
                    We Would Like To Personaly welcome You to E-BIDIR
                  </p>
                  <br></br>
                  <p id="fontsize" className="text-muted  mb-0">
                    {DateCreated}
                  </p>
                </div>
              </Dropdown.Item>
              {/* <p id="fontsmall" className="p-3 mb-0 text-center">
                {" "}
                <Link to="/notifications">See all notifications</Link>
              </p> */}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown alignRight as="li" className="nav-item">
            <Dropdown.Toggle
              as="a"
              className="nav-link cursor-pointer no-caret"
            >
              <div className="navbar-profile">
                <img
                  id="navprovile"
                  className="img-xs rounded-circle"
                  src={image}
                  alt="profile"
                />
                {gender === "Male" ? (
                  <p className="mb-0 d-none d-sm-block navbar-profile-name">
                    {name}
                  </p>
                ) : (
                  <p
                    className="mb-0 d-none d-sm-block navbar-pro
                  file-name"
                  >
                    {name}
                  </p>
                )}

                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {/*<i className="mdi mdi-menu-down d-none d-sm-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>*/}
              </div>
            </Dropdown.Toggle>

            {/*<Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                <h6 className="p-3 mb-0">Profile</h6>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt =>evt.preventDefault()} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Settings</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt =>evt.preventDefault()}  className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1" onClick={handleLogout}>Log Out</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <p className="p-3 mb-0 text-center">Advanced settings</p>
              </Dropdown.Menu>*/}
          </Dropdown>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          style={{ boxShadow: "none" }}
          onClick={toggleOffcanvas}
        >
         
          <img src={sidebar}/>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
