import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { registerUser, clearErrors } from "../../../../Actions/UserAction";
import { REGISTER_USER_RESET } from "../../../../Constants/UserConstants";
import { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import validator from "validator";
import BackdropLoader from "../../common/BackdropLoader";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./forms.css";
import {
  ERROR_MESSAGES,
  validEmailRegex,
  validPhoneRegex,
  alpahbet,
  dotremoval,
  PasswordValidator,
  EmailValidator,
} from "./errorConstants";
import HandleLogoChange from "./handlelogoChange";
import HandleProductImageChange from "./handleSacnnerCoponenet";
const Personal = () => {
  // setups
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, newuser, success, error } = useSelector(
    (state) => state.newuser
  );
  const {login}=useSelector(state=>state.login)

  // database values
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState();
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState();
  const [TIN_Number, setTIN_Number] = useState();
  const [profile, setProfile] = useState("");
  const [scannedFiles, setScannedFiles] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // for profile pic
  const handleLogoChange = (newProfile) => {
    setProfile(newProfile);
  };
  // for scanned documents
  const handleProductImageChange = (newScannedFile) => {
    setScannedFiles((oldfiles) => [...oldfiles, newScannedFile]);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error(ERROR_MESSAGES.EMPTY_NAME);
      return;
    } else if (!alpahbet.test(name)) {
      toast.error(ERROR_MESSAGES.INVALID_NAME);
      return;
    }else if (email&&!validEmailRegex.test(email)) {
      toast.error(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    } else if (email&&email.length < 10) {
      toast.error(ERROR_MESSAGES.EMAIL_TOO_SHORT);
      return;
    } else if (email&&email.length > 320) {
      toast.error(ERROR_MESSAGES.EMAIL_TOO_LONG);
      return;
    } else if (!gender) {
      toast.error(ERROR_MESSAGES.EMPTY_GENDER);
      return;
    } else if (password.length < 8) {
      toast.error(ERROR_MESSAGES.SHORT_PASSWORD);
      return;
    } else if (password.length > 50) {
      toast.error(ERROR_MESSAGES.LONG_PASSWORD);
      return;
    } else if (password !== cpassword) {
      toast.error(ERROR_MESSAGES.MISMATCH_PASSWORD);
      return;
    } else if (phoneNo.length !== 10) {
      toast.error(ERROR_MESSAGES.INVALID_PHONE_LENGTH);
      return;
    } else if (!validPhoneRegex.test(phoneNo)) {
      toast.error(ERROR_MESSAGES.INVALID_PHONE);
      return;
    } else if (dotremoval.test(TIN_Number)) {
      toast.error(ERROR_MESSAGES.INVALID_TIN_DECIMAL);
      return;
    } else if (TIN_Number < 0) {
      toast.error(ERROR_MESSAGES.INVALID_TIN_NEGATIVE);
      return;
    }

    const dataCollected = {
      name,
      email,
      gender,
      password,
      phoneNo,
      TIN_Number,
      profile,
      scannedFiles,
    };
    dispatch(registerUser(dataCollected));
    setFormSubmitted(true)
  };
  useEffect(() => {
    if (error) {
      toast.error("" + error);
      Swal.fire({
        title: "Error While Creating Account",
        type: "error",
        text: "Error Occured: " + error,
        background: "pink",
      });
      dispatch(clearErrors());
      setFormSubmitted(true)
    }
    if (success) {
      Swal.fire({
        title: ERROR_MESSAGES.PERSON_CREATED_SUCCESSFFULY_TITLE,
        type: "success",
        text: ERROR_MESSAGES.PERSON_CREATED_SUCCESSFFULY,
        background: "white",
      });
      dispatch({ type: REGISTER_USER_RESET });
      if(login?.role=="agent")
      navigate("/agent/personals")
      else
      navigate("/personals");
    }
  }, [dispatch, error, success, navigate]);
  return (
    <div style={{ textTransform: "capitalize" }}>
      <ToastContainer />
      <div className="page-header">
        <h3 className="page-title">Registration Form for Private Users</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Add Users
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Personal Loan Registration
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <span className="reloder"> {loading && <BackdropLoader />}</span>
            <div className="card-body">
              <h4 className="card-title">
                All (<span className="text-danger">*</span>) are required fileds
              </h4>
              <p className="card-description">
                Use necessary form validation before submiting form.
              </p>
              
              <h4 className="card-title">Personal Information</h4>

              <form className="form-sample">
                <p className="card-description"> Personal info </p>
                <div className="row">
                  <Tooltip
                    arrow
                    title="Enter Your Full name Including Last name"
                  >
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Full Name:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            required
                            type="text"
                            name="name"
                            disabled={formSubmitted && loading}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip arrow title="Enter personal email">
                    <div className="col-md-6">
                      <EmailValidator  disabled={formSubmitted && loading} cemail={email} setCemail={setEmail} />
                    </div>
                  </Tooltip>
                </div>
                <div className="row">
                  <Tooltip
                    arrow
                    title="From the provided option choose your Gender"
                  >
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Gender:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            required
                             disabled={formSubmitted && loading}
                            autoComplete="true"
                            className="form-control"
                            name="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                          >
                            <option>Select Gender</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip
                    arrow
                    title="Enter A strong Passoword and make sure it is greater than eight characters.
                                          Password should Contain  Symboles,Capital Letter and Numbers Example:'#AE-bidir'"
                  >
                    <div className="col-md-6">
                      <PasswordValidator
                        compassword={password}
                        setCompassword={setPassword}
                         disabled={formSubmitted && loading}
                      />
                    </div>
                  </Tooltip>
                </div>
                <div className="row">
                  <Tooltip arrow title="Enter Personal phone Number">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Phone Number:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            required
                            type="text"
                             disabled={formSubmitted && loading}
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip
                    arrow
                    title="re-enter Your  password for confirmation"
                  >
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label
                          className="col-sm-3 col-form-label"
                          style={{ whiteSpace: "pre" }}

                        >
                          ConfirmPassword:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            required
                            type="password"
                             disabled={formSubmitted && loading}
                            id="exampleInputPassword1"
                            value={cpassword}
                            onChange={(e) => setcPassword(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                </div>
                <p className="card-description"> TIN Number</p>

                <div className="row">
                  <Tooltip arrow title="Input company's TIN Number">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          TIN Number:{" "}
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="Number"
                            placeholder="TIN Number"
                             disabled={formSubmitted && loading}
                            value={TIN_Number}
                            onChange={(e) => setTIN_Number(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip arrow title="Upload Your Image in jpg format">
                    <HandleLogoChange handleLogoChange={handleLogoChange}  disabled={formSubmitted && loading} />
                  </Tooltip>
                </div>
                <div className="row">
                  <Tooltip arrow title="uploade the rquired credntials">
                    <HandleProductImageChange
                      handleProductImageChange={handleProductImageChange}
                       disabled={formSubmitted && loading}
                    />
                  </Tooltip>
                  {profile ? (
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Image Preview{" "}
                        </label>
                        <div className="col-sm-9">
                          <img
                            className="rounded border border-success"
                            height={"150px"}
                            src={profile}
                            alt="profile"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <br></br>

                <button
                  style={{ width: "150px" }}
                  className="btn btn-primary mr-2"
                  onClick={handleRegister}
                  disabled={formSubmitted&&loading}
                >
                  Create User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Personal;
