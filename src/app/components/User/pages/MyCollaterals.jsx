import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getMycars } from "../../../../Actions/CarAction";
import { useEffect, useState } from "react";
import { getMyBuilding } from "../../../../Actions/BuildingAction";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import BackdropLoader from "../../common/BackdropLoader";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import swal from "sweetalert2";
import styles from "./Modal.module.css";
import { darkTheme, muiCache } from "../../Admin/forms/errorConstants";
import "../Buton.css";
const MyCollaterals = () => {
  // setups
  const dispatch = useDispatch();
  const { mycars, loading } = useSelector((state) => state.mycars);
  const { myBuilding } = useSelector((state) => state.myBuilding);

  const carData = Array.isArray(mycars)
    ? mycars.map((item) => {
        const carimage = item.carImage
          .map((car) => ({
            url: car.url,
          }))
          .reverse();

        return {
          id: item._id,
          Type_of_Vehicle: item.Type_of_Vehicle,
          Brand_of_Vehicle: item.Brand_of_Vehicle,
          Model_of_Vehicle: item.Model_of_Vehicle,
          Plate_Number: item.Plate_Number,
          transmission: item.Transmission,
          Mileage: new Intl.NumberFormat().format(Number(item.Mileage)),
          Number_of_Cylinders: item.Number_of_Cylinders,
          Horsepower: item.Horsepower,
          Country_of_Manufacture: item.Country_of_Manufacture,
          Collateral_Coverage_Ratio:
            Math.round(item.Collateral_Coverage_Ratio * 100) / 100,
          carScore: item.carScore,
          Transportation_Capacity: item.Transportation_Capacity,
          Year_of_Manufacture: item.Year_of_Manufacture,
          carImage: carimage,
          image: carimage[0]?.url,
          createdAt: item.createdAt,
        };
      })
    : [];
  carData.reverse();

  const BuildingData = Array.isArray(myBuilding)
    ? myBuilding.map((item) => {
        const BILDINGimage = item.blueprint
          .map((Building) => ({
            url: Building.url,
          }))
          .reverse();

        return {
          id: item._id,
          Type_of_Building: item.Type_of_Building,
          Total_Area: item.Total_Area,
          Location: item.Location,
          Distance_from_Main_Road: item.Distance_from_Main_Road,
          Construction_Status: item.Construction_Status,
          Purpose_of_the_Building: item.Purpose_of_the_Building,
          Year_of_Construction: item.Year_of_Construction,
          Building_Score: item.Building_Score,
          blueprintId: item.blueprintId,
          utility: item.utility,
          BUILDINGIMAGE: BILDINGimage,
          BImage: BILDINGimage[0]?.url,
          createdAt: item.createdAt,
        };
      })
    : [];
  BuildingData.reverse();

  const [view1, setView1] = React.useState("list");

  const [page1, setpage1] = useState(1);
  const [responsive] = useState("scroll");
  const [tableBodyMaxHeight] = useState("");
  const [searchBtn] = useState(true);
  const [downloadBtn] = useState(true);
  const [printBtn] = useState(true);
  const [viewColumnBtn] = useState(true);
  const [filterBtn] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setpage] = useState(1);
  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive: responsive,
    downloadBtn: true,
    tableBodyHeight: "100vh",
    tableBodyMaxHeight,
    selectableRows: false,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    onChangeRowsPerPage(numberOfRows) {
      setRowsPerPage(numberOfRows);
    },
    onChangePage(page) {
      setpage(page);
    },

    onTableChange: (action, state) => {},
  };

  const options1 = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    downloadBtn: true,
    tableBodyHeightBuilding: "100vh",
    tableBodyMaxHeight,
    selectableRows: false,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    onTableChange: (action, state) => {},
  };

  const viewImage = (src) => {
    if (src)
      swal.fire({
        imageUrl: src,
        imageWidth: 600,
        imageHeight: 400,
      });
    else
      swal.fire({
        title: "Image is not provided!",
      });
  };

  const Ccolumn = [
    {
      name: "Type_of_Vehicle",
      label: "Type of Vehicle",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Brand_of_Vehicle",
      label: "Brand of Vehicle",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Model_of_Vehicle",
      label: "Model of Vehicle",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Plate_Number",
      label: "Plate Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Mileage",
      label: "Mileage",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "carScore",
      label: "Car Score",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "image",
      label: "Image",
      options: {
        customBodyRender: (parmas) => {
          return (
            <OpenInNewIcon
              className={styles.imageremover}
              style={{ color: "blue" }}
              onClick={() => viewImage(parmas)}
            />
          );
        },
      },
    },
  ];
  const Bcolumn = [
    {
      name: "Type_of_Building",
      label: "Type of Building",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Total_Area",
      label: "Total Area(m^2)",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Location",
      label: "Location",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Distance_from_Main_Road",
      label: "Distance from Main_Road(m)",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Purpose_of_the_Building",
      label: "Purpose of the Building",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Building_Score",
      label: "Building Score",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "BImage",
      label: "Blueprint",

      options: {
        customBodyRender: (parmas) => {
          return (
            <OpenInNewIcon
              className={styles.imageremover}
              style={{ color: "blue" }}
              onClick={() => viewImage(parmas)}
            />
          );
        },
      },
    },
  ];

  const handleChange1 = (event, nextView) => {
    setView1(nextView);
  };
  useEffect(() => {
    dispatch(getMycars());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getMyBuilding());
  }, [dispatch]);
  return (
    <div style={{ textTransform: "capitalize" }}>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h2 id={styles.headers}>My Collaterals</h2>
      <div className={styles.imageremover}>
        <div className="page-header">
          <h3 className="page-title">{/* {'DO NOT REMOVE IT '} */}</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  My Loan
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                My Collaterals
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-12 grid-margin">
          <div id={styles.cardedittor} className="card-body">
            <div className="row">
              <div className="col-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <ToggleButtonGroup
                      orientation="horizontal"
                      value={view1}
                      exclusive
                      onChange={handleChange1}
                      style={{ backgroundColor: "#e4e9ec" }}
                      size={"string"}
                    >
                      <ToggleButton
                        value="list"
                        aria-label="list"
                        className="text-white"
                        onClick={(e) => setpage1(1)}
                      >
                        <ViewListIcon />
                      </ToggleButton>
                      <ToggleButton
                        value="module"
                        aria-label="module"
                        className="text-white"
                        onClick={(e) => setpage1(2)}
                      >
                        <ViewModuleIcon />
                      </ToggleButton>
                      <ToggleButton
                        value="quilt"
                        aria-label="quilt"
                        className="text-white"
                        onClick={(e) => setpage1(3)}
                      >
                        <ViewQuiltIcon />
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <div>
                      <h4 className="card-title">Collateral Information</h4>
                      {page1 === 1 ? (
                        <CacheProvider value={muiCache}>
                          <ThemeProvider theme={darkTheme}>
                            <MUIDataTable
                              title={"Vehicle Collateral Details"}
                              data={carData}
                              columns={Ccolumn}
                              options={options}
                            />
                          </ThemeProvider>
                        </CacheProvider>
                      ) : page1 === 2 ? (
                        <CacheProvider value={muiCache}>
                          <ThemeProvider theme={darkTheme}>
                            <MUIDataTable
                              title={"Building Collateral Details"}
                              data={BuildingData}
                              columns={Bcolumn}
                              options={options1}
                            />
                          </ThemeProvider>
                        </CacheProvider>
                      ) : (
                        <div>
                          <CacheProvider value={muiCache}>
                            <ThemeProvider theme={darkTheme}>
                              <MUIDataTable
                                title={"Vehicle Collateral Details"}
                                data={carData}
                                columns={Ccolumn}
                                options={options}
                              />
                            </ThemeProvider>
                          </CacheProvider>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <CacheProvider value={muiCache}>
                            <ThemeProvider theme={darkTheme}>
                              <MUIDataTable
                                title={"Building Collateral Details"}
                                data={BuildingData}
                                columns={Bcolumn}
                                options={options}
                              />
                            </ThemeProvider>
                          </CacheProvider>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyCollaterals;
