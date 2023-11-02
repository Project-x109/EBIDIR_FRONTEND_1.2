import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { INTEREST_RATE } from "../../../Dataset/DataCollections";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clearErrors, registerBank } from "../../../../Actions/UserAction";
import { REGISTER_BANK_RESET } from "../../../../Constants/UserConstants";
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
  PasswordValidator,
  EmailValidator,
} from "./errorConstants";
import HandleLogoChange from "./handlelogoChange";
const remove = (e) => {
  var x = document.getElementById(e?.name)?.remove();
};

const Bank = () => {
  //setup
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bsuccess, berror, loading } = useSelector((state) => state.newbank);
  // data collection
  const [bank_name, setbank_name] = useState();
  const [bank_email, setbank_email] = useState("");
  const [bank_password, setbank_password] = useState("");
  const [company_confirmpassword, setcompany_confirmpassword] = useState();
  const [bank_phonenumber, setbank_phonenumber] = useState();
  const [logo, setlogo] = useState();
  const [rate, setRate] = useState();
  const [type, setType] = useState();
  const [loanType, setLoanType] = useState([]);
  const Bank = Object.keys(INTEREST_RATE[0]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleLogoChange = (newProfile) => {
    setlogo(newProfile);
  };
  const handleRegister = (e) => {
    e.preventDefault();

    if (!bank_name) {
      toast.error(ERROR_MESSAGES.BANK_NAME_REQUIRED);
      return;
    } else if (!alpahbet.test(bank_name)) {
      toast.error(ERROR_MESSAGES.BANK_NAME_ALPHABETS_ONLY);
      return;
    } else if (!bank_email) {
      toast.error(ERROR_MESSAGES.EMAIL_REQUIRED);
      return;
    } else if (!logo) {
      toast.error(ERROR_MESSAGES.LOGO_NOT_UPLOADED);
      return;
    } else if (bank_password.length < 8) {
      toast.error(ERROR_MESSAGES.SHORT_PASSWORD);
      return;
    } else if (bank_password.length > 50) {
      toast.error(ERROR_MESSAGES.LONG_PASSWORD);
      return;
    } else if (bank_password !== company_confirmpassword) {
      toast.error(ERROR_MESSAGES.MISMATCH_PASSWORD);
      return;
    } else if (!validEmailRegex.test(bank_email)) {
      toast.error(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    } else if (bank_email.length < 10) {
      toast.error(ERROR_MESSAGES.EMAIL_TOO_SHORT);
      return;
    } else if (bank_email.length > 320) {
      toast.error(ERROR_MESSAGES.EMAIL_TOO_LONG);
      return;
    } else if (bank_phonenumber?.length !== 10) {
      toast.error(ERROR_MESSAGES.INVALID_PHONE_LENGTH);
      return;
    } else if (!validPhoneRegex.test(bank_phonenumber)) {
      toast.error(ERROR_MESSAGES.INVALID_PHONE);
      return;
    } else if (!type) {
      toast.error(ERROR_MESSAGES.LOAN_TYPE_REQUIRED);
      return;
    } else if (!rate) {
      toast.error(ERROR_MESSAGES.INTEREST_RATE_REQUIRED);
      return;
    } else if (rate <= 0 || rate > 1) {
      toast.error(ERROR_MESSAGES.INTEREST_RATE_RANGE);
      return;
    }
    const dataCollected = {
      bank_name,
      bank_email,
      bank_password,
      bank_phoneNo: bank_phonenumber,
      logo,
      loan_types: loanType,
    };
    dispatch(registerBank(dataCollected));
    setFormSubmitted(true);
  };
  useEffect(() => {
    if (berror) {
      Swal.fire({
        title: "Error While Creating Account",
        type: "error",
        text: "Error Occured: " + berror,
        background: "pink",
      });
      dispatch(clearErrors());
    }
    if (bsuccess) {
      Swal.fire({
        title: ERROR_MESSAGES.CREATED_SUCCESSFFULY_TITLE,
        type: "success",
        text: ERROR_MESSAGES.BANK_CREATED_SUCCESSFFULY,
        background: "white",
      });
      dispatch({ type: REGISTER_BANK_RESET });
      navigate("/banks");
    }
  }, [dispatch, berror, bsuccess, navigate]);

  const onAddBtnClick = () => {
    var unique = true;
    if (!rate) {
      toast.error(ERROR_MESSAGES.INTEREST_RATE_REQUIRED);
      return;
    } else if (rate <= 0 || rate > 1) {
      toast.error(ERROR_MESSAGES.INTEREST_RATE_RANGE);
      return;
    }
    loanType.forEach((element) => {
      if (element.type == type) unique = false;
    });
    if (unique && type && rate)
      setLoanType((arr) => [...arr, { type: type, rate: rate }]);
  };
  const TypeOfLoan = [
    "Personal loan",
    "Mortgage",
    "Student loan",
    "Auto loan",
    "Payday loan",
    "Pawn shop loan",
    "Small business loan",
    "Credit builder loan",
    "Debt consolidation loan",
    "Holiday loan",
    "Home improvement loan",
    "Medical loan",
    "Vacation loan",
    "Wedding loan",
    "Recreation vehicle and boat loans",
    "Pool loan",
    "Family loan",
  ];
  const render = () => {
    return loanType.map((item, key) => {
      return (
        <div
          style={{
            marginLeft: "2.5px",
            width: "100%",
            backgroundColor: "#aad176",
          }}
          className="row mb-2"
          id={key}
        >
          {" "}
          <div className="col-sm-7 bg-prim ary">{item.type}</div>
          <div className=" col-sm-4 bg-su ccess">{item.rate}</div>
          <div className="col-sm-1 text-danger">
            <button
              className="btn btn-danger"
              type="button"
              name={key}
              value={item.Type}
              onClick={(e) => remove(e)}
            >
              x
            </button>
          </div>
        </div>
      );
    });
  };
  const remove = (e) => {
    document.getElementById(e.target.name).classList.add("d-none");
    setLoanType(loanType.filter((el) => el.Type !== e.target.value)); // filter by id
  };
  return (
    <div style={{ textTransform: "capitalize" }}>
      <ToastContainer />
      <div className="page-header">
        <h3 className="page-title">Registration Form for Bank Users</h3>
        <nav className="displaynonnform" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Add Users
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Bank Registration
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
              <h4 className="card-title">Bank Information</h4>
              <form className="form-sample">
                <p className="card-description"> Bank info </p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Bank Name:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Bank"
                          title="Enter the name of the bank to be Registered"
                          options={Bank}
                          disabled={formSubmitted && loading}
                          className="bank-autocomplete"
                          value={bank_name}
                          onChange={(e, value) => setbank_name(value)}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="bank_name"
                              {...params}
                              variant="standard"
                              disabled={formSubmitted && loading}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                              className="form-control addpadding13"
                              color="warning"
                              sx={{ input: { color: "#343434" } }}
                            />
                          )}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <EmailValidator
                      disabled={formSubmitted && loading}
                      cemail={bank_email}
                      setCemail={setbank_email}
                    />
                  </div>
                </div>
                <div className="row">
                  <HandleLogoChange
                    disabled={formSubmitted && loading}
                    handleLogoChange={handleLogoChange}
                  />
                  <div className="col-md-6">
                    <PasswordValidator
                      disabled={formSubmitted && loading}
                      compassword={bank_password}
                      setCompassword={setbank_password}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Phone Number:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          required
                          disabled={formSubmitted && loading}
                          type="text"
                          name="bank_phonenumber"
                          title="Input the Banks phone Number"
                          onChange={(e) => setbank_phonenumber(e.target.value)}
                          value={bank_phonenumber}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label addding-wihitespace">
                        ConfirmPassword:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          required
                          disabled={formSubmitted && loading}
                          type="password"
                          name="company_confirmpassword"
                          title="re-enter the main password for confirmation"
                          id="exampleInputPassword1"
                          onChange={(e) =>
                            setcompany_confirmpassword(e.target.value)
                          }
                          value={company_confirmpassword}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label addding-wihitespace">
                        Loan Types: <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        {render()}
                        <div className="row">
                          <div className="col-lg-7">
                            <select
                              className="form-control"
                              name="type"
                              disabled={formSubmitted && loading}
                              onChange={(e) => setType(e.target.value)}
                            >
                              <option value={""}>Select one</option>
                              {TypeOfLoan.map((item) => {
                                return <option value={item}>{item}</option>;
                              })}
                            </select>
                          </div>
                          <div className="col-lg-2">
                            <input
                              type="text"
                              name="rate"
                              disabled={formSubmitted && loading}
                              class="form-control object-fit-fill"
                              placeholder="0.8"
                              onChange={(e) => setRate(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-2">
                            <button
                              type="button"
                              style={{ height: "2.2em" }}
                              onClick={onAddBtnClick}
                              disabled={formSubmitted && loading}
                              class="input-group-text btn text-white bg-primary m-0"
                              id="basic-addon2"
                            >
                              Add Item
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <button
                  style={{ width: "150px" }}
                  onClick={handleRegister}
                  className="btn btn-primary mr-2"
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
export default Bank;
