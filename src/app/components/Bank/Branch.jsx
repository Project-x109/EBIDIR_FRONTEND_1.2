import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Autocomplete, TextField } from "@mui/material";
import { INTEREST_RATE } from "../../Dataset/DataCollections";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBankDetails,
  getUser,
  registerBranch,
  clearErrors,
  getAllBanks,
} from "../../../Actions/UserAction";
import BackdropLoader from "../common/BackdropLoader";
import { REGISTER_BRANCH_RESET } from "../../../Constants/UserConstants";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Admin/forms/forms.css";
import {
  ERROR_MESSAGES,
  validEmailRegex,
  validPhoneRegex,
  alpahbet,
  PasswordValidator,
  EmailValidator,
} from "../Admin/forms/errorConstants";
const Branch = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { banks } = useSelector((state) => state.banks);
  const { mybank } = useSelector((state) => state.mybank);
  const { login } = useSelector((state) => state.login);
  const [role, setrole] = useState(login && login.role);
  // const { loading } = useSelector((state) => state.newbank);
  const [bank_name, setbank_name] = useState();
  const [branch_name, setbranch_name] = useState();
  const [branch_email, setbranch_email] = useState("");
  const [branch_password, setbranch_password] = useState("");
  const [branch_confirmpassword, setbranch_confirmpassword] = useState();
  const [branch_phoneNo, setbranch_phoneNo] = useState();
  const [manager, setmanager] = useState();
  const [location, setLocation] = useState();
  const Bank = Object.keys(INTEREST_RATE[0]);
  const { success, error, loading } = useSelector((state) => state.newbranch);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  //////////////////////////////////
  useEffect(() => {
    dispatch(getBankDetails());
    dispatch(getUser());
    dispatch(getAllBanks());
  }, [dispatch]);

  const bankData = [];
  banks &&
    Array.isArray(banks) &&
    banks.forEach((item) => {
      bankData.unshift({
        bank_name: item.bank_name,
      });
    });
  useEffect(() => {
    if (mybank) {
      setbank_name(mybank && mybank.bank_name);
    }
  }, [user, mybank]);
  useEffect(() => {
    if (login) {
      setrole(login && login.role);
    }
  }, [user, login]);
  // validation and database
  const handleRegister = (e) => {
    e.preventDefault();

    if (!bank_name) {
      toast.error(ERROR_MESSAGES.EMPTY_BANK_NAME);
      return;
    } else if (!branch_name) {
      toast.error(ERROR_MESSAGES.EMPTY_BRANCH_NAME);
      return;
    } else if (!branch_email) {
      toast.error(ERROR_MESSAGES.EMPTY_BRANCH_EMAIL);
      return;
    } else if (!manager) {
      toast.error(ERROR_MESSAGES.EMPTY_MANAGER);
      return;
    } else if (!branch_phoneNo) {
      toast.error(ERROR_MESSAGES.EMPTY_PHONE);
      return;
    } else if (!location) {
      toast.error(ERROR_MESSAGES.EMPTY_LOCATION);
      return;
    } else if (!alpahbet.test(bank_name)) {
      toast.error(ERROR_MESSAGES.INVALID_BANK_NAME);
      return;
    } else if (!alpahbet.test(branch_name)) {
      toast.error(ERROR_MESSAGES.INVALID_BRANCH_NAME);
      return;
    } else if (branch_email.length < 10) {
      toast.error(ERROR_MESSAGES.EMAIL_TOO_SHORT);
      return;
    } else if (branch_email.length > 320) {
      toast.error(ERROR_MESSAGES.EMAIL_TOO_LONG);
      return;
    } else if (branch_password !== branch_confirmpassword) {
      toast.error(ERROR_MESSAGES.MISMATCH_PASSWORD);
      return;
    } else if (!validEmailRegex.test(branch_email)) {
      toast.error(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    } else if (branch_phoneNo?.length !== 10) {
      toast.error(ERROR_MESSAGES.INVALID_PHONE_LENGTH);
      return;
    } else if (!validPhoneRegex.test(branch_phoneNo)) {
      toast.error(ERROR_MESSAGES.INVALID_PHONE);
      return;
    }

    dispatch(
      registerBranch({
        bank_name,
        branch_name,
        branch_email,
        branch_password,
        branch_phoneNo,
        manager,
        location,
      })
    );
    setFormSubmitted(true)
  };

  useEffect(() => {
    dispatch(getBankDetails());
    dispatch(getUser());
    dispatch(getAllBanks());

    return () => {
      dispatch({ type: REGISTER_BRANCH_RESET });
      dispatch(clearErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        title: ERROR_MESSAGES.CREATED_SUCCESSFFULY_TITLE,
        type: "success",
        text: ERROR_MESSAGES.BRANCH_CREATED_SUCCESSFFULY,
        background: "white",
      });

      navigate(role == "admin" ? "/availableBranches" : "/bank/branchlists");
    }
    if (error) {
      Swal.fire({
        title: "Error While Creating Account",
        type: "error",
        text: error,
        background: "pink",
      });
    }
  }, [success, error, dispatch, navigate]);
  return (
    <div>
      <ToastContainer />
      <div className="page-header">
        <h3 className="page-title">Registration Form for Branch</h3>
        <nav className="displaynonnform" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Add Users
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Branch Registration
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
              <h4 className="card-title">Branch Information</h4>
              <form className="form-sample">
                <p className="card-description"> Bank info </p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Bank Name:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        {role == "admin" ? (
                          <Autocomplete
                            required
                            id="Bank"
                            title="Enter the name of the bank to be Registered"
                            options={bankData}
                            getOptionLabel={(option) => option?.bank_name || ""}
                            className="bank-autocomplete"
                            value={bank_name}
                            onChange={(e, value) =>
                              setbank_name(value ? value.bank_name : "")
                            }
                            isOptionEqualToValue={(option, value) =>
                              option.bank_name === value.bank_name
                            }
                            disabled={formSubmitted}
                            noOptionsText={"No Available Data"}
                            renderInput={(params) => (
                              <TextField
                                required
                                name="bank_name"
                                {...params}
                                variant="standard"
                                InputProps={{
                                  ...params.InputProps,
                                  disableUnderline: true,
                                }}
                                disabled={formSubmitted}
                                className="form-control addpadding13"
                                color="warning"
                                sx={{ input: { color: "#343434" } }}
                              />
                            )}
                          />
                        ) : (
                          <Form.Control
                            required
                            type="text"
                            name="bank_name"
                            onChange={(e) => setbank_name(e.target.value)}
                            value={mybank && mybank.bank_name}
                            readOnly
                            disabled={formSubmitted}
                          />
                        )}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Branch Name:
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          required
                          type="text"
                          name="branch_name"
                          title="Branch Name"
                          className="form-control visibility-hidden"
                          id="branch_name"
                          onChange={(e) => setbranch_name(e.target.value)}
                          disabled={formSubmitted}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <EmailValidator
                      cemail={branch_email}
                      setCemail={setbranch_email}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Manager Name:
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          required
                          type="text"
                          name="manager"
                          title="Upload the bank's Logo"
                          style={{ paddingTop: "5px" }}
                          className="form-control visibility-hidden"
                          id="customFileLang"
                          lang="es"
                          onChange={(e) => setmanager(e.target.value)}
                          disabled={formSubmitted}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <PasswordValidator
                      compassword={branch_password}
                      setCompassword={setbranch_password}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Phone Number:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          required
                          type="text"
                          name="branch_phoneNo"
                          title="Input the Branch phone Number"
                          onChange={(e) => setbranch_phoneNo(e.target.value)}
                          value={branch_phoneNo}
                          disabled={formSubmitted}
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
                          type="password"
                          name="branch_confirmpassword"
                          title="re-enter the main password for confirmation"
                          id="exampleInputPassword1"
                          onChange={(e) =>
                            setbranch_confirmpassword(e.target.value)
                          }
                          value={branch_confirmpassword}
                          disabled={formSubmitted}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label
                        className="col-sm-3 col-form-label"
                        style={{ whiteSpace: "pre" }}
                      >
                        Location :<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          required
                          type="text"
                          name="location"
                          title="branch location"
                          id="location"
                          onChange={(e) => setLocation(e.target.value)}
                          value={location}
                          disabled={formSubmitted}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <br></br>
                <button
                  style={{ width: "150px" }}
                  type="submit"
                  onClick={handleRegister}
                  disabled={formSubmitted}
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
export default Branch;
