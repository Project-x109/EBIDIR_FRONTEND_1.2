import React, { useEffect } from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
  deactivateAccount,
  getAllAgents,
} from "../../../../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import { Avatar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import moment from "moment";
import BackdropLoader from "../../common/BackdropLoader";
import { DATA_TABLE_OPTIONS } from "../../CodeSegments";
import { DEACTIVATE_ACCOUNT_RESET } from "../../../../Constants/UserConstants";
import Swal from "sweetalert2";
import PDFGenerator from "./PDFGenerator";
import { darkTheme, muiCache } from "../forms/errorConstants";
import male from "../../../../assets/images/male.png";
import female from "../../../../assets/images/female.png";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import "../../Bank/BankInfo.css"; // Import the CSS file
const AgentUsers = () => {
  const { agents, loading } = useSelector((state) => state.agents);
  const { success, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAgents());
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
      name: "createdAt",
      label: "createdAt",
      options: { filterOptions: { fullWidth: true } },
    },

    {
      name: "id",
      label: "User Lists",
      options: {
        customBodyRender: (params) => {
          return (
            <Link
              to={"/admin/agentcreatedusers/"+params}
              className="text-blue-600 hover:bg-blue-200 p-1 rounded-full bg-blue-100"
            >
              <OpenInNew />
            </Link>
          );
        },
      },
    },
  ];
  const header1 = ["Name", "Email", "Gender", "Phone"];
  const userData = agents?.filter((item) => item?.status != "inactive").map((item) => ({
      id: item._id,
      name: item.name,
      email: item.email,
      gender: item.gender,
      phoneNo: item.phoneNo,
      image: item?.profile?.url
        ? item?.profile?.url
        : item.gender == "Male" || item.gender == "male"
        ? male
        : female,
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
      <h1>Agents Record</h1>
      <div className="page-header">
        <h3 className="page-title">Agents List</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Agents
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Agents
            </li>
          </ol>
        </nav>
      </div>

      <CacheProvider value={muiCache}>
        <ThemeProvider theme={darkTheme}>
          <MUIDataTable
            title={"Agents List"}
            data={userData}
            columns={usersCol}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      <PDFGenerator
        header={header1}
        data={userData}
        DocumentTitle="Agents List"
      />
    </div>
  );
};
export default AgentUsers;
