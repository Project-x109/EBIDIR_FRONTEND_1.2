import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBLoan } from "../../../../Actions/LoanAction";
import { Link } from "react-router-dom";
import OpenInNew from "@mui/icons-material/OpenInNew";
import BackdropLoader from "../../common/BackdropLoader";
import styles from "./Modal.module.css";
import { darkTheme, muiCache } from "../../Admin/forms/errorConstants";
import "../Buton.css";
const MyBLoans = () => {
  // setups
  const dispatch = useDispatch();
  const { mybloan, loading } = useSelector((state) => state.mybloan);
  const [responsive] = useState("scroll");
  const [tableBodyHeight] = useState("800px");
  const [searchBtn] = useState(true);
  const [downloadBtn] = useState(true);
  const [printBtn] = useState(true);
  const [viewColumnBtn] = useState(true);
  const [filterBtn] = useState(true);
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
    tableBodyHeight,
    onTableChange: (action, state) => {},
  };
  const column = [
    {
      name: "Bank",
      label: "Bank",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "branch",
      label: "Branch",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Types_of_Collateral",
      label: "Collateral",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "status",
      label: "Status",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "loan_amount",
      label: "Loan Amount(ETB)",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Loan_Payment_Period",
      label: "Period(Month)",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "Monthly_payment",
      label: "Monthly payment(ETB)",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "score",
      label: "Score",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "rank",
      label: "Rank",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "id",
      label: "Loan Detail",
      options: {
        filter: false,
        innerWidth: 14,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Link to={"/bloaninfo/" + value}>
              <OpenInNew />
            </Link>
          );
        },
      },
    },
  ];
  const Bloanrows = Array.isArray(mybloan)
    ? mybloan.map((item) => ({
        id: item._id,
        loan_amount: new Intl.NumberFormat().format(Number(item.loan_amount)),
        Bank: item.Bank,
        branch: item.Branch?.branch_name,
        Reason_for_loan: item.Reason_for_loan,
        Loan_Payment_Period: item.Loan_Payment_Period,
        status: item.status,
        Type_Of_Loan: item.Type_Of_Loan,
        Types_of_Collateral: item.Types_of_Collateral,
        Monthly_payment: new Intl.NumberFormat().format(
          Number(Math.round(item.Monthly_payment * 100) / 100)
        ),
        interest: item.interest,
        score: item.score,
        rank: item.rank,
      }))
    : [];

  // Reverse the array if needed
  Bloanrows.reverse();

  useEffect(() => {
    dispatch(getBLoan());
  }, [dispatch]);

  return (
    <div>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h2 id={styles.headers}>My Loans</h2>
      <div className={styles.imageremover}>
        <div className="page-header">
          <h3 className="page-title">{/* {'DO NOT REMOVE IT '} */}</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Display Loan
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Request Personal Loan
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card-body">
            <div>
              <CacheProvider value={muiCache}>
                <ThemeProvider theme={darkTheme}>
                  <MUIDataTable
                    title={"Loan Details"}
                    data={Bloanrows}
                    columns={column}
                    options={options}
                  />
                </ThemeProvider>
              </CacheProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyBLoans;
