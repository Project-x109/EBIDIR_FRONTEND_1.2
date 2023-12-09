import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { InputGroupAddon, InputGroupText } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { GetUser, clearErrors, loginUser } from "../../Actions/UserAction";
import showPwdImg from "./showp.svg";
import hidePwdImg from "./hidep.svg";
import BackdropLoader from "../components/common/BackdropLoader";
import useAuth from "../../auth/useAuth";
import TextField from "@mui/material/TextField";
import Carousel from "react-material-ui-carousel";
import CardMedia from "@mui/material/CardMedia";
import "./Login.css";
import image1 from "../../assets/images/Group 1.png";
import image2 from "../../assets/images/Group 2.png";
import image3 from "../../assets/images/Group 3.png";
import logosvg from "../../assets/images/backgroundremovedlogo.png";
const Login = () => {
  // new Authorization CODE
  const dispatch = useDispatch();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { login, loading, isAuthenticated, error } = useSelector(
    (state) => state.login
  );
  // data collection
  const [phoneNo, setphoneNo] = useState();
  const [password, setPassword] = useState();
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(phoneNo, password));
    setFormSubmitted(true);
  };

  useEffect(()=>{
    dispatch(GetUser());
  },[isAuthenticated])
  const captchaRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    captchaRef.current.reset();
  };
  useEffect(() => {
    if (login &&loading === false &&isAuthenticated === true &&login?.status === "active") {
      navigate(login?.role + "/dashboard");
      setAuth({ login, isAuthenticated });
    }
  }, [loading, isAuthenticated, login, navigate, setAuth]);
  useEffect(() => {
    if (loading === false && isAuthenticated === false) navigate("/login");
  }, [isAuthenticated, navigate, loading]);
  useEffect(() => {
    if (error &&!("Please Login to Access"==error)) {
      Swal.fire({
        title: "" + error,
        icon:"error",
        type: "error",
        text: error + " try again",
        background: "pink",
      });
      dispatch(clearErrors());
    }
    if (isAuthenticated && login) {
      if (login && login.status === "waiting") {
        Swal.fire({
          title: "Change Password",
          icon:"warning",
          type: "warning",
          text: "To activate your account change password",
          background: "pink",
        });
        url = "/NewPassword";
        navigate(url);
      } else if (login && login.status === "inactive") {
        Swal.fire({
          title: "Account Dormant",
          icon:"warning",
          type: "warning",
          text: "Contact Adminstrator To fix issue",
          background: "pink",
        });
      } else {
        var url = "";
        if (
          (login && login.role) === "user" ||
          (login && login.role) === "company"
        )
          url = "/user/dashboard";
        else if ((login && login.role) === "bank") url = "/bank/dashboard";
        else if ((login && login.role) === "branch") url = "/branch/dashboard";
        else url = "/" + (login && login.role) + "/dashboard";
        navigate(url);
      }
    }
  }, [dispatch, loading, navigate, login,isAuthenticated]);
  const handleFacebookClick = () => {
    Swal.fire({
      title: "Login With FaceBook",
      icon:"warning",
      type: "warning",
      text: "FaceBook  Login is Currently Not supported",
      background: "white",
    });
  };
  const handleGoogleClick = () => {
    Swal.fire({
      title: "Login With Google",
      icon:"warning",
      type: "warning",
      text: "Google  Login is Currently Not supported",
      background: "white",
    });
  };
  const handleTwitterClick = () => {
    Swal.fire({
      title: "Login With Twitter",
      icon:"warning",
      type: "warning",
      text: "Twitter Login is Currently Not supported",
      background: "white",
    });
  };
  const handleGitHubClick = () => {
    Swal.fire({
      title: "Login With Github",
      icon:"warning",
      type: "warning",
      text: "Github Login is Currently Not supported",
      background: "white",
    });
  };
  const handleCreate = () => {
    Swal.fire({
      title: "Create Account",
      icon:"warning",
      type: "warning",
      text: "Contact Adminstrator To Create New Account  0712763618  / support@e-bidir.com",
      background: "white",
    });
  };
  return (
    <div>
      {loading && <BackdropLoader />}
      <section className="text-center text-lg-start cardlogin">
        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card cascading-right background">
                <div className="card-body p-5 shadow-5 text-center">
                  <div className="brand-logo">
                    <img className="logosvg" src={logosvg} alt="logo" />
                  </div>
                  <h2 className="fw-bold mb-5">Welcome to E-bidir</h2>

                  <form onSubmit={handleLogin}>
                    <div style={{ marginLeft: "30%" }}>
                      <div className="form-outline mb-4">
                        <Form.Group className="d-flex inputs search-field">
                          <TextField
                            label="Phone Number"
                             variant="standard"
                            type="text"
                            required
                            id="form3Example3"
                            value={phoneNo}
                            size="lg"
                            onChange={(e) => setphoneNo(e.target.value)}
                            disabled={formSubmitted && loading}
                            style={{visibility:"visible !important"}}
                          />
                          {/* <label>Phone Number*</label> */}
                        </Form.Group>
                      </div>

                      <div class="form-outline mb-4">
                        <Form.Group className="d-flex inputs search-field">
                          <TextField
                            label="Password"
                             variant="standard"
                            type={isRevealPwd ? "text" : "password"}
                            id="form3Example4"
                            required
                            size="lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={formSubmitted && loading}
                            style={{visibility:"visible !important"}}
                          />
                         {/*  <label>Password*</label> */}
                          <InputGroupAddon
                            addonType="append"
                            style={{
                              backgroundColor: "#f2f6f7",
                              paddingTop: "15px",
                            }}
                          >
                            <img
                              alt="profile"
                              style={{ height: "20px", width: "20px" }}
                              title={
                                isRevealPwd ? "Hide password" : "Show password"
                              }
                              src={isRevealPwd ? hidePwdImg : showPwdImg}
                              onClick={() =>
                                setIsRevealPwd((prevState) => !prevState)
                              }
                            />
                          </InputGroupAddon>
                        </Form.Group>
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="btn btn-primary btn-block mb-2"
                      id="button"
                      disabled={formSubmitted && loading}
                    >
                      <span id="mainspan">Sign In</span>
                    </button>
                    <Link
                      className="form-check d-flex justify-content-center mb-2"
                      to={"/forgotpassword"}
                    >
                      Forgot password?
                    </Link>
                    <div className="form-check d-flex justify-content-center mb-2">
                      Don't have an account?{" "}
                      <span
                        onClick={handleCreate}
                        className="text-primary cursor-pointer"
                      >
                        Create
                      </span>
                    </div>
                    <div className="text-center">
                      <p>Connect with us:</p>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                        onClick={handleFacebookClick}
                      >
                        <i class="fab fa-facebook-f"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                        onClick={handleGoogleClick}
                      >
                        <i class="fab fa-google"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                        onClick={handleTwitterClick}
                      >
                        <i class="fab fa-twitter"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                        onClick={handleGitHubClick}
                      >
                        <i class="fab fa-github"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 imagehide">
              <Carousel
                style={{
                  backgroundColor: "hsla(0, 0%, 100%, 0.55)",
                  backdropFilter: "blur(30px)",
                }}
                class="col-lg-6 mb-5 mb-lg-0 imagehide"
              >
                <CardMedia
                  component="img"
                  style={{ height: "90vh" }}
                  src={image3}
                  className="w-100 rounded-4 shadow-4 imagehide"
                  alt=""
                />
                <CardMedia
                  component="img"
                  style={{ height: "90vh" }}
                  src={image2}
                  className="w-100 rounded-4 shadow-4 imagehide"
                  alt=""
                />
                <CardMedia
                  component="img"
                  style={{ height: "90vh" }}
                  src={image1}
                  className="w-100 rounded-4 shadow-4 imagehide"
                  alt=""
                />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
