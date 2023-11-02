import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  countries,
  MODEL,
  TRANSMISSION,
  TYPE,
} from "../../Dataset/DataCollections";
import { addcar } from "../../../Actions/CarAction";
import { clearErrors } from "../../../Actions/UserAction";
import { NumericFormat } from "react-number-format";
import { ADD_CAR_REST } from "../../../Constants/CarConstants";
import BackdropLoader from "../common/BackdropLoader";
import styles from "../User/pages/Modal.module.css";
import "./Buton.css";
const CollateralCars = () => {
  const Cylinder = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
  ];

  //clean part
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carSuccess, carError, loading } = useSelector((state) => state.car);

  // data collection
  const [Type_of_Vehicle, setType_of_Vehicle] = useState();
  const [Brand_of_Vehicle, setBrand_of_Vehicle] = useState();
  const [Model_of_Vehicle, setModel_of_Vehicle] = useState();
  const [Year_of_Manufacture, setYear_of_Manufacture] = useState();
  const [Country_of_Manufacture, setCountry_of_Manufacture] = useState();
  const [Transmission, setTransmission] = useState();
  const [Number_of_Cylinders, setNumber_of_Cylinders] = useState();
  const [Horsepower, setHorsepower] = useState();
  const [Transportation_Capacity, setTransportation_Capacity] = useState();
  const [Mileage, setMileage] = useState(" ");
  const [Plate_Number, setPlate_Number] = useState();
  const [MODELs, setMODEL] = useState(
    Brand_of_Vehicle && Object.keys(MODEL[Brand_of_Vehicle])
  );
  const [YEARS, setYEARS] = useState(
    Brand_of_Vehicle &&
      Model_of_Vehicle &&
      MODEL[Brand_of_Vehicle][Model_of_Vehicle]
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [carImage, setcarImage] = useState([]);
  const { collateral, type } = useParams();
  const Collaterals = ["Car", "Building", "Car,Building"];
  useEffect(() => {
    if (Brand_of_Vehicle) {
      setMODEL(Object.keys(MODEL[Brand_of_Vehicle]));
      if (Model_of_Vehicle) {
        setYEARS(MODEL[Brand_of_Vehicle][Model_of_Vehicle]);
      }
    }
  }, [navigate, Brand_of_Vehicle, Model_of_Vehicle]);

  const handleChanges = (e, value) => {
    setBrand_of_Vehicle(value);
    setMODEL(Object.keys(MODEL[Brand_of_Vehicle] || {}));
    setModel_of_Vehicle(undefined);
    setYear_of_Manufacture(undefined);
  };
  const handleChanges2 = (e, value) => {
    setModel_of_Vehicle(value);
    setYEARS(MODEL[Brand_of_Vehicle][Model_of_Vehicle]);
    setYear_of_Manufacture(undefined);
  };
  const handleCarImageChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    const imagevalid = /\.(jpe?g|png|gif|PNG|JPG?G|GIF|JFIF|jfif)$/i;
    const file = e.target.files[0];
    const fileSize = file.size;
    const maxSize = 1024 * 1024; // 1 MB
    const files = Array.from(e.target.files);

    setcarImage([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setcarImage((oldfiles) => [...oldfiles, reader.result]);
        }
        if (!imagevalid.test(inputValue)) {
          e.target.value = null;
          Swal.fire({
            title: "Image invalid Type",
            type: "error",
            text: " Supported types are png jpg and gif",
            background: "pink",
          });
          return;
        }
        if (fileSize > maxSize) {
          e.target.value = null;
          Swal.fire({
            title: "File Too Big",
            type: "error",
            text: "File should be below 1MB",
            background: "pink",
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const [MillageError, setMillageError] = useState("");

  const handleMillageErrorValidation = () => {
    const minValue = 0;
    const sanitizedMillageError = Mileage;

    if (isNaN(sanitizedMillageError) || sanitizedMillageError <= minValue) {
      setMillageError(`Please enter a valid Millage greater than ${minValue}`);
    } else {
      setMillageError("");
    }
  };

  const handleChangeMillage = (values) => {
    const { formattedValue, floatValue } = values;
    setMileage(floatValue);
  };

  const CarSubmit = (e) => {
    handleMillageErrorValidation();
    e.preventDefault();
    if (Mileage < 0) {
      Swal.fire({
        title: "Invalid Mileage",
        type: "error",
        text: "Mileage Can not be Negative Number",
        background: "pink",
        timer: 3000,
      });
      return;
    }
    dispatch(
      addcar({
        Type_of_Vehicle,
        Brand_of_Vehicle,
        Model_of_Vehicle,
        Year_of_Manufacture,
        Country_of_Manufacture,
        Transmission,
        Number_of_Cylinders,
        Horsepower,
        Transportation_Capacity,
        Plate_Number,
        Mileage,
        type,
        carImage,
      })
    );
    setFormSubmitted(true);
  };
  useEffect(() => {
    if (carError) {
      Swal.fire({
        title: "" + carError,
        type: "error",
        text: "Eror Occured: " + carError,
        background: "pink",
        timer: 3000,
      });
      dispatch(clearErrors());
    }
    if (carSuccess) {
      dispatch({ type: ADD_CAR_REST });
      const col_type = collateral.replace("_", ",");
      let location = "";
      if (col_type == Collaterals[0])
        location = type == 1 ? "/myloans" : "/mybloans";
      else if (col_type == Collaterals[2]) location = `/Building/${type}`;
      if (col_type == Collaterals[0]) {
        Swal.fire({
          title: "Loan Applied",
          type: "success",
          text: "Loan has been Created successfully",
          background: "white",
          timer: 3000,
        });
      } else {
        Swal.fire({
          title: "Vehicle Information Created",
          type: "success",
          text: "Vehicle Collateral Registered",
          background: "white",
          timer: 3000,
        });
      }
      navigate(location);
    }
  }, [dispatch, carError, carSuccess, collateral, navigate, type.type]);
  const decrement = (e) => {
    e.preventDefault();
    navigate(
      type == 1
        ? "/personal/economic/" + collateral.replace("_", ",")
        : "/company/economic/" + collateral.replace("_", ",")
    );
  };
  return (
    <div style={{ textTransform: "capitalize" }}>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h1 id={styles.headers}>Vehicle Information</h1>
      <div className={styles.imageremover}>
        <div className="page-header">
          <h3 id={styles.headers} className="page-title">
            Vehicle Collateral Details
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Request Loan
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Vehicle Collateral Information
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            {/* <span
              style={{
                paddingLeft: "40%",
                paddingTop: "19.7%",
                position: "absolute",
              }}
            >
              {" "}
              {loading && <BackdropLoader />}
            </span> */}
            <div className="card-body">
              <h4 className="card-title">
                All (<span className="text-danger">*</span>) are required Fields
              </h4>
              <p className="card-description">
                Use necessary form validation before submiting form and Hover on
                Input fields for More Inofrmation
              </p>
              <h4 className="card-title">Vehicle Information</h4>
              <form className="form-sample" onSubmit={CarSubmit}>
                <p className="card-description">Vehicle info</p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Type Of Vehicle:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          onChange={(e, value) => setType_of_Vehicle(value)}
                          id="Type_of_Vehicle"
                          getOptionLabel={(country) => `${country}`}
                          options={TYPE}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          className="autocomplete-input autocomplete-arrow"
                          disabled={formSubmitted && loading}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Type_of_Vehicle"
                              {...params}
                              variant="standard"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                              className="form-control addpadding13 TextField"
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
                        Brand:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Brand"
                          onChange={handleChanges}
                          getOptionLabel={(getState) => `${getState}`}
                          options={Object.keys(MODEL)}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          disabled={formSubmitted && loading}
                          noOptionsText={"No Available Data"}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          renderOption={(props, getState) => (
                            <Box component="li" {...props} key={getState}>
                              {getState}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Brand_of_Vehicle"
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
                        Model:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="city"
                          getOptionLabel={(getState) => `${getState}`}
                          options={
                            MODELs
                              ? MODELs
                              : ["Select Type of Brand to Choose Model..."]
                          }
                          onChange={handleChanges2}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          disabled={(formSubmitted&& loading) || !Brand_of_Vehicle}
                          noOptionsText={"No Available Data"}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          renderOption={(props, getState) => (
                            <Box component="li" {...props} key={getState}>
                              {getState}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Model_of_Vehicle"
                              {...params}
                              variant="standard"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                              className="form-control addpadding13"
                              color="warning"
                              sx={{ input: { color: "#343434" } }}
                              label=""
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
                        Year:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="year"
                          getOptionLabel={(getState) => `${getState}`}
                          disabled={(formSubmitted&& loading)  || !Brand_of_Vehicle || !Model_of_Vehicle}
                          options={
                            YEARS
                              ? YEARS
                              : ["Select Vehicle Model to Choose Model Year..."]
                          }
                          onChange={(e, value) => setYear_of_Manufacture(value)}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          renderOption={(props, getState) => (
                            <Box component="li" {...props} key={getState}>
                              {getState}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Year_of_Manufacture"
                              {...params}
                              variant="standard"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                              className="form-control addpadding13"
                              color="warning"
                              sx={{ input: { color: "#343434" } }}
                              label=""
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
                        Country:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="country"
                          options={countries}
                          onChange={(e, value) =>
                            setCountry_of_Manufacture(value)
                          }
                          disabled={(formSubmitted&& loading)  || !Brand_of_Vehicle || !Model_of_Vehicle || !Year_of_Manufacture}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Country_of_Manufacture"
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
                        Cylinder:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Cylinder"
                          options={Cylinder}
                          onChange={(e, value) => setNumber_of_Cylinders(value)}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          disabled={(formSubmitted&& loading)  || !Brand_of_Vehicle || !Model_of_Vehicle || !Year_of_Manufacture || !Country_of_Manufacture}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Number_of_Cylinders"
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
                        Transmission:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Transmission"
                          options={TRANSMISSION}
                          onChange={(e, value) => setTransmission(value)}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          disabled={(formSubmitted&& loading)  || !Brand_of_Vehicle || !Model_of_Vehicle || !Year_of_Manufacture || !Country_of_Manufacture || !Number_of_Cylinders}
                          noOptionsText={"No Available Data"}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Transmission"
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
                        Plate Number:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          minLength={5}
                          maxLength={10}
                          className="form-control addpadding13"
                          required
                          name="plate_number"
                          type="text"
                          onChange={(e) => setPlate_Number(e.target.value)}
                          value={Plate_Number}
                          disabled={formSubmitted && loading}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Horsepower:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control addpadding13"
                          min={720}
                          max={72000}
                          step={1}
                          required
                          name="Horsepower"
                          type="number"
                          onChange={(e) => setHorsepower(e.target.value)}
                          value={Horsepower}
                          disabled={formSubmitted && loading}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Transportation Capacity:
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control addpadding13"
                          min={2}
                          max={50}
                          step={1}
                          required
                          name="Transportation_Capacity"
                          type="number"
                          onChange={(e) =>
                            setTransportation_Capacity(e.target.value)
                          }
                          value={Transportation_Capacity}
                          disabled={formSubmitted && loading}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Millage(KM):<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <NumericFormat
                          allowLeadingZeros
                          thousandSeparator=","
                          valueIsNumericString={true}
                          className={`form-control disabledNumeric ${
                            MillageError && "is-invalid"
                          }`}
                          required
                          name="millage"
                          onValueChange={handleChangeMillage}
                          onBlur={handleMillageErrorValidation}
                          value={Mileage}
                          disabled={formSubmitted && loading}
                        />
                        {MillageError && (
                          <div className="invalid-feedback">{MillageError}</div>
                        )}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Vehicle Image:
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          accept=".jpg, .jpeg, .png"
                          type="file"
                          name="vehicleImage"
                          style={{ paddingTop: "5px" }}
                          multiple
                          className="form-control visibility-hidden"
                          id="customFileLang"
                          lang="es"
                          onChange={handleCarImageChange}
                          disabled={formSubmitted && loading}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <br></br>
                <button
                  id="mainbutton"
                  className="btn btn-dark"
                  title="To change Economic Information click this button"
                  onClick={decrement}
                  disabled={formSubmitted && loading}
                >
                  Previous
                </button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <button
                  id="mainbutton"
                  type="submit"
                  className="btn btn-primary mr-2"
                  title="Review Your Information Before Submitting mainbutton2"
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
export default CollateralCars;
