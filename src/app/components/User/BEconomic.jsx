import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { years } from "../../Dataset/DataCollections";
import { useDispatch, useSelector } from "react-redux";
import {
  loadBEconomic,
  registerBEconomic,
  updateBEconomic,
} from "../../../Actions/EconomicAction";
import { clearErrors } from "../../../Actions/UserAction";
import { UPDATE_BECONOMIC_RESET } from "../../../Constants/UserConstants";
import { NumericFormat } from "react-number-format";
import BackdropLoader from "../common/BackdropLoader";
import styles from "../User/pages/Modal.module.css";
import "./Buton.css";
const currentcyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "ETB",
});
const CompanyInfoBusinessLoan = () => {
  const textRef = React.useRef();
  const { berror, bisUpdated } = useSelector((state) => state.profile);
  const { beconomicSuccess, beconomicError, beconomic, loading } = useSelector(
    (state) => state.beconomic
  );
  const Collaterals = ["Car", "Building", "Car,Building"];
  const { collateral } = useParams();
  const [value1] = React.useState();
  React.useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "0px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [value1]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // data
  const [id] = useState(localStorage.getItem("id"));
  const [Number_of_Employees, setNumber_of_Employees] = useState(
    beconomic && beconomic.Number_of_Employees
  );
  const [EBIT, setEBIT] = useState(beconomic && beconomic.EBIT);
  const [FCBT, setFCBT] = useState(beconomic && beconomic.FCBT);
  const [year, setYear] = useState(beconomic && beconomic.year);
  const [Buildings, setBuildings] = useState(beconomic && beconomic.Buildings);
  const [Vehicles, setVehicles] = useState(beconomic && beconomic.Vehicles);
  const [Lands, setLands] = useState(beconomic && beconomic.Lands);
  const [Companies, setCompanies] = useState(beconomic && beconomic.Companies);
  const [Number_Of_Loans, setNumber_Of_Loans] = useState(
    beconomic && beconomic.Number_Of_Loans
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [fully_repaid_loans, setfully_repaid_loans] = useState(
    beconomic && beconomic.fully_repaid_loans
  );
  const [Total_Monthly_Income, setTotal_Monthly_Income] = useState(
    beconomic && beconomic.Total_Monthly_Income
  );

  const [monthlyIncomeError, setMonthlyIncomeerror] = useState("");
  const [EBITError, setEBITerror] = useState("");
  const [FCBTError, setFCBTerror] = useState("");

  const handleMonthlyIncomeValidation = () => {
    const minValue = 1000;
    const sanitizedMonthlyIncome = Total_Monthly_Income;

    if (isNaN(sanitizedMonthlyIncome) || sanitizedMonthlyIncome < minValue) {
      setMonthlyIncomeerror(
        `Please enter a valid Monthly Income greater than ${minValue}`
      );
    } else {
      setMonthlyIncomeerror("");
    }
  };
  const handleFCBTValidation = () => {
    const minValue = 1000;
    const sanitizedMonthlyIncome = FCBT;

    if (isNaN(sanitizedMonthlyIncome) || sanitizedMonthlyIncome < minValue) {
      setFCBTerror(`Please enter a valid FCBT greater than ${minValue}`);
    } else {
      setFCBTerror("");
    }
  };
  const handleEBITValidation = () => {
    const minValue = 1000;
    const sanitizedMonthlyIncome = EBIT;

    if (isNaN(sanitizedMonthlyIncome) || sanitizedMonthlyIncome < minValue) {
      setEBITerror(`Please enter a valid EBIT greater than ${minValue}`);
    } else {
      setEBITerror("");
    }
  };

  const handleChangeMonthlyIncome = (values) => {
    let { formattedValue, floatValue } = values;
    setTotal_Monthly_Income(floatValue);
  };
  const handleChangeFCBT = (values) => {
    let { formattedValue, floatValue } = values;
    setFCBT(floatValue);
  };
  const handleChangeEBIT = (values) => {
    let { formattedValue, floatValue } = values;
    setEBIT(floatValue);
  };

  const dotremoval = RegExp(/([.])\w+/);
  const signremoval = RegExp(/([-])\w+/);

  const EconomicSubmit = (e) => {
    e.preventDefault();
    handleMonthlyIncomeValidation();
    handleEBITValidation();
    handleFCBTValidation();
    if (!EBIT) {
      Swal.fire({
        title: "Earning Before Interest and Tax Not Entered",
        type: "error",
        text: "Please Make Sure to Enter Earning Before Interest and Tax",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (!FCBT) {
      Swal.fire({
        title: "Fixed Charge Before Tax Not Entered",
        type: "error",
        text: "Please Make Sure to Enter Fixed Charge Before Tax",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (!year || year?.length === 0) {
      Swal.fire({
        title: "Year not Selected ",
        type: "error",
        text: "Please Make Sure to Select Year of Establishment from the drop down",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (String(Buildings).length === 0) {
      Swal.fire({
        title: "Building not Entered",
        type: "error",
        text: "Please Make Sure to Enter Building owned by the company",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (dotremoval.test(Buildings)) {
      Swal.fire({
        title: "Building Invalid",
        type: "error",
        text: "Building Cannot contain decimalpoint",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (signremoval.test(Buildings)) {
      Swal.fire({
        title: "Building Invalid",
        type: "error",
        text: "Building Cannot be Negative Number",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (String(Lands).length === 0) {
      Swal.fire({
        title: "Lands not Entered",
        type: "error",
        text: "Please Make Sure to Enter Lands owned by the company",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (dotremoval.test(Lands)) {
      Swal.fire({
        title: "Lands Invalid",
        type: "error",
        text: "Lands Cannot contain decimalpoint",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (signremoval.test(Lands)) {
      Swal.fire({
        title: "Lands Invalid",
        type: "error",
        text: "Lands Cannot be Negative Number",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (String(Vehicles).length === 0) {
      Swal.fire({
        title: "Vehicles not Entered",
        type: "error",
        text: "Please Make Sure to Enter Vehicles owned by the company",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (dotremoval.test(Vehicles)) {
      Swal.fire({
        title: "Vehicles Invalid",
        type: "error",
        text: "Building Cannot contain decimalpoint",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (signremoval.test(Vehicles)) {
      Swal.fire({
        title: "Vehicles Invalid",
        type: "error",
        text: "Building Cannot be Negative Number",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (String(Companies).length === 0) {
      Swal.fire({
        title: "Companies not Entered",
        type: "error",
        text: "Please Make Sure to Enter Companies owned by the company",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (dotremoval.test(Companies)) {
      Swal.fire({
        title: "Companies Invalid",
        type: "error",
        text: "Companies Cannot contain decimalpoint",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (signremoval.test(Companies)) {
      Swal.fire({
        title: "Companies Invalid",
        type: "error",
        text: "Companies Cannot be Negative Number",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (Total_Monthly_Income < 10000 || !Total_Monthly_Income) {
      Swal.fire({
        title: "Enter Total Monthly income",
        type: "error",
        text: "Please Make Sure to Enter a valid Total monthly income",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    if (beconomic) {
      dispatch(
        updateBEconomic({
          Number_of_Employees,
          year,
          Number_Of_Loans,
          Buildings,
          Vehicles,
          Lands,
          Companies,
          fully_repaid_loans,
          EBIT,
          FCBT,
          Total_Monthly_Income,
        })
      );
    } else {
      dispatch(
        registerBEconomic({
          Number_of_Employees,
          year,
          Number_Of_Loans,
          Buildings,
          Vehicles,
          Lands,
          Companies,
          fully_repaid_loans,
          EBIT,
          FCBT,
          Total_Monthly_Income,
        })
      );
    }
    setFormSubmitted(true)
  };
  useEffect(() => {
    if (beconomicError) {
      Swal.fire({
        title: "" + beconomicError,
        type: "error",
        text: "Eror Occured: " + beconomicError,
        background: "pink",
        timer: 3000,
      });
      dispatch(clearErrors());
    }
    if (beconomicSuccess) {
      Swal.fire({
        title: "Economic information Created",
        type: "success",
        text: "Economic information Created successfully",
        background: "white",
        timer: 3000,
      });

      let location = "";
      const col_type = collateral.replace("_", ",");
      if (col_type === Collaterals[0]) location = "/car/" + collateral + "/2";
      else if (col_type === Collaterals[1]) location = "/Building/2";
      else if (col_type === Collaterals[2])
        location = "/car/" + collateral + "/2";
      navigate(location);
    }
  }, [dispatch, beconomicError, beconomicSuccess, navigate]);
  useEffect(() => {
    if (beconomic) {
      setNumber_of_Employees(beconomic.Number_of_Employees);
      setEBIT(beconomic.EBIT);
      setFCBT(beconomic.FCBT);
      setYear(beconomic.year);
      setBuildings(beconomic.Buildings);
      setVehicles(beconomic.Vehicles);
      setLands(beconomic.Lands);
      setCompanies(beconomic.Companies);
      setNumber_Of_Loans(beconomic.Number_Of_Loans);
      setfully_repaid_loans(beconomic.fully_repaid_loans);
      setTotal_Monthly_Income(beconomic.Total_Monthly_Income);
    }
    if (berror) {
      Swal.fire({
        title: "" + berror,
        type: "error",
        text: "Eror Occured: " + berror,
        background: "pink",
      });
      dispatch(clearErrors());
    }
    if (bisUpdated) {
      Swal.fire({
        title: "Economic Information Updated",
        type: "success",
        text: "Economic Information Updated Successfully",
        background: "white",
      });

      let location = "";
      const col_type = collateral.replace("_", ",");
      if (col_type == Collaterals[0]) location = "/car/" + collateral + "/2";
      else if (col_type == Collaterals[1]) location = "/Building/2";
      else if (col_type == Collaterals[2])
        location = "/car/" + collateral + "/2";
      navigate(location);
      dispatch({ type: UPDATE_BECONOMIC_RESET });
      dispatch(loadBEconomic());
    }
  }, [dispatch, berror, bisUpdated, navigate, beconomic, id]);

  useEffect(() => {
    dispatch(loadBEconomic());
  }, [dispatch]);
  const next = (e) => {
    let location = "";
    const col_type = collateral.replace("_", ",");
    if (col_type == Collaterals[0]) location = "/car/" + collateral + "/2";
    else if (col_type == Collaterals[1]) location = "/Building/2";
    else if (col_type == Collaterals[2]) location = "/car/" + collateral + "/2";
    navigate(location);
  };
  return (
    <div>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h1 id={styles.headers}>Company Information</h1>
      <div id={styles.headers} className={styles.imageremover}>
        <div className="page-header">
          <h3 className="page-title">Business Loan Requestion</h3>
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
              <h4 className="card-title">Company Information</h4>
              <form className="form-sample" onSubmit={EconomicSubmit}>
                <p className="card-description"> Company info </p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Employees:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          min={1}
                          step={1}
                          max={100000}
                          style={{ paddingLeft: "10px" }}
                          required
                          name="Number_of_Employees"
                          className="form-control"
                          onChange={(e) =>
                            setNumber_of_Employees(e.target.value)
                          }
                          value={Number_of_Employees}
                          disabled={formSubmitted && loading}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        EBIT:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <NumericFormat
                          allowLeadingZeros
                          required
                          thousandSeparator=","
                          valueIsNumericString={true}
                          className={`form-control ${
                            EBITError && "is-invalid"
                          }`}
                          placeholder={currentcyFormat.format("")}
                          name="EBIT"
                          // onChange={(e) => setEBIT(e.target.value)}
                          value={EBIT}
                          onValueChange={handleChangeEBIT}
                          onBlur={handleEBITValidation}
                          disabled={formSubmitted && loading}
                        />
                        {EBITError && (
                          <div className="invalid-feedback">{EBITError}</div>
                        )}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        FCBT:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <NumericFormat
                          allowLeadingZeros
                          thousandSeparator=","
                          valueIsNumericString={true}
                          className={`form-control ${
                            FCBTError && "is-invalid"
                          }`}
                          required
                          placeholder={currentcyFormat.format("")}
                          name="FCBT"
                          // onChange={(e) => setFCBT(e.target.value)}
                          value={FCBT}
                          onValueChange={handleChangeFCBT}
                          onBlur={handleFCBTValidation}
                          disabled={formSubmitted && loading}
                        />
                        {FCBTError && (
                          <div className="invalid-feedback">{FCBTError}</div>
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
                        Establishment:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <select
                          onChange={(e) => setYear(e.target.value)}
                          required
                          placeholder=""
                          id="year"
                          autoComplete="true"
                          value={year}
                          className="form-control"
                          disabled={formSubmitted && loading}
                          name="year"
                        >
                          <option color="grey">
                            Select Year of Establishment
                          </option>
                          {years.map((year) => (
                            <option value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <p className="card-description">Loan Related Info</p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label
                        style={{ whiteSpace: "pre" }}
                        className="col-sm-3 col-form-label"
                      >
                        Privious Loans:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          min={0}
                          step={1}
                          style={{ paddingLeft: "10px" }}
                          name="Previous_Number_Of_Loans"
                          required
                          disabled={formSubmitted && loading}
                          type="number"
                          value={Number_Of_Loans}
                          onChange={(e) => setNumber_Of_Loans(e.target.value)}
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
                        Repaid Loans:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          min={0}
                          step={1}
                          style={{ paddingLeft: "10px" }}
                          name="fully_repaid_loans"
                          required
                          disabled={formSubmitted && loading}
                          type="number"
                          value={fully_repaid_loans}
                          onChange={(e) =>
                            setfully_repaid_loans(e.target.value)
                          }
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
                          placeholder={currentcyFormat.format("")}
                          name="Total_Monthly_Income"
                          required
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
                <p className="card-description">Assets</p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Buildings:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          min={0}
                          step={1}
                          disabled={formSubmitted && loading}
                          style={{ paddingLeft: "10px" }}
                          name="Buildings"
                          required
                          type="number"
                          value={Buildings}
                          onChange={(e) => setBuildings(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Vehicles:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          min={0}
                          step={1}
                          disabled={formSubmitted && loading}
                          style={{ paddingLeft: "10px" }}
                          name="Vehicles"
                          required
                          type="number"
                          value={Vehicles}
                          onChange={(e) => setVehicles(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Land:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          min={0}
                          step={1}
                          disabled={formSubmitted && loading}
                          style={{ paddingLeft: "10px" }}
                          name="Land"
                          required
                          type="number"
                          value={Lands}
                          onChange={(e) => setLands(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Companies:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          min={0}
                          step={1}
                          disabled={formSubmitted && loading}
                          name="Companies"
                          required
                          type="number"
                          style={{ paddingLeft: "10px" }}
                          value={Companies}
                          onChange={(e) => setCompanies(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <br></br>
                <button
                  style={{ width: "100px" }}
                  title="Review Your Information Before Submitting"
                  type="submit"
                  disabled={formSubmitted && loading}
                  className={
                    beconomic ? "btn btn-warning mr-2" : "btn btn-primary mr-2"
                  }
                >
                  {beconomic ? "Update" : "Save"}
                </button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {beconomic ? (
                  <button
                    id="mainbutton"
                    onClick={next}
                    title="Review Your Information Before Going to Next"
                    className="btn btn-dark"
                    disabled={formSubmitted && loading}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    id="mainbutton"
                    title="Review Your Information Before Going to Next"
                    className="btn btn-dark mainbutton2"
                    disabled
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
export default CompanyInfoBusinessLoan;
