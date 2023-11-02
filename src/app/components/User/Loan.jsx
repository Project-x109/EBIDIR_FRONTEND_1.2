import React, { useEffect, useRef, useMemo } from "react";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { INTEREST_RATE } from "../../Dataset/DataCollections";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addLoan } from "../../../Actions/LoanAction";
import { clearErrors, getBranchByBank } from "../../../Actions/UserAction";
import { NumericFormat } from "react-number-format";
import Tooltip from "@mui/material/Tooltip";
import { REGISTER_LOAN_RESET } from "../../../Constants/LoanConstants";
import BackdropLoader from "../common/BackdropLoader";
import styles from "../User/pages/Modal.module.css";
import BranchLoader from "../common/BranchLoader";
import { getAllBanks } from "../../../Actions/UserAction";
import "./Buton.css";
const currentcyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "ETB",
});
const LoanInfoPersonalLoan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.login);
  const { LoanSuccess, LoanError, loading } = useSelector(
    (state) => state.loan
  );
  const { bankBranches, fetching } = useSelector((state) => state.bankBranches);
  const { banks } = useSelector((state) => state.banks);
  const [id] = useState(login && login.id);
  const [bank, setBank] = useState();
  const [branch, setbranch] = useState("");
  const [loan_amount, setloan_amount] = useState();
  const [Loan_Payment_Period, setLoan_Payment_Period] = useState();
  const [Job_Status, setJob_Status] = useState();
  const [Type_Of_Loan, setType_Of_Loan] = useState();
  const [Types_of_Collateral1, setTypes_of_Collateral] = useState();
  const [Reason_for_loan, setReason_for_loan] = useState();
  const [interest, setinterest] = useState();
  const [BRANCH, setBRANCH] = useState([]);
  const [LOANTYPE, setLOANTYPE] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculateMonthlyPayment = (loanAmount, interest, paymentPeriod) => {
    if (loanAmount && interest && paymentPeriod) {
      const monthlyInterestRate = interest / 12;
      const power = Math.pow(monthlyInterestRate + 1, paymentPeriod);
      const denominator = power - 1;
      return (loanAmount * (monthlyInterestRate * power)) / denominator;
    }
    return 0;
  };

  const [Monthly_payment, setMonthly_payment] = useState(() =>
    calculateMonthlyPayment(loan_amount, interest, Loan_Payment_Period)
  );

  useEffect(() => {
    if (bank) {
      setMonthly_payment(
        (loan_amount *
          ((interest / 12) *
            Math.pow(interest / 12 + 1, Loan_Payment_Period))) /
          (Math.pow(interest / 12 + 1, Loan_Payment_Period) - 1)
      );
    }
  }, [bank, Loan_Payment_Period, Type_Of_Loan, loan_amount]);
  // setting collateral type
  useEffect(() => {
    if (Types_of_Collateral1) {
      localStorage.setItem(
        "collateral",
        Collateral2.indexOf(Types_of_Collateral1)
      );
    }
  }, [Types_of_Collateral1]);

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
      addLoan({
        loan_amount,
        Reason_for_loan,
        Loan_Payment_Period,
        Job_Status,
        Bank: bank,
        branch:BRANCH[branch],
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
      Swal.fire({
        title: "Loan information Created",
        type: "success",
        text: "Loan information Created successfully",
        background: "white",
        timer: 3000,
      });
      dispatch({ type: REGISTER_LOAN_RESET });
      navigate(
        "/personal/economic/" +
          Collateral[Collateral2.indexOf(Types_of_Collateral1)].replace(
            ",",
            "_"
          )
      );
    }
  }, [dispatch, LoanError, LoanSuccess, navigate]);
  // temp code
  const Bank = Object.keys(INTEREST_RATE[0]);
  const Job = ["Employed", "Self Employed", "UnEmployed"];
  const TypeOfLoan = [
    "Personal loan",
    "Mortgage",
    "Student loan",
    "Auto loan",
    "Payday loan",
    "Pawn shop loan",
    "Small business loan",
    "Credit builder loan",
    " Debt consolidation loan",
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
  const textRef = useRef();

  const onChnage = (event) => {
    setReason_for_loan(event.target.value);
  };
  useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "0px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [Reason_for_loan]);

  useEffect(() => {
    dispatch(getAllBanks());
  }, [dispatch]);
  const handleBank = (value) => {
    setBank(value);
    setbranch(""); // Clear the selected branch value
    dispatch(getBranchByBank({ bank_name: value }));
  };
  useEffect(() => {
    let branchs = [];
    for (let branch of bankBranches) {
      branchs[branch.branch_name +"("+branch.location + ")"]=branch._id;
    }
    setBRANCH(branchs);
  }, [bank, fetching]);
  useEffect(() => {
    const the_bank = banks.find((item) => item.bank_name == bank);
    const loantypes = the_bank?.loan_types;
    const TypeRate = [];
    if (Array.isArray(loantypes))
      loantypes.map((item) => {
        TypeRate[item.type] = item.rate;
      });
    setLOANTYPE(TypeRate);
  }, [bank]);
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

      <h1 id={styles.headers}>Loan Information</h1>
      <div className={styles.imageremover}>
        <div className="page-header">
          <h3 id={styles.headers} className="page-title">
            Personal Loan Requestion
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
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                All (<span className="text-danger">*</span>) are required fields
              </h4>
              <p className="card-description">
                Use necessary form validation before submiting form and Hover on
                Input fields for More Inofrmation
              </p>
              <h4 className="card-title">Loan Information</h4>
              <form onSubmit={LoanSubmit} className="form-sample">
                <p className="card-description"> Loan info </p>
                <div className="row">
                  <Tooltip
                    title="Amount of Loan You want to Request in ETB"
                    arrow
                  >
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
                            required
                            name="loan_amount"
                            placeholder={currentcyFormat.format("")}
                            value={loan_amount}
                            //onChange={(e) => setloan_amount(e.target.value)}
                            onValueChange={handleChangeLoanAmount}
                            onBlur={handleLoanAmountValidation}
                            disabled={formSubmitted && loading}
                          />
                          {loanAmountError && (
                            <div className="invalid-feedback">
                              {loanAmountError}
                            </div>
                          )}
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title="Loan Payment Period in Months only Enter the Number of Months Example 15"
                    arrow
                  >
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label
                          style={{ whiteSpace: "pre" }}
                          className="col-sm-3 col-form-label"
                        >
                          Payemnt Period:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="number"
                            min={1}
                            max={600}
                            step={1}
                            className="addpadding13"
                            required
                            name="Loan_Payment_Period"
                            value={Loan_Payment_Period}
                            onChange={(e) =>
                              setLoan_Payment_Period(e.target.value)
                            }
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Bank:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Bank"
                          className="bank-autocomplete"
                          //options={Bank}
                          //value={bank}
                          //onChange={(e, value) => handleBank(value)}

                          options={bankData}
                          getOptionLabel={(option) => option?.bank_name || ""}
                          value={bank}
                          onChange={(e, value) =>
                            handleBank(value ? value.bank_name : "")
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          disabled={formSubmitted && loading}
                          noOptionsText={"No Available Data"}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Bank"
                              {...params}
                              variant="standard"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                              className="form-control addpadding13"
                              color="warning"
                              sx={{ input: { color: "#343434" } }}
                              disabled={formSubmitted && loading}
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
                          className="bank-autocomplete"
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
                          disabled={!bank || (formSubmitted&& loading) } // Disable the branch field when bank is not selected
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Job Status:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Job_Status"
                          options={Job}
                          className="bank-autocomplete"
                          value={Job_Status}
                          onChange={(e, value) => setJob_Status(value)}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          disabled={formSubmitted && loading}
                          noOptionsText={"No Available Data"}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Job_Status"
                              {...params}
                              variant="standard"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                              className="form-control addpadding13"
                              disabled={formSubmitted && loading}
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
                        Type of Loan:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Type_Of_Loan"
                          className="bank-autocomplete"
                          options={Object.keys(LOANTYPE)}
                          value={Type_Of_Loan}
                          onChange={(e, value) => {
                            setType_Of_Loan(value);
                            setinterest(LOANTYPE[value]);
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          disabled={formSubmitted && loading}
                          noOptionsText={"No Available Data"}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Type_Of_Loan"
                              {...params}
                              variant="standard"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                              className="form-control addpadding13"
                              disabled={formSubmitted && loading}
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
                        style={{ whiteSpace: "pre" }}
                        className="col-sm-3 col-form-label"
                      >
                        Collateral Type:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Types_of_Collateral"
                          options={Collateral2}
                          className="bank-autocomplete"
                          value={Types_of_Collateral1}
                          onChange={(e, value) => setTypes_of_Collateral(value)}
                          disabled={formSubmitted && loading}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Types_of_Collateral"
                              {...params}
                              variant="standard"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                              className="form-control addpadding13"
                              disabled={formSubmitted && loading}
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
                        className="col-sm-3 col-form-label"
                        style={{ whiteSpace: "pre" }}
                      >
                        Monthly Payment:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <NumericFormat
                          readOnly
                          required
                          className="form-control disabledNumeric"
                          disabled={formSubmitted && loading}
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
                  <Tooltip
                    arrow
                    title="The loan Interest for the applied loan type"
                  >
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
                  </Tooltip>
                  <div className="col-md-6">
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
                          //ref={textRef}
                          onChange={onChnage}
                          placeholder="Please Enter Your Reason for the loan"
                          name="Reason_for_loan"
                          disabled={formSubmitted && loading}
                          id="exampleTextarea1"
                          minLength={20}
                          rows="4"
                          cols={46}
                        ></textarea>
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <br></br>
                <Link
                  to="/personal/request"
                  title="To change Personal Information click this button"
                  className="btn btn-dark"
                  id="mainbutton"
                  disabled={formSubmitted && loading}
                >
                  Previous
                </Link>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`
                <button
                  title="Review Your Information Before Submitting"
                  type="submit"
                  id="mainbutton"
                  disabled={formSubmitted && loading}
                  className="btn btn-primary mr-2 mainbutton2"
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
export default LoanInfoPersonalLoan;
