import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import {
  deactivateAccount,
  getAllCompanies,
  getAllUsers,
  getAllBanks,
  getAgentDetail,
} from "../../../../Actions/UserAction";
import moment from "moment";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import BackdropLoader from "../../common/BackdropLoader";
import { Link } from "react-router-dom";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { DATA_TABLE_OPTIONS } from "../../CodeSegments";
import { DEACTIVATE_ACCOUNT_RESET } from "../../../../Constants/UserConstants";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Swal from "sweetalert2";
import PDFGenerator from "./PDFGenerator";
import { darkTheme, muiCache } from "../forms/errorConstants";
import male from "../../../../assets/images/male.png";
import female from "../../../../assets/images/female.png";
import logomain from "../../../../assets/images/logocam.png";
import "../../Bank/BankInfo.css"; // Import the CSS file
import { Doughnut, Bar } from "react-chartjs-2";
import styles from "../../Bank/Modle.module.css";
import { useParams } from "react-router-dom";

const AgentCreatedUsers = () => {
  const { success, error } = useSelector((state) => state.profile);
  const { user, comp } = useSelector((state) => state.agentDetail);
  const { loading } = useSelector((state) => state.companies);
  const { id } = useParams();

  // const id="64c3c205b923826cbdf1e8d6";

  const dispatch = useDispatch();
  // const { loading } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAgentDetail(id));
  }, [dispatch, id]);

  const deactivate = (id) => {
    Swal.fire({
      title: "Please provide reason",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        dispatch(deactivateAccount({ id: id, reason: reason }));
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  };

  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "User Account Deactivated",
        type: "success",
        text: "User Account Deactivated successfully",
        background: "white",
      });
      dispatch({ type: DEACTIVATE_ACCOUNT_RESET });
      dispatch(getAllCompanies());
      dispatch(getAllUsers());
    }
    if (error) {
      Swal.fire({
        title: "" + error,
        type: "error",
        text: "Eror Occured: " + error,
        background: "pink",
      });
    }
  }, [error, success, dispatch]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "User Account Deactivated",
        type: "success",
        text: "User Account Deactivated successfully",
        background: "white",
      });
      dispatch({ type: DEACTIVATE_ACCOUNT_RESET });
      dispatch(getAllUsers(), getAllCompanies());
    }
    if (error) {
      Swal.fire({
        title: "" + error,
        type: "error",
        text: "Eror Occured: " + error,
        background: "pink",
      });
    }
  }, [error, success, dispatch]);

  const usersCol = [
    {
      name: "id",
      label: "Deactivate",
      options: {
        customBodyRender: (id) => {
          return (
            <PersonRemoveIcon
              className="text-danger cursor-pointer"
              onClick={() => deactivate(id)}
            />
          );
        },
      },
    },
    {
      name: "image",
      field: "image",
      options: {
        customBodyRender: (image) => {
          return (
            <Avatar
              style={{ height: 60, width: 60 }}
              variant="circular"
              src={image}
              alt="parmas.userImage"
            />
          );
        },
        setCellProps: () => ({ style: { minWidth: "40px", maxWidth: "80px" } }),
      },
    },
    {
      field: "name",
      name: "name",
      label: "name",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      field: "accounType",
      name: "accounType",
      label: "accounType",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      field: "email",
      name: "email",
      label: "Email",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      field: "phoneNo",
      name: "phoneNo",
      label: "Phone Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      field: "TIN_Number",
      name: "TIN_Number",
      label: "TIN Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      field: "score",
      name: "score",
      label: "score",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      field: "createdAt",
      name: "createdAt",
      label: "created At",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Scanned",
      field: "Scanned Files",
      options: {
        customBodyRender: (Scanned) => {
          return (
            <Link to={Scanned}>
              <OpenInNew />
            </Link>
          );
        },
        setCellProps: () => ({ style: { minWidth: "40px", maxWidth: "80px" } }),
      },
    },
  ];

  const header1 = ["Name", "Email", "Phone", "Tin", "Score"];

  const hasUserData = user && user.length > 0;
  const hasCompData = comp && comp.length > 0;

  const userData = [
    ...(hasUserData
      ? user?.map((item) => ({
          id: item._id,
          name: item.name,
          email: item.email,
          phoneNo: item.phoneNo,
          TIN_Number: item.TIN_Number,
          score: item.score,
          accounType: "Personal User",
          image: item?.profile?.url
            ? item?.profile?.url
            : item.gender == "Male" || item.gender == "male"
            ? male
            : female,
          Scanned: item?.scannedFiles[0]?.url,
          role: item?.role,
          createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
        }))
      : []),
    ...(hasCompData
      ? comp?.map((item) => ({
          id: item._id,
          name: item.cname,
          email: item.cemail,
          phoneNo: item.cphoneNo,
          TIN_Number: item.CTIN_Number,
          score: item.score,
          accounType: "Company User",
          image: item?.logo?.url ? item?.logo?.url : logomain,
          Scanned: item?.scannedFiles[0]?.url,
          role: item?.role,
          createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
        }))
      : []),
  ];

  const dynamicHeight = Math.min(userData.length * 18 + 10, 80) + "vh";
  const options = DATA_TABLE_OPTIONS(dynamicHeight);

  // Bar Chart data
  //Bar
  const data = {
    labels: ["Total Users", "Company", "Personal"],
    datasets: [
      {
        label: "users",
        data: [userData?.length, comp?.length, user?.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  const optionsChart = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const doughnutPieData = {
    datasets: [
      {
        data: [user?.length, comp?.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Personal Uses", "Business Users"],
  };

  const doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h1>All Accounts Record</h1>
      <div className="page-header">
        <h3 className="page-title">Business and Personal Loan Users</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Users
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Companies
            </li>
          </ol>
        </nav>
      </div>

      <div className="row" id={styles.cards}>
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Agent Report</h3>
              <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Bar Chart</h4>
                      <Bar data={data} options={optionsChart} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="aligner-wrapper">
                        <h4 className="card-title">Doughnut Chart</h4>
                        <Doughnut
                          data={doughnutPieData}
                          options={doughnutPieOptions}
                        />
                        <div className="absolute center-content">
                          <br></br>
                          <br></br>
                          <br></br>
                          <p
                            style={{ color: "#343434" }}
                            className="font-weight-normal  text-center mb-0 "
                          >
                            Total
                          </p>
                          <h6
                            style={{
                              color: "#343434",
                              fontSize: "12px",
                            }}
                            className="font-weight-normal  text-center mb-8 "
                          >
                            {Number(user?.length + comp?.length)}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Users List Created by the agent </h3>

          <CacheProvider value={muiCache}>
            <ThemeProvider theme={darkTheme}>
              <MUIDataTable
                title={"Users List"}
                data={userData}
                columns={usersCol}
                options={options}
              />
            </ThemeProvider>
          </CacheProvider>
        </div>
      </div>
      <PDFGenerator
        header={header1}
        data={userData}
        DocumentTitle="All Users List"
      />
    </div>
  );
};
export default AgentCreatedUsers;
