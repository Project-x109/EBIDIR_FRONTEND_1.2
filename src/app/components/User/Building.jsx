import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Locations, years, Purpose, Type } from "../../Dataset/DataCollections";
import { addBuilding } from "../../../Actions/BuildingAction";
import { clearErrors } from "../../../Actions/UserAction";
import Tooltip from "@mui/material/Tooltip";
import { ADD_BUILDING_REST } from "../../../Constants/BuildingConstants";
import BackdropLoader from "../common/BackdropLoader";
import styles from "../User/pages/Modal.module.css";
import "./Buton.css";
const CollateralBuilding = () => {
  const [, setData] = useState([]);
  const [getCounty] = useState([]);
  // data for database

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {});
  }, []);
  // clean code
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { buildingSuccess, buildingError, loading } = useSelector(
    (state) => state.building
  );
  const [Location, setLocation] = useState();
  const [Year_of_Construction, setYear_of_Construction] = useState();
  const [Total_Area, setTotal_Area] = useState();
  const [Distance_from_Main_Road, setDistance_from_Main_Road] = useState();
  const [Type_of_Building, setType_of_Building] = useState();
  const [Purpose_of_the_Building, setPurpose_of_the_Building] = useState();
  const { type } = useParams();
  const [blueprint, setBlueprint] = useState();
  const [blueprintId, setblueprintId] = useState();
  const [id] = useState(localStorage.getItem("id"));
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [Construction_Status, setConstruction_Status] = useState({
    Sub_Structure: 0,
    Super_Structure: 0,
    Partially: 0,
    Fully: 0,
    Electro_Mechanical_Lifts: 0,
  });
  const [utility, setutility] = useState({
    water: 0,
    internet: 0,
    gas: 0,
    electricity: 0,
  });

  const dotremoval = RegExp(/([.])\w+/);
  const signremoval = RegExp(/([-])\w+/);
  const BuildingSubmit = (e) => {
    e.preventDefault();
    // if (!Location) {
    //   Swal.fire({
    //     title: "Building Location not Selected",
    //     type: "error",
    //     text: "Please Make Sure to Select the Location of Building",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }

    // if (!Year_of_Construction) {
    //   Swal.fire({
    //     title: "Year Not Selected",
    //     type: "error",
    //     text: "Please Make Sure to Select Year of Construction ",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }
    // if (!Total_Area) {
    //   Swal.fire({
    //     title: "Total area not Entered ",
    //     type: "error",
    //     text: "Please Make Sure to Enter Total area",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }
    // if (Total_Area < 50) {
    //   Swal.fire({
    //     title: "Total area Too Small ",
    //     type: "error",
    //     text: "Area Must be Greater than Fifty MeterSquare",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }

    // if (!Distance_from_Main_Road) {
    //   Swal.fire({
    //     title: "Distance form Main road",
    //     type: "error",
    //     text: "Please Make Sure to Enter Distance from main Road",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }
    // if (Distance_from_Main_Road < 0) {
    //   Swal.fire({
    //     title: "Distance form Main road Invalid",
    //     type: "error",
    //     text: "Distance from Main Road cannot be Negative",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }
    // if (!Type_of_Building) {
    //   Swal.fire({
    //     title: "Type of Building not Selected",
    //     type: "error",
    //     text: "Please Make Sure to Select Type of Building",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }
    // if (!blueprintId) {
    //   Swal.fire({
    //     title: "Blue Print not Entered",
    //     type: "error",
    //     text: "Please Make Sure to Enter Blue Print Id",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }
    // if (dotremoval.test(blueprintId)) {
    //   Swal.fire({
    //     title: "BluePrint Invalid",
    //     type: "error",
    //     text: "BluePrint Cannot contain decimalpoint",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }

    // if (signremoval.test(blueprintId)) {
    //   Swal.fire({
    //     title: "BluePrint Invalid",
    //     type: "error",
    //     text: "BluePrint Cannot contain negative sign",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }

    // if (!Purpose_of_the_Building) {
    //   Swal.fire({
    //     title: "Pupose of Building not Selected",
    //     type: "error",
    //     text: "Please Make Sure to Select Purpose of  Building",
    //     background: "pink",
    //     timer: 3000,
    //   });
    //   return;
    // }
    dispatch(
      addBuilding({
        Location,
        Year_of_Construction,
        Total_Area,
        Distance_from_Main_Road,
        Type_of_Building,
        Purpose_of_the_Building,
        Construction_Status,
        utility,
        id,
        type,
        blueprintId,
        blueprint,
      })
    );
    setFormSubmitted(true)
  };
  useEffect(() => {
    if (buildingError) {
      Swal.fire({
        title: "" + buildingError,
        type: "error",
        text: "Eror Occured: " + buildingError,
        background: "pink",
        timer: 3000,
      });
      dispatch(clearErrors());
    }
    if (buildingSuccess) {
      Swal.fire({
        title: "Loan Applied",
        type: "success",
        text: "Loan has been Created successfully",
        background: "white",
        timer: 3000,
      });
      dispatch({ type: ADD_BUILDING_REST });

      navigate(type == 1 ? "/myloans" : "/mybloans");
    }
  }, [dispatch, buildingError, buildingSuccess, navigate]);

  const handleUtilityChange = (e) => {
    setutility({ ...utility, [e.target.name]: e.target.value });
  };
  const handleStatus = (e) => {
    setConstruction_Status({
      ...Construction_Status,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlueprintChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    const imagevalid = /\.(jpe?g|png|gif|PNG|JPG?G|GIF|JFIF|jfif)$/i;
    const file = e.target.files[0];
    const fileSize = file.size;
    const maxSize = 1024 * 1024; // 1 MB
    const files = Array.from(e.target.files);

    setBlueprint([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setBlueprint((oldfiles) => [...oldfiles, reader.result]);
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

  return (
    <div >
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h1 id={styles.headers}>Building Information</h1>
      <div className={styles.imageremover}>
        <div className="page-header">
          <h3 id={styles.headers} className="page-title">
            Building Collateral Details
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Request Loan
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Building Collateral Information
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
          {/*   <span
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
              <h4 className="card-title">Building Information</h4>
              <form className="form-sample" onSubmit={BuildingSubmit}>
                <p className="card-description">Building info</p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Location:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          onChange={(e, value) => setLocation(value)}
                          id="Location"
                          getOptionLabel={(country) => `${country}`}
                          options={Locations}
                           disabled={formSubmitted && loading}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          renderOption={(props, country) => (
                            <Box
                              component="li"
                              {...props}
                              key={country}
                              value={getCounty}
                            >
                              {country}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Location"
                           
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
                        Construction year:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="Year_of_Construction"
                          options={years}
                           disabled={formSubmitted && loading}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          onChange={(e, value) =>
                            setYear_of_Construction(value)
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          renderOption={(props, getState) => (
                            <Box component="li" {...props} key={getState}>
                              {getState}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              required
                              name="Year_of_Construction"
                        
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
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Total Area:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          step={1}
                          min={50}
                           disabled={formSubmitted && loading}
                          max={10000}
                          className="form-control addpadding13"
                  
                          placeholder="Area of Land In m^2"
                          required
                          name="Total_Area"
                          type="number"
                          onChange={(e) => setTotal_Area(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Distance from Main Road:
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          step={1}
                          className="form-control addpadding13"
                          min={10}
                          max={10000}
                           disabled={formSubmitted && loading}
                          placeholder="Distance from Main Road in meters"
                          title="Distance from Main Road in meters"
                          required
                          name="Distance_from_Main_Road"
                          type="number"
                          onChange={(e) =>
                            setDistance_from_Main_Road(e.target.value)
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
                        Type of Building:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="year"
                           disabled={formSubmitted && loading}
                          onChange={(e, value) => setType_of_Building(value)}
                          getOptionLabel={(getState) => `${getState}`}
                          options={Type}
                          style={{
                            border: "2px solid #eaebef",
                            borderRadius: "6px",
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          noOptionsText={"No Available Data"}
                          renderOption={(props, getState) => (
                            <Box component="li" {...props} key={getState}>
                              {getState}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              required
                               disabled={formSubmitted && loading}
                              title="Choose Type of Building"
                              name="Type_of_Building"
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
                        Blueprint Number:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control addpadding13"
                          step={1}
                          min={1}
                           disabled={formSubmitted && loading}
                          placeholder="Blue Print unique Number"
                          required
                          name="Blue_Print_Number"
                          type="number"
                          onChange={(e) => setblueprintId(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Purpose of Building:
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <Autocomplete
                          id="country"
                          onChange={(e, value) =>
                            setPurpose_of_the_Building(value)
                          }
                          options={Purpose}
                           disabled={formSubmitted && loading}
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
                              name="Country_of_Manufacture"
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
                      <label className="col-sm-3 col-form-label">
                        Upload Blue Print:
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          accept=".jpg, .jpeg, .png"
                          type="file"
                          name="blueprint"
                           disabled={formSubmitted && loading}
                          style={{paddingTop:"5px"}}
                          multiple
                          className="form-control visibility-hidden"
                          id="customFileLang"
                          lang="es"
                          onChange={handleBlueprintChange}
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
                         disabled={formSubmitted && loading}
                        className="col-sm-3 col-form-label"
                      >
                        Construction Status:
                        <span className="text-danger">*</span>
                      </label>

                      <div className="col-sm-9">
                        <br></br>
                        <div className="form-check form-check-primary">
                          <label class="containerCheck">
                            <input
                              className="form-check-input"
                              name="Sub_Structure"
                              value={1}
                               disabled={formSubmitted && loading}
                              onChange={handleStatus}
                              type="checkbox"
                            />
                            <svg
                              viewBox="0 0 64 64"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                class="path"
                              ></path>
                            </svg>
                            <span style={{ marginLeft: "10px" }}>
                              Sub Structure
                            </span>
                          </label>
                        </div>
                        <div className="form-check form-check-success">
                          <label class="containerCheck">
                            <input
                              className="form-check-input"
                              type="checkbox"
                               disabled={formSubmitted && loading}
                              name="Super_Structure"
                              value={1}
                              onChange={handleStatus}
                            />
                            <svg
                              viewBox="0 0 64 64"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                class="path"
                              ></path>
                            </svg>
                            <span style={{ marginLeft: "10px" }}>
                              Super Structure
                            </span>
                          </label>
                        </div>
                        <div className="form-check form-check-info">
                          <label class="containerCheck">
                            <input
                              type="checkbox"
                              className="form-check-input"
                               disabled={formSubmitted && loading}
                              name="Partially"
                              value={1}
                              onChange={handleStatus}
                            />
                            <svg
                              viewBox="0 0 64 64"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                class="path"
                              ></path>
                            </svg>
                            <span style={{ marginLeft: "10px" }}>
                              Finishing (Partially)
                            </span>
                          </label>
                        </div>
                        <div className="form-check form-check-danger">
                          <label class="containerCheck">
                            <input
                              type="checkbox"
                              className="form-check-input"
                               disabled={formSubmitted && loading}
                              name="Fully"
                              value={1}
                              onChange={handleStatus}
                            />
                            <svg
                              viewBox="0 0 64 64"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                class="path"
                              ></path>
                            </svg>
                            <span style={{ marginLeft: "10px" }}>
                              Finishing (Fully Completed)
                            </span>
                          </label>
                        </div>
                        <div className="form-check form-check-warning">
                          <label class="containerCheck">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="Electro_Mechanical_Lifts"
                               disabled={formSubmitted && loading}
                              value={1}
                              onChange={handleStatus}
                            />
                            <svg
                              viewBox="0 0 64 64"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                class="path"
                              ></path>
                            </svg>
                            <span style={{ marginLeft: "10px" }}>
                              Electro Mechanical Lifts
                            </span>
                          </label>
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Utilities:<span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <br></br>
                        <div className="form-check form-check-primary">
                          <label class="containerCheck">
                            <input
                              type="checkbox"
                               disabled={formSubmitted && loading}
                              className="form-check-input"
                              name="water"
                              value={1}
                              onChange={handleUtilityChange}
                            />
                            <svg
                              viewBox="0 0 64 64"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                class="path"
                              ></path>
                            </svg>
                            <span style={{ marginLeft: "10px" }}>Water</span>
                          </label>
                        </div>
                        <div className="form-check form-check-success">
                          <label class="containerCheck">
                            <input
                              type="checkbox"
                              className="form-check-input"
                               disabled={formSubmitted && loading}
                              name="gas"
                              value={1}
                              onChange={handleUtilityChange}
                            />
                            <svg
                              viewBox="0 0 64 64"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                class="path"
                              ></path>
                            </svg>
                            <span style={{ marginLeft: "10px" }}>Gas</span>
                          </label>
                        </div>
                        <div className="form-check form-check-info">
                          <label class="containerCheck">
                            <input
                              type="checkbox"
                              className="form-check-input"
                               disabled={formSubmitted && loading}
                              name="internet"
                              value={1}
                              onChange={handleUtilityChange}
                            />
                            <svg
                              viewBox="0 0 64 64"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                class="path"
                              ></path>
                            </svg>
                            <span style={{ marginLeft: "10px" }}>Internet</span>
                          </label>
                        </div>
                        <div className="form-check form-check-danger">
                          <label class="containerCheck">
                            <input
                              type="checkbox"
                              className="form-check-input"
                               disabled={formSubmitted && loading}
                              name="electricity"
                              value={1}
                              onChange={handleUtilityChange}
                            />
                            <svg
                              viewBox="0 0 64 64"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                class="path"
                              ></path>
                            </svg>
                            <span style={{ marginLeft: "10px" }}>
                              Electricity
                            </span>
                          </label>
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <br></br>
                <button
                  id="mainbutton"
                  title="Review Your Information Before Submitting"
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
export default CollateralBuilding;
