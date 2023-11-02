import React, { useEffect, useState } from "react";
import { getAllBanks } from "../../../Actions/UserAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import swal from "sweetalert2";
import { Avatar } from "@mui/material";
import createCache from "@emotion/cache";
import ReactDOMServer from "react-dom/server";
import styles from "../User/pages/Modal.module.css";
import BackdropLoader from "../common/BackdropLoader";
import "./BankInfo.css"; // Import the CSS file
import { darkTheme, muiCache } from "../Admin/forms/errorConstants";
const BankInfo = () => {
  const { banks, loading } = useSelector((state) => state.banks);
  const dispatch = useDispatch();
  const [responsive] = useState("scroll");
  const [tableBodyMaxHeight] = useState("");
  const [searchBtn] = useState(true);
  const [downloadBtn] = useState(true);
  const [printBtn] = useState(true);
  const [viewColumnBtn] = useState(true);
  const [filterBtn] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [page, setpage] = useState(10);

  useEffect(() => {
    dispatch(getAllBanks());
  }, [dispatch]);

  const bankData =
    banks && Array.isArray(banks)
      ? banks.map((item) => ({
          id: item._id,
          bank_name: item.bank_name,
          bank_email: item.bank_email,
          logo: item?.logo?.url,
          bank_phoneNo: item.bank_phoneNo,
          loan_types: item.loan_types,
        }))
      : [];

  const usersCol = [
    {
      name: "logo",
      label: "Logo",
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
      name: "loan_types",
      label: "Loan Type",
      options: {
        customBodyRender: (loan_types) => {
          return (
            <OpenInNewIcon
              style={{ color: "blue" }}
              onClick={() => viewImage(loan_types)}
            />
          );
        },
      },
    },
  ];
  const createTable = (array) => {
    return (
      <div className="table-responsive1">
        <table class="table1 table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.type}</td>
                  <td>{item.rate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  const viewImage = (loan_types) => {
    if (loan_types.length) {
      swal.fire({
        html: ReactDOMServer.renderToStaticMarkup(createTable(loan_types)),
      });
    } else
      swal.fire({
        title: "Data is not provided!",
      });
  };
  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive: responsive,
    downloadBtn: true,
    tableBodyHeight: "100vh",
    tableBodyMaxHeight,
    selectableRows: false,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    onChangeRowsPerPage(numberOfRows) {
      setRowsPerPage(numberOfRows);
    },
    onChangePage(page) {
      setpage(page);
    },
  };

  return (
    <>
    {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h2 className="bankinfoheader" id={styles.headers}>
        Bank Information
      </h2>
      <div className={styles.imageremover}>
        <div className="page-header">
          <h3 className="page-title">{/* {'DO NOT REMOVE IT '} */}</h3>
          <nav aria-label="breadcrumb1">
            <ol className="breadcrumb1">
              <li className="breadcrumb-item1">
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

      <div>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={darkTheme}>
            <MUIDataTable
              title={"Bank Details"}
              data={bankData}
              columns={usersCol}
              options={options}
            />
          </ThemeProvider>
        </CacheProvider>
      </div>
    </>
  );
};

export default BankInfo;
