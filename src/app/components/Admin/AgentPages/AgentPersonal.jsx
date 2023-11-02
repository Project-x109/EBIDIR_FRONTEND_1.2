import React, { useEffect } from "react";
import { getAllUsersAgent } from "../../../../Actions/UserAction";
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
import PDFGenerator from "../AdminPages/PDFGenerator";
import { darkTheme, muiCache } from "../forms/errorConstants";
import male from "../../../../assets/images/male.png"
import female from "../../../../assets/images/female.png"
import "../../Bank/BankInfo.css"; // Import the CSS file

const AgentPersonalUsers = () => {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsersAgent());
  }, [dispatch]);

  const usersCol = [
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
  let  userData = Array.isArray(users)
    ? users.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        gender: item.gender,
        phoneNo: item.phoneNo,
        TIN_Number: item.TIN_Number,
        score: item.score,
        image: item?.profile?.url?item?.profile?.url:(item.gender=="Male"||item.gender=="male"?male:female),
        Scanned: item?.scannedFiles[0]?.url,
        createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
      }))
    : [];
    userData=userData?.reverse()
  const dynamicHeight = Math.min(userData.length * 30 + 40, 120) + "vh";
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
export default AgentPersonalUsers;
