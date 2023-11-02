import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import {
  activate,
  getAllUsers,
  getAllAgents,
} from "../../../../Actions/UserAction";
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

const DeactivatedAgents = () => {
  const { error, success } = useSelector((state) => state.profile);
  const { users, loading } = useSelector((state) => state.users);
  const { agents } = useSelector((state) => state.agents);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAgents());
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
      dispatch(getAllAgents());
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

  agents &&
    Array.isArray(agents) &&
    agents
      .filter((item) => item.status === "inactive")
      .map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        phoneNo: item.phoneNo,
        Type: "Agent",
        status: item.status,
        image: item?.profile?.url
          ? item?.profile?.url
          : item.gender == "Male" || item.gender == "male"
          ? male
          : female,
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
        <h3 className="page-title">Deactivated Agents List</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Agents
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Agents List
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
export default DeactivatedAgents;
