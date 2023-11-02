import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import createCache from "@emotion/cache";
import { Avatar } from "@mui/material";
import {
  activate,
  getAllBanks,
  getAllCompanies,
  getAllUsers,
} from "../../../../Actions/UserAction";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import moment from "moment";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import BackdropLoader from "../../common/BackdropLoader";
import { ACTIVATE_RESET } from "../../../../Constants/UserConstants";
import { DATA_TABLE_OPTIONS } from "../../CodeSegments";
import PDFGenerator from "./PDFGenerator";
import { darkTheme, muiCache } from "../forms/errorConstants";
import "../../Bank/BankInfo.css"; // Import the CSS file
import male from "../../../../assets/images/male.png";
import female from "../../../../assets/images/female.png";
import logomain from "../../../../assets/images/logocam.png";

const DeactivatedUsers = () => {
  const { companies } = useSelector((state) => state.companies);
  const { error, success } = useSelector((state) => state.profile);
  const { users, loading } = useSelector((state) => state.users);
  const { banks } = useSelector((state) => state.banks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllBanks());
  }, [dispatch]);
  const ReActivate = (id) => {
    dispatch(activate({ id: id }));
  };
  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "User Account Reactivated",
        type: "success",
        text: "User Account information reactivated successfully",
        background: "white",
      });
      dispatch({ type: ACTIVATE_RESET });
      dispatch(getAllBanks());
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
    if (!users[0]) dispatch(getAllUsers());
  }, [dispatch, users]);
  const usersCol = [
    {
      name: "id",
      label: "Activate",
      options: {
        filter: false,
        innerWidth: 14,
        customBodyRender: (value) => {
          return (
            <>
              {/* <Link to={`/profile/${value}`}>
                <OpenInNew />
              </Link> */}
              <Button onClick={() => ReActivate(value)}>Activate</Button>
            </>
          );
        },
        setCellProps: () => ({
          style: { minWidth: "80px", maxWidth: "100px" },
        }),
      },
    },
    {
      name: "image",
      label: "Image",
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
      name: "name",
      label: "Name",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "email",
      label: "Email",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Type",
      label: "Type",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "status",
      label: "Status",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "phoneNo",
      label: "Phone Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "createdAt",
      label: "created At",
      options: { filterOptions: { fullWidth: true } },
    },
  ];
  const header1 = ["Name", "Email", "Phone", "Type", "Status"];
  const userData = [];

  users &&
    Array.isArray(users) &&
    users
      .filter((item) => item.status === "inactive")
      .map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        phoneNo: item.phoneNo,
        Type: "Personal",
        status: item.status,
        createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
        image: item?.profile?.url
          ? item?.profile?.url
          : item.gender == "Male" || item.gender == "male"
          ? male
          : female,
      }))
      .forEach((userDataItem) => {
        userData.unshift(userDataItem);
      });

  companies &&
    Array.isArray(companies) &&
    companies
      .filter((item) => item.status === "inactive")
      .map((item) => ({
        id: item._id,
        name: item.cname,
        email: item.cemail,
        phoneNo: item.cphoneNo,
        Type: "Bussiness",
        status: item.status,
        logo: item?.logo?.url ? item?.logo?.url : logomain,
        createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
      }))
      .forEach((userDataItem) => {
        userData.unshift(userDataItem);
      });

  banks &&
    Array.isArray(banks) &&
    banks
      .filter((item) => item.status === "inactive")
      .map((item) => ({
        id: item._id,
        name: item.bank_name,
        email: item.bank_email,
        phoneNo: item.bank_phoneNo,
        Type: "Bank",
        status: item.status,
        image: item?.logo?.url,
        createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
      }))
      .forEach((userDataItem) => {
        userData.unshift(userDataItem);
      });

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
        <h3 className="page-title">Deactivated Users List</h3>
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
            title={"Deactivated Accounts"}
            data={userData}
            columns={usersCol}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      <PDFGenerator
        header={header1}
        data={userData}
        DocumentTitle="Deactivated Account List"
      />
    </div>
  );
};
export default DeactivatedUsers;
