import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { InputGroupAddon, InputGroupText } from "reactstrap";
import TextField from "@mui/material/TextField";
import showPwdImg from "./showp.svg";
import hidePwdImg from "./hidep.svg";
import { Changepassword, GetUser, Resetpassword, logoutUser } from "../../Actions/UserAction";
import Swal from "sweetalert2";
import BackdropLoader from "../components/common/BackdropLoader";
import "./Login.css";
import image3 from "../../assets/images/Group 3.png"

const ResetPassword = () => {
  const { error, success ,loading} = useSelector((state) => state.profile);
  const {token}=useParams();
  const [newPassword, setnewPassword] = useState();
  const [cnewPassword, setcNewpassword] = useState();
  const [isRevealPwd1, setIsRevealPwd1] = useState(false);
  const [isRevealPwd2, setIsRevealPwd2] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    dispatch(GetUser());
  }, [dispatch]);
  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Password Recovered",
        type: "success",
        text: "Password Recovered Successfully Check You Email",
        background: "white",
       
      });
      history("/login");
    }
    if (error) {
      Swal.fire({
        title: " " + error,
        type: "error",
        text: "Error Occured:-" + error,
        background: "pink",
        timer: 3000,
      });
    }
  }, [dispatch, success, error, history]);

  const handleChange = (e) => { 
    e.preventDefault();
    if (newPassword === cnewPassword) {
      dispatch(Resetpassword({password:newPassword,token:token}));
    }
    if (String(newPassword).length === 0) {
      Swal.fire({
        title: "New Password Error",
        type: "error",
        text: "Enter New Password",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (String(newPassword).length < 8) {
      Swal.fire({
        title: "New Password Error",
        type: "error",
        text: "Password Must be Greatet than Eight Character",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (newPassword !== cnewPassword) {
      Swal.fire({
        title: "Password Doesnot Match",
        type: "error",
        text: "Password Must Be Same As Confirm Password",
        background: "pink",
        timer: 3000,
      });
      return;
    }
  };
  return (
    <div>
      {loading && <BackdropLoader />}
      <section class="text-center text-lg-start">
        <div class="container py-4">
          <div class="row g-0 align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0">
              <div class="card cascading-right background">
                <div class="card-body p-5 shadow-5 text-center">
                  <h2 class="fw-bold mb-5">Reset Your Password</h2>
                  <form onSubmit={(e)=>handleChange(e)}>
                    <div style={{ paddingLeft: "32%" }}>
                      <div class="form-outline mb-4">
                        <Form.Group className="d-flex inputs search-field">
                          <TextField
                            label="New Password"
                            variant="standard"
                            name="newPassword"
                            required
                            type={isRevealPwd1 ? "text" : "password"}
                            id="form3Example4"
                            size="lg"
                            value={newPassword}
                            onChange={(e) => setnewPassword(e.target.value)}
                          />
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
                                isRevealPwd1 ? "Hide password" : "Show password"
                              }
                              src={isRevealPwd1 ? hidePwdImg : showPwdImg}
                              onClick={() =>
                                setIsRevealPwd1((prevState) => !prevState)
                              }
                            />
                          </InputGroupAddon>
                        </Form.Group>
                      </div>

                      <div class="form-outline mb-4">
                        <Form.Group className="d-flex inputs search-field">
                          <TextField
                            label="Confirm Password"
                            variant="standard"
                            name="cnewPassword"
                            type={isRevealPwd2 ? "text" : "password"}
                            id="form3Example4"
                            size="lg"
                            required
                            value={cnewPassword}
                            onChange={(e) => setcNewpassword(e.target.value)}
                          />
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
                                isRevealPwd2 ? "Hide password" : "Show password"
                              }
                              src={isRevealPwd2 ? hidePwdImg : showPwdImg}
                              onClick={() =>
                                setIsRevealPwd2((prevState) => !prevState)
                              }
                            />
                          </InputGroupAddon>
                        </Form.Group>
                      </div>
                    </div>
                    <div id="main_container" className="mt-3">
                      <button
                        id="newpasswordbutton"
                        type="submit"
                        class="btn btn-primary btn-block mb-4"
                      >
                        Submit
                      </button>

                      <Link
                        id="NewPasswordLink"
                        className="btn btn-success"
                        to="/login"
                      >
                        Go to Login
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mb-5 mb-lg-0 imagehide">
              <img
                style={{ height: "95vh" }}
                src={image3}
                class="w-100 rounded-4 shadow-4 imagehide"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
