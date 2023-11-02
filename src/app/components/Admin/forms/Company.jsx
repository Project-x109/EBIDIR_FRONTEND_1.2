import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { clearErrors, registerCompany } from "../../../../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_COMPANY_RESET } from "../../../../Constants/UserConstants";
import { useNavigate } from "react-router-dom";
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
const Company = () => {
  //setups
  const { loading, csuccess, cerror } = useSelector(
    (state) => state.newcompany
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // data collection
  const [cname, setCname] = useState();
  const [General_Manager, setGeneral_Manager] = useState();
  const [cemail, setcemail] = useState("");
  const [cphoneNo, setcphoneNo] = useState("");
  const [legal_status, setlegal_status] = useState();
  const [compassword, setcompassword] = useState("");
  const [ccompassword, setccompassword] = useState();
  const [CTIN_Number, setCTIN_Number] = useState();
  const [sector, setSector] = useState();
  const [logo, setLogo] = useState();
  const [scannedFiles, setScannedFiles] = useState([]);
  const { login } = useSelector((state) => state.login);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // for profile pic
  const handleLogoChange = (newProfile) => {
    setLogo(newProfile);
  };
  // for scanned documents
  const handleProductImageChange = (newScannedFile) => {
    setScannedFiles((oldfiles) => [...oldfiles, newScannedFile]);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (!cname) {
      toast.error(ERROR_MESSAGES.EMPTY_COMPANY_NAME);
      return;
    } else if (!alpahbet.test(cname)) {
      toast.error(ERROR_MESSAGES.INVALID_COMPANY_NAME);
      return;
    } else if (cemail.length === 0) {
      toast.error(ERROR_MESSAGES.EMPTY_FILE);
      return;
    } else if (!validEmailRegex.test(cemail)) {
      toast.error(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    } else if (cemail.length < 10) {
      toast.error(ERROR_MESSAGES.EMAIL_TOO_SHORT);
      return;
    } else if (cemail.length > 320) {
      toast.error(ERROR_MESSAGES.EMAIL_TOO_LONG);
      return;
    } else if (!legal_status) {
      toast.error(ERROR_MESSAGES.EMPTY_LEGAL_STATUS);
      return;
    } else if (compassword.length < 8) {
      toast.error(ERROR_MESSAGES.SHORT_PASSWORD);
      return;
    } else if (compassword.length > 50) {
      toast.error(ERROR_MESSAGES.LONG_PASSWORD);
      return;
    } else if (!compassword) {
      toast.error(ERROR_MESSAGES.EMPTY_PASSWORD);
      return;
    } else if (compassword !== ccompassword) {
      toast.error(ERROR_MESSAGES.MISMATCH_PASSWORD);
      return;
    } else if (cphoneNo?.length !== 10) {
      toast.error(ERROR_MESSAGES.INVALID_PHONE_LENGTH);
      return;
    } else if (!validPhoneRegex.test(cphoneNo)) {
      toast.error(ERROR_MESSAGES.INVALID_PHONE);
      return;
    } else if (!General_Manager) {
      toast.error(ERROR_MESSAGES.EMPTY_MANAGER_NAME);
      return;
    } else if (!alpahbet.test(General_Manager)) {
      toast.error(ERROR_MESSAGES.INVALID_MANAGER_NAME);
      return;
    } else if (!sector) {
      toast.error(ERROR_MESSAGES.EMPTY_SECTOR);
      return;
    } else if (!CTIN_Number) {
      toast.error(ERROR_MESSAGES.EMPTY_TIN);
      return;
    } else if (CTIN_Number?.length !== 10) {
      toast.error(ERROR_MESSAGES.Ten_TIN);
      return;
    } else if (dotremoval.test(CTIN_Number)) {
      toast.error(ERROR_MESSAGES.INVALID_TIN_DECIMAL);
      return;
    } else if (CTIN_Number < 0) {
      toast.error(ERROR_MESSAGES.INVALID_TIN_NEGATIVE);
      return;
    }
    const dataCollected = {
      cname,
      General_Manager,
      cemail,
      cphoneNo,
      legal_status,
      compassword,
      CTIN_Number,
      sector,
      logo,
      scannedFiles,
    };
    dispatch(registerCompany(dataCollected));
    setFormSubmitted(true);
  };
  useEffect(() => {
    if (cerror) {
      Swal.fire({
        title: "Error While Creating Account",
        type: "error",
        text: "Error Occured: " + cerror,
        background: "pink",
      });
      dispatch(clearErrors());
    }
    if (csuccess) {
      Swal.fire({
        title: ERROR_MESSAGES.CREATED_SUCCESSFFULY_TITLE,
        type: "success",
        text: ERROR_MESSAGES.COMPANY_CREATED_SUCCESSFFULY,
        background: "white",
      });
      dispatch({ type: REGISTER_COMPANY_RESET });
      if (login?.role == "agent") navigate("/agent/companies");
      else navigate("/companies");
    }
  }, [dispatch, cerror, csuccess, navigate]);

  return (
    <div style={{ textTransform: "capitalize" }}>
      <ToastContainer />
      <div className="page-header">
        <h3 className="page-title">Registration Form for Company Users</h3>
        <nav className="displaynonnform" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Add Users
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Company Loan Registration
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
                All (<span className="text-danger">*</span>) are required Fields
              </h4>
              <p className="card-description">
                Use necessary form validation before submiting form and Hover on
                Input fields for More Inofrmation
              </p>
              <h4 className="card-title">Company Information</h4>
              <form className="form-sample">
                <p className="card-description"> Company info </p>
                <div className="row">
                  <Tooltip arrow title="Input the company's Name">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Company Name:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            name="Company_name"
                            type="text"
                            required
                            onChange={(e) => setCname(e.target.value)}
                            value={cname}
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip arrow title="Input Company's Email">
                    <div className="col-md-6">
                      <EmailValidator cemail={cemail} setCemail={setcemail} />
                    </div>
                  </Tooltip>
                </div>
                <div className="row">
                  <Tooltip arrow title="Input Comapny's Legal Status">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Legal Status:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            autoComplete="true"
                            required
                            name="Legal_Status"
                            className="form-control"
                            onChange={(e) => setlegal_status(e.target.value)}
                            value={legal_status}
                            disabled={formSubmitted && loading}
                          >
                            <option>Select Legal Status</option>
                            <option value={"Sole Proprietorship"}>
                              Sole Proprietorship
                            </option>
                            <option value={"General Partnership"}>
                              General Partnership
                            </option>
                            <option value={"Limited Liability Company (LLC)"}>
                              Limited Liability Company (LLC)
                            </option>
                            <option value={"Corporations"}>Corporations</option>
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
                        compassword={compassword}
                        setCompassword={setcompassword}
                        disabled={formSubmitted && loading}
                      />
                    </div>
                  </Tooltip>
                </div>
                <div className="row">
                  <Tooltip arrow title="Enter the Companies phone Number">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Phone Number:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            required
                            type="text"
                            name="company_phonenumber"
                            onChange={(e) => setcphoneNo(e.target.value)}
                            value={cphoneNo}
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title="Re-enter your password for confirmation"
                    arrow
                  >
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label addding-wihitespace">
                          ConfirmPassword:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            required
                            type="password"
                            name="company_confirmpassword"
                            id="exampleInputPassword1"
                            onChange={(e) => setccompassword(e.target.value)}
                            value={ccompassword}
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip
                    arrow
                    title="Insert the company's General manager Full Name"
                  >
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Name of GM:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            required
                            type="text"
                            name="General_Manager"
                            onChange={(e) => setGeneral_Manager(e.target.value)}
                            value={General_Manager}
                            disabled={formSubmitted && loading}
                            placeholder="Enter the name of the Company's General Manager"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip arrow title="Select the working area of the company">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Sector:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            autoComplete="true"
                            required
                            name="Sector"
                            className="form-control"
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            disabled={formSubmitted && loading}
                          >
                            <option>Select Companies workink Sector</option>
                            <option value={"Agriculture"}>Agriculture</option>
                            <option value={"Basic Metal Production"}>
                              Basic Metal Production
                            </option>
                            <option value={"Chemical industries"}>
                              Chemical industries
                            </option>
                            <option value={"Commerce"}>Commerce</option>
                            <option value={"Construction"}>Construction</option>
                            <option value={"Education"}>Education</option>
                            <option value={"Financial services"}>
                              Financial services
                            </option>
                            <option value={"Food and drink"}>
                              Food and drink
                            </option>
                            <option value={"Forestry"}>Forestry</option>
                            <option value={"Health services"}>
                              Health services
                            </option>
                            <option value={"Hotels"}>Hotels</option>
                            <option value={"Mining"}>Mining</option>
                            <option
                              value={"Mechanical and electrical engineering"}
                            >
                              Mechanical and electrical engineering
                            </option>
                            <option value={"Media; culture; graphical"}>
                              Media; culture; graphical
                            </option>
                            <option value={"Oil and gas production"}>
                              Oil and gas production
                            </option>
                            <option
                              value={"Postal and telecommunications services"}
                            >
                              Postal and telecommunications services
                            </option>
                            <option value={"Public service"}>
                              Public service
                            </option>
                            <option value={"Shipping"}>Shipping</option>
                            <option value={"Textiles"}>Textiles</option>
                            <option value={"Transport"}>Transport</option>
                            <option value={"Transport equipment manufacturing"}>
                              Transport equipment manufacturing
                            </option>
                            <option value={"Utilities"}>Utilities</option>
                          </select>
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
                          TIN Number:<span className="text-danger">*</span>{" "}
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            required
                            type="Number"
                            name="company_TIN_Number"
                            placeholder="TIN Number"
                            onChange={(e) => setCTIN_Number(e.target.value)}
                            value={CTIN_Number}
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip
                    arrow
                    title="Upload image or logo of company if there is any"
                  >
                    <Tooltip arrow title="Upload Your Image in jpg format">
                      <HandleLogoChange handleLogoChange={handleLogoChange} />
                    </Tooltip>
                  </Tooltip>
                </div>

                <div className="row">
                  <Tooltip arrow title="uploade the rquired credntials">
                    <HandleProductImageChange
                      disabled={formSubmitted && loading}
                      handleProductImageChange={handleProductImageChange}
                    />
                  </Tooltip>
                </div>
                <br></br>
                <button
                  style={{ width: "150px" }}
                  onClick={handleRegister}
                  className="btn btn-primary mr-2"
                  disabled={formSubmitted && loading}
                >
                  Create User
                </button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {/*<button style={{ width:'100px' }} className="btn btn-dark" onClick={handleRegister}>Next</button>*/}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Company;
