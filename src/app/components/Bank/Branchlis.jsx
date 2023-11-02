import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackdropLoader from "../common/BackdropLoader";
import { getMyBranches } from "../../../Actions/UserAction";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import styles from "./Modle.module.css";
import moment from "moment";
import { darkTheme, muiCache } from "../Admin/forms/errorConstants";
import "./BankInfo.css"; // Import the CSS file
const BranchList = () => {
  const dispatch = useDispatch();
  //////////////fetching data
  const { myBankBranches, loading } = useSelector(
    (state) => state.myBankBranches
  );

  useEffect(() => {
    dispatch(getMyBranches());
  }, [dispatch]);
  const myBankBranchesRow = [];
  myBankBranches &&
    Array.isArray(myBankBranches) &&
    myBankBranches.forEach((item) => {
      myBankBranchesRow.unshift({
        id: item._id,
        bank_name: item.bank_name,
        branch_name: item.branch_name,
        branch_code: item.branch_code,
        branch_email: item.branch_email,
        branch_phoneNo: item.branch_phoneNo,
        location: item.location,
        manager: item.manager,
        createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
      });
    });

  const dynamicHeight = Math.min(myBankBranchesRow.length * 18 + 10, 80) + "vh";

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

  const column = [
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
      name: "branch_code",
      label: "Branch Code",
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
      name: "createdAt",
      label: "Created Date",
      options: { filterOptions: { fullWidth: true } },
    },
  ];
  return (
    <div>
    {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h2 id={styles.headers}>My Branches</h2>
      <div className={styles.imageremover}>
        <div className="page-header">
          <h3 className="page-title">{/* {'DO NOT REMOVE IT '} */}</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Display Branches
                </a>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                Branches
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card-body">
            <div>
             
              {
                //page===1?
                <CacheProvider value={muiCache}>
                  <ThemeProvider theme={darkTheme}>
                    <MUIDataTable
                      title={"Branch Details"}
                      data={myBankBranchesRow}
                      columns={column}
                      options={options}
                    />
                  </ThemeProvider>
                </CacheProvider>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchList;
