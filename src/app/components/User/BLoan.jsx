import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Autocomplete, TextField } from "@mui/material";
import { INTEREST_RATE } from "../../Dataset/DataCollections";
import { useDispatch, useSelector } from "react-redux";
import { addBLoan } from "../../../Actions/LoanAction";
import Swal from "sweetalert2";
import { clearErrors } from "../../../Actions/UserAction";
import { NumericFormat } from "react-number-format";
import { REGISTER_BLOAN_REST } from "../../../Constants/LoanConstants";
import BackdropLoader from "../common/BackdropLoader";
import styles from "../User/pages/Modal.module.css";
import "./Buton.css";
import BranchLoader from "../common/BranchLoader";
import { getAllBanks } from "../../../Actions/UserAction";
import { getBranchByBank } from "../../../Actions/UserAction";
import { getBLoan } from "../../../Actions/LoanAction";
import { getStatus } from "../../../Actions/SystemAction";
import { GET_APPLICATIONSTATUS_RESET } from "../../../Constants/SystemConstants";
import toast, { Toaster } from "react-hot-toast";
const currentcyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "ETB",
});
const LoanInfoBusinessLoan = () => {
  const Banks = Object.keys(INTEREST_RATE[0]);
  const Type = [
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
  const Collateral = ["Car", "Building", "Car,Building"];
  const Collateral2 = ["Vehicle", "Building", "vehicles,Building"];
  const textRef = React.useRef();

  React.useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "0px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bankBranches, fetching } = useSelector((state) => state.bankBranches);
  const { mybloan } = useSelector((state) => state.mybloan);
  const { banks } = useSelector((state) => state.banks);
  const [Reason_for_loan, setReason_for_loan] = useState();
  const { LoanSuccess, LoanError, loading } = useSelector(
    (state) => state.bloan
  );
  const { status } = useSelector((state) => state.status);
  const [loan_amount, setloan_amount] = useState();
  const [branch, setbranch] = useState("");
  const [Type_Of_Loan, setType_Of_Loan] = useState();
  const [Bank, setBank] = useState();
  const [Loan_Payment_Period, setLoan_Payment_Period] = useState();
  const [Types_of_Collateral1, setTypes_of_Collateral] = useState();
  const [interest, setinterest] = useState();
  const [BRANCH, setBRANCH] = useState([]);
  const [LOANTYPE, setLOANTYPE] = useState([]);
  const [show, setShow] = useState(true);
  const [hidden1, setHidden1] = useState("");
  const [hidden2, setHidden2] = useState("d-none");
  const [count, setCount] = useState(0);
  const [interested] = useState(interest / 12 + 1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [Monthly_payment, setMonthly_payment] = useState(
    (loan_amount *
      ((interest / 12) * Math.pow(interested, Loan_Payment_Period))) /
      (Math.pow(interested, Loan_Payment_Period) - 1)
  );

  const handleBank = (value) => {
    setBank(value);
    setbranch(""); // Clear the selected branch value(""); // Clear the selected branch value
    dispatch(getBranchByBank({ bank_name: value }));
  };
  useEffect(() => {
    dispatch(getAllBanks());
  }, [dispatch]);
  useEffect(() => {
    let branchs = [];
    for (let branch of bankBranches) {
    branchs[branch.branch_name +"("+branch.location + ")"]=branch._id;
    }
    setBRANCH(branchs);
  }, [Bank, fetching]);
  const dotremoval = RegExp(/([.])\w+/);
  useEffect(() => {
    if (Bank) {
      if (loan_amount && Loan_Payment_Period) {
        let I = interest / 12 + 1;
        let B =
          (loan_amount * ((interest / 12) * Math.pow(I, Loan_Payment_Period))) /
          (Math.pow(I, Loan_Payment_Period) - 1);

        setMonthly_payment(B);
      }
    }
  }, [navigate, Bank, interest, Loan_Payment_Period, loan_amount]);
  const [loanAmountError, setLoanAmountError] = useState("");
  const handleLoanAmountValidation = () => {
    const minValue = 1000;
    const sanitizedLoanAmount = loan_amount;

    if (isNaN(sanitizedLoanAmount) || sanitizedLoanAmount <= minValue) {
      setLoanAmountError(
        `Please enter a valid loan amount greater than ${minValue}`
      );
    } else {
      setLoanAmountError("");
    }
  };

  const handleChangeLoanAmount = (values) => {
    const { formattedValue, floatValue } = values;
    setloan_amount(floatValue);
  };
  const LoanSubmit = (e) => {
    e.preventDefault();
    handleLoanAmountValidation();
    if (!loan_amount) {
      Swal.fire({
        title: "Loan Amount Not Entered",
        type: "error",
        text: "loan amount must be Number and greater than Zero",
        background: "pink",
        timer: 3000,
      });
      return;
    }

    if (loan_amount < 1000) {
      Swal.fire({
        title: "Loan Amount Not Valid",
        type: "error",
        text: "Minimum amount of loan you can request is 1000ETB",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    dispatch(
      addBLoan({
        loan_amount,
        Reason_for_loan,
        Loan_Payment_Period,
        Bank,
        Branch:BRANCH[branch],
        Type_Of_Loan,
        Types_of_Collateral:
          Collateral[Collateral2.indexOf(Types_of_Collateral1)],
        Monthly_payment,
        interest,
      })
    );
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (LoanError) {
      Swal.fire({
        title: "" + LoanError,
        type: "error",
        text: "Eror Occured: " + LoanError,
        background: "pink",
        timer: 3000,
      });
      dispatch(clearErrors());
    }
    if (LoanSuccess) {
      localStorage.setItem(
        "collateral",
        Collateral2.indexOf(Types_of_Collateral1)
      );
      Swal.fire({
        title: "Loan information Created",
        type: "success",
        text: "Loan information Created successfully",
        background: "white",
        timer: 3000,
      });

      dispatch({ type: REGISTER_BLOAN_REST });
      navigate(
        "/company/economic/" +
          Collateral[Collateral2.indexOf(Types_of_Collateral1)].replace(
            ",",
            "_"
          )
      );
    }
  }, [dispatch, LoanError, LoanSuccess, Types_of_Collateral1, navigate]);
  useEffect(() => {
    localStorage.setItem(
      "collateral",
      Collateral2.indexOf(Types_of_Collateral1)
    );
  }, [Types_of_Collateral1]);

  useEffect(() => {
    const the_bank = banks.find((item) => item.bank_name == Bank);
    const loantypes = the_bank?.loan_types;
    const TypeRate = [];
    if (Array.isArray(loantypes))
      loantypes.map((item) => {
        TypeRate[item.type] = item.rate;
      });
    setLOANTYPE(TypeRate);
  }, [Bank]);

  useEffect(() => {
    dispatch(getStatus());
    if (status?.next)
      if (show) {
        Swal.fire({
          title: "Resume Last Application",
          text: "Would You Like To Resume Last Application!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
            navigate(status.next);
            dispatch({ type: GET_APPLICATIONSTATUS_RESET });
          }
        });
        setShow(!show);
      }
  }, [dispatch, navigate]);

  const hide = () => {
    setHidden1("d-none");
    setHidden2("");
    toast.success("Term accepted Successfully!");
  };
  useEffect(() => {
    dispatch(getBLoan());
  }, [dispatch]);

  useEffect(() => {
    var date = new Date().toISOString().substring(2, 10);
    let c = 0;
    Array.isArray(mybloan) &&
      mybloan.map((item) => {
        var newDate = new Date(item.createdAt).toISOString().substring(2, 10);
        if (date === newDate) c++;
      });
    setCount(c);
  }, [mybloan]);
  const bankData = [];
  banks &&
    Array.isArray(banks) &&
    banks.forEach((item) => {
      bankData.unshift({
        bank_name: item.bank_name,
      });
    });

  return (
    <div>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
          {fetching && !bankBranches && <BranchLoader />}
        </div>
      )}
      <Toaster position="bottom-right" />
      <h1 id={styles.headers}>Loan Information</h1>
      <div className={styles.imageremover}>
        <div className="page-header">
          <h3 id={styles.headers} className="page-title">
            Business Loan Requestion
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Request Loan
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Loan Information
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div
        id="cardRoot"
        class={`mx-auto  flex h-full w-full text-center py-8 items-center justify-center  py-10 ${hidden1}`}
      >
        <div class="header">
          <div class="image">
            <svg
              aria-hidden="true"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
          <div class="content">
            <span class="title">Limits On Loan Application</span>
            <p class="message">
              To make it more feasible environment there is limit on the number
              of loans the you can apply.
            </p>

            <p class="message">
              Number of Loans you have applied today is
              <span class="title">{count}</span>.
            </p>
            <p class="message">
              If your number of applications is more than allowed amount we will
              have to suspend your account.
            </p>
          </div>
          <div class="actions">
            <button class="desactivate" type="button" onClick={() => hide()}>
              Accept{hidden1}
            </button>
            <Link to={"/user/dashboard"} class="cancel" type="button">
              Deny
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 grid-margin">
          <div className={`card ${hidden2}`}>
            <div className="card-body">
              <h4 className="card-title">
                All (<span className="text-danger">*</span>) are required Fields
              </h4>
              <p className="card-description">
                Use necessary form validation before submiting form and Hover on
                Input fields for More Inofrmation
              </p>
              <h4 className="card-title">Loan Information</h4>
              <form className="form-sample" onSubmit={LoanSubmit}>
                <p className="card-description"> Loan info </p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Loan Amount:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <NumericFormat
                          allowLeadingZeros
                          thousandSeparator=","
                          valueIsNumericString={true}
                          className={`form-control disabledNumeric ${
                            loanAmountError && "is-invalid"
                          }`}
                          ref={textRef}
                          required
                          disabled={formSubmitted && loading}
                          name="loan_amount"
                          placeholder={currentcyFormat.format("")}
                          //onChange={(e) => setloan_amount(e.target.value)}
                          value={loan_amount}
                          onValueChange={handleChangeLoanAmount}
                          onBlur={handleLoanAmountValidation}
                        />
                        {loanAmountError && (
                          <div className="invalid-feedback">
                            {loanAmountError}
                          </div>
                        )}
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label
                        style={{ whiteSpace: "pre" }}
                        className="col-sm-3 col-form-label"
                      >
                        Payemnt Period:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          min={1}
                          max={600}
                          step={1}
                          disabled={formSubmitted && loading}
                          type="number"
                          className="form-control addpadding13"
                          required
                          name="Loan_Payment_Period"
                          onChange={(e) =>
                            setLoan_Payment_Period(e.target.value)
                          }
                          value={Loan_Payment_Period}
                        />
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Bank:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Bank"
                          // options={Banks}
                          //value={Bank}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          options={bankData}
                          getOptionLabel={(option) => option?.bank_name || ""}
                          value={Bank}
                          onChange={(e, value) =>
                            handleBank(value ? value.bank_name : "")
                          }
                          disabled={formSubmitted && loading}
                          noOptionsText={"No Available Data"}
                          renderInput={(params) => (
                            <TextField
                              required
                              title="Select Bank"
                              name="Bank"
                              {...params}
                              variant="standard"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                              disabled={formSubmitted && loading}
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
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Branch:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Branch"
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          options={Object.keys(BRANCH)}
                          value={branch}
                          onChange={(e, value) => setbranch(value)}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="branch"
                              {...params}
                              variant="standard"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                              className="form-control addpadding13"
                              color="warning"
                              sx={{ input: { color: "#343434" } }}
                            />
                          )}
                          disabled={!Bank || (formSubmitted && loading)} // Disable the branch field when bank is not selected
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Type of Loan:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Type_Of_Loan"
                          onChange={(e, value) => {
                            setType_Of_Loan(value);
                            setinterest(LOANTYPE[value]);
                          }}
                          options={Object.keys(LOANTYPE)}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Type_Of_Loan"
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
                    <Form.Group className="row">
                      <label
                        style={{ whiteSpace: "pre" }}
                        className="col-sm-3 col-form-label"
                      >
                        Collateral Type:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Types_of_Collateral"
                          options={Collateral2}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          onChange={(e, value) => setTypes_of_Collateral(value)}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          disabled={formSubmitted && loading}
                          noOptionsText={"No Available Data"}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Types_of_Collateral"
                              {...params}
                              disabled={formSubmitted && loading}
                              variant="standard"
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
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label
                        className="col-sm-3 col-form-label"
                        style={{ whiteSpace: "pre" }}
                      >
                        Monthly Payment:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <NumericFormat
                          disabled={formSubmitted && loading}
                          readOnly
                          required
                          className="form-control disabledNumeric"
                          placeholder={currentcyFormat.format("")}
                          name="Monthly_payment"
                          value={Number(Monthly_payment).toLocaleString()}
                          onChange={(e) => setMonthly_payment(e.target.value)}
                          allowLeadingZeros
                          thousandSeparator=","
                        />
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Loan Interest:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          disabled={formSubmitted && loading}
                          required
                          className="form-control"
                          name="interest"
                          type="number"
                          readOnly
                          value={LOANTYPE[Type_Of_Loan]}
                          onChange={(e) => setinterest(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="col-md-6 float-right">
                  <Form.Group className="row">
                    <label
                      style={{ whiteSpace: "pre" }}
                      className="col-sm-3 col-form-label"
                    >
                      Reason For Loan:<span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        required
                        className="form-control addpadding13"
                        onChange={(e) => setReason_for_loan(e.target.value)}
                        value={Reason_for_loan}
                        disabled={formSubmitted && loading}
                        placeholder="Please Enter Your Reason for the loan"
                        name="Reason_for_loan"
                        id="exampleTextarea1"
                        minLength={20}
                        rows="4"
                        cols={46}
                      ></textarea>
                    </div>
                  </Form.Group>
                </div>
                <br></br>
                <button
                  id="mainbutton"
                  title="Review Your Information Before Going to Next"
                  type="submit"
                  className="btn btn-primary mr-2"
                  disabled={formSubmitted && loading}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoanInfoBusinessLoan;
