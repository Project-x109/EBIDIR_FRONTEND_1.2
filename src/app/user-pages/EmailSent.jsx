import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/UserAction";
import "./Login.css";
import "./Login.css";
import image3 from "../../assets/images/Group 3.png"

const EmailSent = () => {
  // new Authorization CODE
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneNo, setphoneNo] = useState();
  const [email, setEmail] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(phoneNo, email));
  };
  return (
    <div>
      {/* {loading && <BackdropLoader />} */}
      <section class="text-center text-lg-start">
        <div class="container py-4  rounded">
          <div class="row g-0 align-items-center">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <div class="cardLow">
                <div class="notificationCard card ">
                  <p class="notificationHeading">Email Sent</p>
                  <svg class="bellIcon" viewBox="0 0 448 512">
                    <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"></path>
                  </svg>
                  <p class="notificationPara">
                   Please Click the link below if You are a Gmail User
                  </p>
                  <div class="buttonContainer">
                    {/* <button class="AllowBtn">Allow</button>
                    <button class="NotnowBtn">Now now</button> */}
                  </div>

                  <button class="buttonGoogle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 0 256 262"
                    >
                      <path
                        fill="#4285F4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      ></path>
                      <path
                        fill="#EB4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      ></path>
                    </svg>
                    <a
                      style={{ color: "#40404b", textDecoration: "none" }}
                      href="https://mail.google.com/mail"
                    >
                      Continue with Google
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-5 mb-lg-0">
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
export default EmailSent;
