import React, { useEffect } from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { deactivateAccount, getAllUsers } from "../../../../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
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
import male from "../../../../assets/images/male.png";
import female from "../../../../assets/images/female.png";
import "../../Bank/BankInfo.css"; // Import the CSS file

const PersonalUsers = () => {
  const { users, loading } = useSelector((state) => state.users);
  const { success, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
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
      label: "Full Name",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "email",
      label: "Email",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "gender",
      label: "Gender",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "phoneNo",
      label: "Phone Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "TIN_Number",
      label: "TIN Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "score",
      label: "score",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "createdAt",
      label: "createdAt",
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
  const header1 = ["Name", "Email", "Gender", "Phone", "Tin", "Score"];
  const userData = users
    .filter((item) => (item?.status != "inactive" &&item?.role!="admin"))
    .map((item) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      gender: item.gender,
      phoneNo: item.phoneNo,
      TIN_Number: item.TIN_Number,
      score: item.score,
      image: item?.profile?.url
        ? item?.profile?.url
        : item.gender == "Male" || item.gender == "male"
        ? male
        : female,
      Scanned: item?.scannedFiles[0]?.url,
      createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
    }))
    .reverse();

  const dynamicHeight = Math.min(userData.length * 18 + 10, 80) + "vh";
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
        <h3 className="page-title">Personal Loan Users</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Users
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Personal
            </li>
          </ol>
        </nav>
      </div>

      <CacheProvider value={muiCache}>
        <ThemeProvider theme={darkTheme}>
          <MUIDataTable
            title={"Personal Loan User's List"}
            data={userData}
            columns={usersCol}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      <PDFGenerator
        header={header1}
        data={userData}
        DocumentTitle="Personal Loan Users List"
      />
    </div>
  );
};
export default PersonalUsers;
