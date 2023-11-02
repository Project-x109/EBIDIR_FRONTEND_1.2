import React from "react";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  AddPersonal,
  clearErrors,
  loadPersonal,
  updatePersonal,
} from "../../../Actions/UserAction";
import {
  CLEAR_ERRORS,
  UPDATE_PERSONAL_RESET,
} from "../../../Constants/UserConstants";
import Tooltip from "@mui/material/Tooltip";
import BackdropLoader from "../common/BackdropLoader";
import styles from "../User/pages/Modal.module.css";
import moment from "moment";
import "./Buton.css";
import { getStatus } from "../../../Actions/SystemAction";
import { GET_APPLICATIONSTATUS_RESET } from "../../../Constants/SystemConstants";
import toast, { Toaster } from "react-hot-toast";
import { getLoan } from "../../../Actions/LoanAction";

const PersonalInfoRequestLoan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { perror, isUpdatedpersonal } = useSelector((state) => state.profile);
  const { personalSuccess, personalError, personal, loading } = useSelector(
    (state) => state.personal
  );
  const { myloan } = useSelector((state) => state.myloan);
  const { status } = useSelector((state) => state.status);
  const [show, setShow] = useState(true);
  const [hidden1, setHidden1] = useState("");
  const [hidden2, setHidden2] = useState("d-none");
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(getStatus());
    if (status?.next && show) {
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
      setShow(false);
    }
  }, [dispatch, navigate, show, status]);

  const [age, setAge] = useState(personal?.age || "");
  const [Number_Of_Dependents, setNumber_Of_Dependents] = useState(
    personal?.Number_Of_Dependents || ""
  );
  const [Education_Status, setEducation_Status] = useState(
    personal?.Education_Status || ""
  );
  const [Marriage_Status, setMarital_status] = useState(
    personal?.Marriage_Status || ""
  );
  const [Criminal_Record, setCriminal_Record] = useState(
    personal?.Criminal_Record || ""
  );
  const [dob, setDob] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [id] = useState(localStorage.getItem("id"));
  const PersonalSubmit = (e) => {
    e.preventDefault();
    const calculatedAge = personal
      ? personal.age
      : moment().diff(moment(dob), "years");
    setAge(calculatedAge);

    if (personal && personal.id) {
      dispatch(
        updatePersonal({
          age: calculatedAge,
          Education_Status,
          Marriage_Status,
          Number_Of_Dependents,
          Criminal_Record,
        })
      );
    } else {
      dispatch(
        AddPersonal({
          age: calculatedAge,
          Number_Of_Dependents,
          Education_Status,
          Marriage_Status,
          Criminal_Record,
        })
      );
    }
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (personalError) {
      Swal.fire({
        title: "" + personalError,
        type: "error",
        text: "Error Occurred: " + personalError,
        background: "pink",
        timer: 3000,
      });
      dispatch(clearErrors());
    }
    if (personalSuccess) {
      Swal.fire({
        title: "Personal information Created",
        type: "success",
        text: "Personal information Created successfully",
        background: "white",
        timer: 3000,
      });
      navigate("/personal/loan");
    }
  }, [dispatch, navigate, personalError, personalSuccess]);

  useEffect(() => {
    if (personal) {
      setAge(personal.age);
      setEducation_Status(personal.Education_Status);
      setMarital_status(personal.Marriage_Status);
      setCriminal_Record(personal.Criminal_Record);
      setNumber_Of_Dependents(personal.Number_Of_Dependents);
    }
    if (perror) {
      Swal.fire({
        title: "" + perror,
        type: "error",
        text: "Error Occurred: " + perror,
        background: "pink",
        timer: 3000,
      });
      dispatch(clearErrors());
    }
    if (isUpdatedpersonal) {
      Swal.fire({
        title: "Personal Information Updated",
        type: "success",
        text: "Personal Information Updated Successfully",
        background: "white",
        timer: 3000,
      });
      navigate("/personal/loan");
      dispatch(loadPersonal());
      dispatch({ type: UPDATE_PERSONAL_RESET });
    }
  }, [dispatch, navigate, perror, isUpdatedpersonal, personal]);

  useEffect(() => {
    dispatch(loadPersonal());
  }, [dispatch]);

  const next = (e) => {
    e.preventDefault();
    navigate("/personal/loan");
  };

  const hide = () => {
    setHidden1("d-none");
    setHidden2("");
    toast.success("Term accepted Successfully!");
  };

  useEffect(() => {
    dispatch(getLoan());
  }, [dispatch]);

  useEffect(() => {
    const date = new Date().toISOString().substring(2, 10);
    let c = 0;
    if (Array.isArray(myloan)) {
      myloan.forEach((item) => {
        const newDate = new Date(item.createdAt).toISOString().substring(2, 10);
        if (date === newDate) c++;
      });
    }
    setCount(c);
  }, [myloan]);
  return (
    <div>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <Toaster position="bottom-right" />
      <h1 id={styles.headers}>Personal Loan</h1>
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
                Request Personal Loan
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
              <span className="text-danger ml-2"></span>
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
            {/* <div style={{ paddingLeft: "10%", paddingBottom: "-50%" }}>
              {" "}
              {loading && <BackdropLoader />}
            </div> */}
            <div className="card-body">
              <h4 className="card-title">
                All (<span className="text-danger">*</span>) are required fields
              </h4>
              <p className="card-description">
                Use necessary form validation before submiting form and Hover on
                Input fields for More Inofrmation
              </p>
              <h4 className="card-title">Personal Information</h4>
              <form onSubmit={PersonalSubmit} className="form-sample">
                <p className="card-description"> Personal info </p>
                <div className="row">
                  {personal ? (
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Age:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            required
                            name="age"
                            min={18}
                            max={120}
                            step={1}
                            type="number"
                            style={{ paddingLeft: "17px" }}
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                            disabled
                          />
                        </div>
                      </Form.Group>
                    </div>
                  ) : (
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Age:<span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            required
                            name="dob"
                            max="2005-01-01"
                            min="1903-01-01"
                            step={1}
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            type="date"
                            style={{ paddingLeft: "17px" }}
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  )}
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label
                        style={{ whiteSpace: "pre" }}
                        className="col-sm-3 col-form-label"
                      >
                        Education Status:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <select
                          required
                          id="Educational_Status"
                          autoComplete="true"
                          className="form-control"
                          name="gender"
                          value={Education_Status}
                          onChange={(e) => setEducation_Status(e.target.value)}
                          disabled={formSubmitted && loading}
                        >
                          <option value="">Select Educational Status</option>
                          <option value={"Below Highschool"}>
                            Below Highschool
                          </option>
                          <option value={"Highschool"}>Highschool</option>
                          <option value={"Diploma"}>Diploma</option>
                          <option value={"Degree"}>Degree</option>
                          <option value={"Masters"}>Masters</option>
                          <option value={"Phd"}>Phd</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <Tooltip
                    arrow
                    title="From the provided option choose Criminal Records If any else Select 'No'"
                  >
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label
                          style={{ whiteSpace: "pre" }}
                          className="col-sm-3 col-form-label"
                        >
                          Criminal Records:
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            required
                            id="Criminal_Record"
                            autoComplete="true"
                            className="form-control"
                            name="Criminal_Record"
                            value={Criminal_Record}
                            onChange={(e) => setCriminal_Record(e.target.value)}
                            disabled={formSubmitted && loading}
                          >
                            <option value="">
                              Select Criminal record Status
                            </option>
                            <option value={"No"}>No</option>
                            <option value={"YES/PAST FIVE YEARS"}>
                              YES/PAST FIVE YEARS
                            </option>
                            <option value={"YES/MORE THAN FIVE YEARS"}>
                              YES/MORE THAN FIVE YEARS
                            </option>
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                  <Tooltip
                    arrow
                    title="Number of Dependents if None,Input Zero"
                  >
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Dependents:<span className="text-danger">*</span>{" "}
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            required
                            type="Number"
                            min={0}
                            step={1}
                            name="Number_Of_Dependents"
                            style={{ paddingLeft: "17px" }}
                            onChange={(e) =>
                              setNumber_Of_Dependents(e.target.value)
                            }
                            value={Number_Of_Dependents}
                            disabled={formSubmitted && loading}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </Tooltip>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label
                        style={{ whiteSpace: "pre" }}
                        className="col-sm-3 col-form-label"
                      >
                        Marriage Status:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <select
                          required
                          autoComplete="true"
                          className="form-control"
                          name="marriage_status"
                          onChange={(e) => setMarital_status(e.target.value)}
                          value={Marriage_Status}
                          disabled={formSubmitted && loading}
                        >
                          <option value="">Select Marriage Status</option>
                          <option value={"Married"}>Married</option>
                          <option value={"single"}>Single</option>
                          <option value={"divorced"}>Divorced</option>
                          <option value={"widowed"}>Widowed</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <br></br>
                <div id="spacing">
                  <button
                    id="mainbutton"
                    type="submit"
                    title="Review Your Information Before Submitting"
                    // onClick={PersonalSubmit}
                    className={
                      personal ? "btn btn-warning mr-2" : "btn btn-primary mr-2"
                    }
                    disabled={formSubmitted && loading}
                  >
                    {personal ? "Update" : "Save"}
                  </button>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  {personal ? (
                    <button
                      id="mainbutton"
                      title="Review Your Information Before Going to Next"
                      className="btn btn-dark mainbutton2"
                      onClick={next}
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonalInfoRequestLoan;
