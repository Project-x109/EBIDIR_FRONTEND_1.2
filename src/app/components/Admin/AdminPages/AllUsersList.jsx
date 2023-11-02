import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import {
  deactivateAccount,
  getAllCompanies,
  getAllUsers,
  getAllBanks,
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

const AllUsers = () => {
  const { companies, loading } = useSelector((state) => state.companies);
  const { success, error } = useSelector((state) => state.profile);
  const { users } = useSelector((state) => state.users);
  const { banks } = useSelector((state) => state.banks);

  const dispatch = useDispatch();
  // const { loading } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllBanks());
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
  const userData = [
    ...users
      .filter(
        (item) =>
          item.role === "user" ||
          item.role === "company" ||
          item.role === "bank"
      )
      .map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        phoneNo: item.phoneNo,
        TIN_Number: item.TIN_Number,
        score: item.score,
        image: item?.profile?.url
          ? item?.profile?.url
          : item.gender == "Male" || item.gender == "male"
          ? male
          : female,
        Scanned: item?.scannedFiles[0]?.url,
        role: item?.role,
        createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
      })),
    ...companies.map((item) => ({
      id: item._id,
      name: item.cname,
      email: item.cemail,
      phoneNo: item.cphoneNo,
      TIN_Number: item.CTIN_Number,
      score: item.score,
      image: item?.logo?.url ? item?.logo?.url : logomain,
      Scanned: item?.scannedFiles[0]?.url,
      role: item?.role,
      createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
    })),
    ...banks.map((item) => ({
      id: item._id,
      name: item.bank_name,
      email: item.bank_email,
      phoneNo: item.bank_phoneNo,
      image: item?.logo?.url,
      role: item?.role,
      createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
    })),
  ];
  const dynamicHeight = Math.min(userData.length * 18 + 10, 80) + "vh";
  const options = DATA_TABLE_OPTIONS(dynamicHeight);
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

      <CacheProvider value={muiCache}>
        <ThemeProvider theme={darkTheme}>
          <MUIDataTable
            title={"All User's List"}
            data={userData}
            columns={usersCol}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      <PDFGenerator
        header={header1}
        data={userData}
        DocumentTitle="All Users List"
      />
    </div>
  );
};
export default AllUsers;
