import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  AddEconomic,
  loadEconomic,
  updateEconomic,
} from "../../../Actions/EconomicAction";
import { clearErrors } from "../../../Actions/UserAction";
import { UPDATE_ECONOMIC_RESET } from "../../../Constants/UserConstants";
import { NumericFormat } from "react-number-format";
import Tooltip from "@mui/material/Tooltip";
import { REGISTER_ECONOMIC_REST } from "../../../Constants/EconomicConstants";
import BackdropLoader from "../common/BackdropLoader";
import styles from "../User/pages/Modal.module.css";
import "./Buton.css";
const EconomicInfoPersonalLoan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { collateral } = useParams();
  const { eerror, isUpdatedEconomic } = useSelector((state) => state.profile);
  const { economic, economicSuccess, economicError, loading } = useSelector(
    (state) => state.economic
  );
  const currentcyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
  });
  const [id] = useState(localStorage.getItem("id"));
  const [field_of_employment, setfield_of_employment] = useState(
    economic && economic.field_of_employment
  );
  const [Source_of_income, setSource_of_income] = useState(
    economic && economic.Source_of_income
  );
  const [Experience, setExperience] = useState(economic && economic.Experience);
  const [Number_Of_Loans, setNumber_Of_Loans] = useState(
    economic && economic.Number_Of_Loans
  );
  const [fully_repaid_loans, setfully_repaid_loans] = useState(
    economic && economic.fully_repaid_loans
  );
  const [Total_Monthly_Income, setTotal_Monthly_Income] = useState(
    economic && economic.Total_Monthly_Income
  );
  const Collaterals = ["Car", "Building", "Car,Building"];
  const [monthlyIncomeError, setMonthlyIncomeerror] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleMonthlyIncomeValidation = () => {
    const minValue = 1000;
    const sanitizedMonthlyIncome = Total_Monthly_Income;

    if (isNaN(sanitizedMonthlyIncome) || sanitizedMonthlyIncome <= minValue) {
      setMonthlyIncomeerror(
        `Please enter a valid Monthly Income greater than ${minValue}`
      );
    } else {
      setMonthlyIncomeerror("");
    }
  };

  const handleChangeMonthlyIncome = (values) => {
    const { formattedValue, floatValue } = values;
    setTotal_Monthly_Income(floatValue);
  };
  const Numbers = /^[0-9\b]+$/;
  const Characters = /^[/-=\+'":;\?\.,\/\*!@#\$%\^&/ism\b]+$/;
  const dotremoval = RegExp(/([.])\w+/);
  const signremoval = RegExp(/([-])\w+/);
  const EconomicSubmit = (e) => {
    e.preventDefault();

    handleMonthlyIncomeValidation();

    if (
      !field_of_employment ||
      Numbers.test(field_of_employment) ||
      Characters.test(field_of_employment) ||
      String(field_of_employment).length == 0
    ) {
      Swal.fire({
        title: "Field of Employment Not Entered",
        type: "error",
        text: "Please Make Sure to Enter the Field of Employment",
        background: "pink",
        timer: 3000,
      });
      return;
    }

    if (signremoval.test(Total_Monthly_Income)) {
      Swal.fire({
        title: "Monthly Income Invalid",
        type: "error",
        text: "Monthly Income Cannot be Negative Number",
        background: "pink",
        timer: 3000,
      });
      return;
    }

    if (
      String(Total_Monthly_Income).length === 0 ||
      String(Total_Monthly_Income).length < 0
    ) {
      Swal.fire({
        title: "Enter Total Monthly income",
        type: "error",
        text: "Please Make Sure to Enter the Total monthly income",
        background: "pink",
        timer: 3000,
      });
      return;
    }

    if (economic) {
      dispatch(
        updateEconomic({
          field_of_employment,
          Source_of_income,
          Experience,
          Number_Of_Loans,
          fully_repaid_loans,
          Total_Monthly_Income,
        })
      );
    } else {
      dispatch(
        AddEconomic({
          field_of_employment,
          Source_of_income,
          Experience,
          Number_Of_Loans,
          fully_repaid_loans,
          Total_Monthly_Income,
        })
      );
    }
    setFormSubmitted(true);
  };
  useEffect(() => {
    if (economicError) {
      Swal.fire({
        title: "" + economicError,
        type: "error",
        text: "Eror Occured: " + economicError,
        background: "pink",
        timer: 3000,
      });
      dispatch(clearErrors());
    }
    if (economicSuccess) {
      Swal.fire({
        title: "Economic Information Created",
        type: "success",
        text: "Economic Information Created successfully",
        background: "white",
        timer: 3000,
      });
      dispatch({ type: REGISTER_ECONOMIC_REST });
      let location = "";
      const col_type = collateral.replace("_", ",");
      if (col_type == Collaterals[0]) location = "/car/" + collateral + "/1";
      else if (col_type == Collaterals[1]) location = "/Building/1";
      else if (col_type == Collaterals[2])
        location = "/car/" + collateral + "/1";
      navigate(location);
    }
  }, [dispatch, economicError, economicSuccess, navigate]);
  useEffect(() => {
    if (economic) {
      setfield_of_employment(economic.field_of_employment);
      setSource_of_income(economic.Source_of_income);
      setExperience(economic.Experience);
      setNumber_Of_Loans(economic.Number_Of_Loans);
      setTotal_Monthly_Income(economic.Total_Monthly_Income);
      setfully_repaid_loans(economic.fully_repaid_loans);
    }
    if (eerror) {
      Swal.fire({
        title: "" + eerror,
        type: "error",
        text: "Eror Occured: " + eerror,
        background: "pink",
      });
      dispatch(clearErrors());
    }
    if (isUpdatedEconomic) {
      Swal.fire({
        title: "Economic Information Updated",
        type: "success",
        text: "Economic Information Updated Successfully",
        background: "white",
      });
      dispatch(loadEconomic());
      dispatch({ type: UPDATE_ECONOMIC_RESET });
      let location = "";
      const col_type = collateral.replace("_", ",");
      if (col_type == Collaterals[0]) location = "/car/" + collateral + "/1";
      else if (col_type == Collaterals[1]) location = "/Building/1";
      else if (col_type == Collaterals[2])
        location = "/car/" + collateral + "/1";
      navigate(location);
    }
  }, [dispatch, eerror, isUpdatedEconomic, navigate, economic, collateral, id]);
  useEffect(() => {
    dispatch(loadEconomic({ id: id }));
  }, [dispatch, id]);
  const next = () => {
    let location = "";
    const col_type = collateral.replace("_", ",");
    if (col_type === Collaterals[0]) location = "/car/" + collateral + "/1";
    else if (col_type === Collaterals[1]) location = "/Building/1";
    else if (col_type === Collaterals[2])
      location = "/car/" + collateral + "/1";
    navigate(location);
  };
  return (
    <div>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h1 id={styles.headers}>Economic Status Information</h1>
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
                Economic Status Information
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            {/* <div style={{ paddingLeft: "10%", paddingBottom: "-50%" }}>
              {" "}
              {loading && <BackdropLoader />}
            </div> */}
            <div className="card-body">
              <h4 className="card-title">
                All (<span className="text-danger">*</span>) are required Fields
              </h4>
              <p className="card-description">
                Use necessary form validation before submiting form and Hover on
                Input fields for More Inofrmation
              </p>
              <h4 className="card-title">Economic Status Information</h4>
              <form onSubmit={EconomicSubmit} className="form-sample">
                <p className="card-description">Economic info</p>
                <div className="row">
                  <Tooltip arrow title="What is Your Fields of Employment">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Employment:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            style={{ paddingLeft: "17px" }}
                            required
                            name="field_of_employment"
                            type="text"
                            value={field_of_employment}
                            onChange={(e) =>
                              setfield_of_employment(e.target.value)
                            }
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip arrow title="What is/are Your Source of Income">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label
                          className="col-sm-3 col-form-label"
                          style={{ whiteSpace: "pre" }}
                        >
                          Source of Income:
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            style={{ paddingLeft: "17px" }}
                            required
                            name="Source_of_income"
                            type="number"
                            value={Source_of_income}
                            onChange={(e) =>
                              setSource_of_income(e.target.value)
                            }
                            min={0}
                            max={10}
                            step={1}
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip
                    arrow
                    title="How long Have you been on Your field of Employment in Months"
                  >
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                        Experience:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            style={{ paddingLeft: "17px" }}
                            className="form-control"
                            required
                            name="Experience"
                            type="number"
                            min={0}
                            max={50}
                            step={1}
                            value={Experience}
                            onChange={(e) => setExperience(e.target.value)}
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Monthly Income:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <NumericFormat
                          allowLeadingZeros
                          thousandSeparator=","
                          valueIsNumericString={true}
                          className={`form-control disabledNumeric ${
                            monthlyIncomeError && "is-invalid"
                          }`}
                          required
                          name="Monthly_payment"
                          placeholder={currentcyFormat.format("")}
                          value={Total_Monthly_Income}
                          onValueChange={handleChangeMonthlyIncome}
                          onBlur={handleMonthlyIncomeValidation}
                          disabled={formSubmitted && loading}
                        />
                        {monthlyIncomeError && (
                          <div className="invalid-feedback">
                            {monthlyIncomeError}
                          </div>
                        )}
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <p className="card-description">Loan Related Info</p>
                <div className="row">
                  <Tooltip arrow title="Number of Loans you have currently">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label
                          className="col-sm-3 col-form-label"
                          style={{ whiteSpace: "pre" }}
                        >
                          Current Loans:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            style={{ paddingLeft: "17px" }}
                            required
                            name="Number_Of_Loans"
                            type="number"
                            min={0}
                            step={1}
                            value={Number_Of_Loans}
                            onChange={(e) => setNumber_Of_Loans(e.target.value)}
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip
                    arrow
                    title="Number of Fully Repaid Loans Before Using This System"
                  >
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Repaid Loans:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            style={{ paddingLeft: "17px" }}
                            required
                            min={0}
                            step={1}
                            name="fully_repaid_loans"
                            type="number"
                            value={fully_repaid_loans}
                            onChange={(e) =>
                              setfully_repaid_loans(e.target.value)
                            }
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                </div>
                <br></br>
                <button
                  id="mainbutton"
                  title="Review Your Information Before Submitting"
                  disabled={formSubmitted && loading}
                  //onClick={EconomicSubmit}
                  type="submit"
                  className={
                    !economic ? "btn btn-primary mr-2" : "btn btn-warning"
                  }
                >
                  {!economic ? "Save" : "Update"}
                </button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                {economic ? (
                  <button
                    id="mainbutton"
                    onClick={next}
                    disabled={formSubmitted && loading}
                    title="Review Your Information Before Going to Next"
                    className="btn btn-dark mainbutton2"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    id="mainbutton"
                    disabled
                    title="Review Your Information Before Going to Next"
                    className="btn btn-dark mainbutton2"
                  >
                    Next
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EconomicInfoPersonalLoan;
