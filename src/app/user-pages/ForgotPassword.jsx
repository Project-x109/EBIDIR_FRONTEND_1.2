import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import "./Login.css";
import { forgotPassword } from "../../Actions/UserAction";
import { useSelector } from "react-redux";
import image3 from "../../assets/images/Group 3.png";
import BackdropLoader from "../components/common/BackdropLoader";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  // new Authorization CODE
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneNo, setphoneNo] = useState();
  const [email, setEmail] = useState();
  const { success } = useSelector((state) => state.profile);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    Swal.fire({
      title: "Email Sent",
      type: "success",
      text: "Cheack Your eamil for the password Recovery link",
      background: "white",
      timer: 3000,
    });
    e.preventDefault();

    dispatch(forgotPassword({ phoneNo: phoneNo, email: email }));
    setFormSubmitted(true);
  };
  useEffect(() => {
    if (success) {
      navigate("/emailsent");
    }
  }, [success, navigate]);
  return (
    <div>
      {/* {loading && <BackdropLoader />} */}
      <section class="text-center text-lg-start">
        <div class="container py-4">
          <div class="row g-0 align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0">
              <div class="card cascading-right background">
                <div class="card-body p-5 shadow-5 text-center">
                  <h2 class="fw-bold mb-5">Recover Your Account</h2>
                  <p class="fw-bold">
                    Enter phone number and email to recover your account
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div style={{ paddingLeft: "32%" }}>
                      <div class="form-outline mb-4">
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
                            disabled={formSubmitted}
                          />
                        </Form.Group>
                      </div>

                      <div class="form-outline mb-4">
                        <Form.Group className="d-flex inputs search-field">
                          <TextField
                            label="Email"
                            variant="standard"
                            type="email"
                            id="form3Example4"
                            required
                            size="lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={formSubmitted}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary btn-block mb-4"
                      id="button"
                      disabled={formSubmitted}
                    >
                      <span id="mainspan">Submit</span>
                    </button>
                    <div class="form-check d-flex justify-content-center mb-4">
                      Isn't this your account?{" "}
                      <Link
                        to={"/login"}
                        className="text-primary cursor-pointer ml-2"
                      >
                        Login
                      </Link>
                    </div>
                    <div class="text-center">
                      <p>Connect us with:</p>
                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-facebook-f"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-google"></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-twitter"></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-github"></i>
                      </button>
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
export default ForgotPassword;
