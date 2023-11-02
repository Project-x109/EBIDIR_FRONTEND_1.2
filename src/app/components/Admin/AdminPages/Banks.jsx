import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { deactivateAccount, getAllBanks } from "../../../../Actions/UserAction";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import { Avatar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment";
import BackdropLoader from "../../common/BackdropLoader";
import { DATA_TABLE_OPTIONS } from "../../CodeSegments";
import { DEACTIVATE_ACCOUNT_RESET } from "../../../../Constants/UserConstants";
import Swal from "sweetalert2";
import PDFGenerator from "./PDFGenerator";
import { darkTheme, muiCache } from "../forms/errorConstants";
import "../../Bank/BankInfo.css"; // Import the CSS file
const Banks = () => {
  const { banks, loading } = useSelector((state) => state.banks);
  const { success, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
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
      dispatch(getAllBanks());
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
      dispatch(getAllBanks());
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
              className="text-danger"
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
      name: "bank_name",
      label: "Name",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "bank_email",
      label: "Email",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "bank_phoneNo",
      label: "Phone Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "createdAt",
      label: "createdAt",
      options: { filterOptions: { fullWidth: true } },
    },
  ];
  const header1 = ["Name", "Email", "Phone"];
  const bankData =
    banks.map((item) => ({
      id: item._id,
      bank_name: item.bank_name,
      bank_email: item.bank_email,
      bank_phoneNo: item.bank_phoneNo,
      logo: item?.logo?.url,
      createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
    })) || [];
  const dynamicHeight = Math.min(bankData.length * 18 + 10, 80) + "vh";
  const options = DATA_TABLE_OPTIONS(dynamicHeight);
  return (
    <div>

      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h1>Available Banks Record</h1>
      <div className="page-header">
        <h3 className="page-title">Registered Banks</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Users
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Banks
            </li>
          </ol>
        </nav>
      </div>

      <CacheProvider value={muiCache}>
        <ThemeProvider theme={darkTheme}>
          <MUIDataTable
            title={"Banks List"}
            data={bankData}
            columns={usersCol}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
      <PDFGenerator
        header={header1}
        data={bankData}
        DocumentTitle="Availabel Banks List"
      />
    </div>
  );
};
export default Banks;
