import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
  deactivateAccount,
  getAllCompanies,
} from "../../../../Actions/UserAction";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import { Avatar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import moment from "moment";
import BackdropLoader from "../../common/BackdropLoader";
import { DATA_TABLE_OPTIONS } from "../../CodeSegments";
import { Link } from "react-router-dom";
import OpenInNew from "@mui/icons-material/OpenInNew";

import { DEACTIVATE_ACCOUNT_RESET } from "../../../../Constants/UserConstants";
import Swal from "sweetalert2";
import PDFGenerator from "./PDFGenerator";
import { darkTheme, muiCache } from "../forms/errorConstants";
import logomain from "../../../../assets/images/logocam.png";
import "../../Bank/BankInfo.css"; // Import the CSS file

const Companies = () => {
  const { companies } = useSelector((state) => state.companies);
  const { success, loading,error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

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
      name: "logo",
      options: {
        customBodyRender: (logo) => {
          return (
            <Avatar
              style={{ height: 60, width: 60 }}
              variant="circular"
              src={logo}
              alt="parmas.userImage"
            />
          );
        },
        setCellProps: () => ({ style: { minWidth: "40px", maxWidth: "80px" } }),
      },
    },
    {
      name: "cname",
      label: "Company Name",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "General_Manager",
      label: "General Manager",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "legal_status",
      label: "Legal Status",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "cemail",
      label: "Email",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "cphoneNo",
      label: "Phone Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "CTIN_Number",
      label: "TIN Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "score",
      label: "Score",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "createdAt",
      label: "Created At",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Scanned",
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
  const header1 = [
    "Manager",
    "Company Name",
    "Email",
    "Phone",
    "Legal Status",
    "Tin",
    "Score",
  ];
  const companyData = Array.isArray(companies)
    ? companies.map((item) => ({
        id: item._id,
        General_Manager: item.General_Manager,
        cname: item.cname,
        cemail: item.cemail,
        cphoneNo: item.cphoneNo,
        legal_status: item.legal_status,
        CTIN_Number: item.CTIN_Number,
        score: item.score,
        logo: item?.logo?.url ? item?.logo?.url : logomain,
        Scanned: item?.scannedFiles?.[0]?.url,
        createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
      }))
    : [];
  const dynamicHeight = Math.min(companyData.length * 18 + 10, 80) + "vh";
  const options = DATA_TABLE_OPTIONS(dynamicHeight);
  return (
    <div>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h1>Users Record</h1>
      <div className="page-header">
        <h3 className="page-title">Business Loan Users</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Users
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Company
            </li>
          </ol>
        </nav>
      </div>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={darkTheme}>
          <MUIDataTable
            title={"Business Loan Users List"}
            data={companyData}
            columns={usersCol}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      <PDFGenerator
        header={header1}
        data={companyData}
        DocumentTitle="Business Loan Users List"
      />
    </div>
  );
};
export default Companies;
