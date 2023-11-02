import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import createCache from "@emotion/cache";
import { Avatar } from "@mui/material";
import {
  activate,
  getBranchByBank,
} from "../../../../Actions/UserAction";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import moment from "moment";
import { CacheProvider } from "@emotion/react";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import BackdropLoader from "../../common/BackdropLoader";
import { ACTIVATE_RESET } from "../../../../Constants/UserConstants";
import {ThemeProvider } from "@mui/material/styles";
import PDFGenerator from "./PDFGenerator";
import { darkTheme, muiCache } from "../forms/errorConstants";
import styles from "../../Bank/Modle.module.css";
import { Autocomplete, TextField } from "@mui/material";
import { Form } from "react-bootstrap";
import { INTEREST_RATE } from "../../../Dataset/DataCollections";
import "../../Bank/BankInfo.css"; // Import the CSS file
const DeactivatedBranches = () => {
  const dispatch = useDispatch();
  const { bankBranches, fetching, loading, BranchLoader } = useSelector(
    (state) => state.bankBranches
  );
  const { success, error } = useSelector((state) => state.profile);
  const [bank, setBank] = useState("Bunna Bank");
  const [BRANCH, setBRANCH] = useState([]);
  const Bank = Object.keys(INTEREST_RATE[0]);
  const [view, setView] = React.useState("list");
  const [page, setpage] = useState(1);
  const [responsive] = useState("standard");
  const [tableBodyMaxHeight] = useState("");
  const [searchBtn] = useState(true);
  const [downloadBtn] = useState(true);
  const [printBtn] = useState(true);
  const [viewColumnBtn] = useState(true);
  const [filterBtn] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dynamicHeight = Math.min(BRANCH.length * 18 + 10, 80) + "vh";
  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive: responsive,
    selectableRows: false,
    downloadBtn: true,
    tableBodyHeight: dynamicHeight,
    tableBodyMaxHeight,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    onChangeRowsPerPage(numberOfRows) {
      setRowsPerPage(numberOfRows);
    },
    onChangePage(page) {
      setpage(page);
    },
    onTableChange: (action, state) => {},
  };

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
      dispatch(getBranchByBank({ bank_name: bank }));
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
      name: "bank_name",
      label: "Bank Name",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "branch_name",
      label: "Branch Name",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "branch_email",
      label: "Branch Email",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "branch_phoneNo",
      label: "Phone Number",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "location",
      label: "Location",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "manager",
      label: "Manager",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "branch_code",
      label: "Branch Code",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "createdAt",
      label: "Created Date",
      options: { filterOptions: { fullWidth: true } },
    },
  ];

  const handleBank = (value) => {
    setBank(value);
    dispatch(getBranchByBank({ bank_name: value }));
  };
  useEffect(() => {
    dispatch(getBranchByBank({ bank_name: bank }));
  }, [dispatch, bank]);
  const header1 = [
    "Bank Name",
    "Branch Name",
    "Email",
    "Phone",
    "Location",
    "Manager",
  ];
  useEffect(() => {
    const branchData = bankBranches
      .filter((item) => item.status === "inactive")
      .map((branch) => [
        branch._id,
        branch.bank_name,
        branch.branch_name,
        branch.branch_email,
        branch.branch_phoneNo,
        branch.location,
        branch.manager,
        branch.branch_code,
        moment(branch.createdAt).utc().format("DD-MM-YYYY"),
      ]);
    setBRANCH(branchData);
  }, [bank, fetching, bankBranches]);

  const tableData = BRANCH.map((item) => {
    const [, ...rest] = item; // Destructure the array, omitting the first element
    return Object.values(rest);
  });
  return (
    <div>
     {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
          {fetching && !bankBranches && <BranchLoader />}
        </div>
      )}
      <h2 id={styles.headers}>Branches List</h2>
      <div className={styles.imageremover}>
        <div className="page-header">
          <h3 className="page-title">{/* {'DO NOT REMOVE IT '} */}</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Available Branches
                </a>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                Select Available Banks
              </li>
            </ol>
          </nav>
        </div>
      </div>
     

      <div className="col-md-4">
        <Form.Group className="row">
          <label className="col-sm-3 col-form-label">
            <h5>
              Bank:<span className="text-danger">*</span>
            </h5>
          </label>
          <div className="col-sm-9">
            <Autocomplete
              id="Bank"
              style={{
                border: "2px solid #eaebef",
                borderRadius: "6px",
              }}
              options={Bank}
              value={bank}
              onChange={(e, value) => handleBank(value)}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              noOptionsText={"No Available Data"}
              renderInput={(params) => (
                <TextField
                  required
                  name="Bank"
                  style={{ paddingLeft: "13px" }}
                  {...params}
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                  className="form-control"
                  color="warning"
                  sx={{ input: { color: "#343434" } }}
                />
              )}
            />
          </div>
        </Form.Group>
      </div>

      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card-body">
            <div>
              <CacheProvider value={muiCache}>
                <ThemeProvider theme={darkTheme}>
                  <MUIDataTable
                    title={"Branch Details"}
                    data={BRANCH}
                    columns={usersCol}
                    options={options}
                  />
                </ThemeProvider>
              </CacheProvider>
              <PDFGenerator
                header={header1}
                data={tableData}
                DocumentTitle={bank + " " + "Deactivated Users List"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeactivatedBranches;
