import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert2";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import UpdateIcon from "@mui/icons-material/Update";
import OpenInNew from "@mui/icons-material/OpenInNew";
import {
  UPDATE_BLOAN_RESET,
  UPDATE_LOAN_RESET,
} from "../../../Constants/LoanConstants";
import {
  clearErrors,
  getAllCompanies,
  getAllUsers,
} from "../../../Actions/UserAction";
import {
  getBankBLoans,
  getBankLoans,
  updateBLoan,
  updateLoan,
} from "../../../Actions/LoanAction";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BackdropLoader from "../common/BackdropLoader";
import PDFGenerator from "../Admin/AdminPages/PDFGenerator";
import download from "downloadjs";
import "./swal.css";

const LoanType = () => {
  // common data
  const { type, loan_status } = useParams();
  const { users } = useSelector((state) => state.users);
  const { companies } = useSelector((state) => state.companies);
  const { error, success } = useSelector((state) => state.update);
  const dispatch = useDispatch();
  const { BLisUpdated, BLerror } = useSelector((state) => state.profile);
  const { bankLoan } = useSelector((state) => state.bankLoan);
  const { bankBLoan } = useSelector((state) => state.bankBLoan);
  const [, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [pageSize, setPageSize] = useState(10);
  const { login, loading } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);
  useEffect(() => {
    if (!users[0]) dispatch(getAllUsers());
  }, [dispatch, users]);
  useEffect(() => {
    dispatch(getBankLoans({ id: login && login.id }));
  }, [dispatch, login]);
  useEffect(() => {
    dispatch(getBankBLoans({ id: login && login.id }));
  }, [dispatch, login]);

  useEffect(() => {
    if (error) {
      swal.fire({
        title: "" + error,
        type: "error",
        text: "Error Occured:" + error,
        background: "pink",
      });
      dispatch(clearErrors());
    }
    if (success) {
      swal.fire({
        title: "Loan Updated",
        type: "success",
        text: "Loan Updated Successfully",
        background: "white",
      });

      dispatch({ type: UPDATE_LOAN_RESET });
    }
    dispatch(getBankLoans());
  }, [dispatch, error, success]);

  useEffect(() => {
    if (BLerror) {
      swal.fire({
        title: "" + BLerror,
        type: "error",
        text: "Error Occured:" + BLerror,
        background: "pink",
      });
      dispatch(clearErrors());
    }
    if (BLisUpdated) {
      swal.fire({
        title: "Loan Updated",
        type: "success",
        text: "Loan Updated Successfully",
        background: "white",
      });
      dispatch({ type: UPDATE_BLOAN_RESET });
      handleClose();
    }
    dispatch(getBankBLoans());
  }, [dispatch, error, success, BLerror, BLisUpdated]);

  const getCompanyById = (id) => {
    return companies.find((company) => company._id === id) || {};
  };
  const getUserById = (id) => {
    return users.find((user) => user._id === id) || {};
  };
  const header1 = [
    "Full Name",
    "Loan Amount",
    "Bank",
    "Branch",
    "Collateral",
    "Monthly Payment",
    "Score",
  ];
  const loanrows = [];
  bankLoan &&
    bankLoan.forEach((item) => {
      const user = getUserById(item.id);
      loanrows.unshift({
        id: item._id,
        user: user.name || "",
        loan_amount: Number(item.loan_amount).toLocaleString(),
        Bank: item.Bank,
        branch: item.Branch?.branch_name,
        Types_of_Collateral: item.Types_of_Collateral,
        Monthly_payment: Number(item.Monthly_payment).toLocaleString(),
        score: item.score,
        Reason_for_loan: item.Reason_for_loan,
        Loan_Payment_Period: item.Loan_Payment_Period,
        status: item.status,
        Job_Status: item.Job_Status,
        Type_Of_Loan: item.Type_Of_Loan,
        interest: item.interest,
        requestedOn: new Date(item.createdAt).toISOString().substring(0, 10),
        rank: item.rank,
        padiMonths:item.paidMonths,
        loanType: "personal",
        image: user.profile?.url || "",
        files: user.scannedFiles?.[0]?.url || "",
      });
    });

  const Bloanrows = [];
  bankBLoan &&
    bankBLoan.forEach((item) => {
      const company = getCompanyById(item.id);
      Bloanrows.unshift({
        id: item._id,
        user: company.cname || "",
        loan_amount: Number(item.loan_amount).toLocaleString(),
        Bank: item.Bank,
        branch: item.Branch,
        Types_of_Collateral: item.Types_of_Collateral,
        Monthly_payment: Number(item.Monthly_payment).toLocaleString(),
        score: item.score,
        padiMonths:item.paidMonths,
        Reason_for_loan: item.Reason_for_loan,
        Loan_Payment_Period: item.Loan_Payment_Period,
        status: item.status,
        Job_Status: item.Job_Status,
        Type_Of_Loan: item.Type_Of_Loan,
        interest: item.interest,
        requestedOn: new Date(item.createdAt).toISOString().substring(0, 10),
        rank: item.rank,
        loanType: "business",
        image: company.logo?.url || "",
        files: company.scannedFiles?.[0]?.url || "",
      });
    });
  var date = new Date().toISOString().substring(2, 10);
  const Approved = [];
  const Pending = [];
  const Declined = [];
  const Closed = [];
  const Today = [];
  const Loanrows = [].concat(loanrows, Bloanrows);
  Loanrows.forEach((item) => {
    if (item.status === "approved") Approved.push(item);
    if (item.status === "pending") Pending.push(item);
    if (item.status === "Declined" || item.status === "declined")
      Declined.push(item);
    if (item.status === "Closed" || item.status === "Closed") Closed.push(item);
    var newDate = new Date(item.requestedOn).toISOString().substring(2, 10);
    if (date === newDate) Today.push(item);
  });
  const openSwal = async (id, type) => {
    const loanRow =
      type === "personal"
        ? loanrows.find((row) => row.id === id)
        : Bloanrows.find((row) => row.id === id);
    const isFullyPaid = loanRow.padiMonths && loanRow.padiMonths.length >= loanRow.Loan_Payment_Period;
    const { value: loanstatus } = await swal.fire({
      title: "Select Loan Status",
      html: `
        <div class="swal-container">
          <div>
            <input type="radio" id="approve" name="status" value="approved" ${
              loanRow.status === "approved" ? "checked" : ""
            } ${loanRow.status === "Closed" ? "disabled" : ""}>
            <label for="approve">Approve</label>
          </div>
          <div>
            <input type="radio" id="decline" name="status" value="declined" ${
              loanRow.status === "declined" ? "checked" : ""
            } ${loanRow.status === "Closed" ? "disabled" : ""}>
            <label for="decline">Decline</label>
          </div>
          <div>
            <input type="radio" id="pending" name="status" value="pending" ${
              loanRow.status === "pending" ? "checked" : ""
            } ${loanRow.status === "Closed" ? "disabled" : ""}>
            <label for="pending">Pending</label>
          </div>
          <div>
            <input type="radio" id="Closed" name="status" value="Closed" ${
              loanRow.status === "Closed" ? "checked" : ""
            } ${
        loanRow.status === "Closed" || loanRow.status === "pending"  ||  !isFullyPaid
          ? "disabled"
          : ""
      }>
            <label for="Closed">Closed</label>
          </div>
        </div>
      `,
      inputValidator: (value) => {
        if (!value) {
          return "Status is not selected!";
        }
      },
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Update",
      preConfirm: () => {
        const selectedStatus = document.querySelector(
          'input[name="status"]:checked'
        ).value;
        if (type === "personal") {
          dispatch(updateLoan({ id: id, status: selectedStatus }));
        } else if (type === "business") {
          dispatch(updateBLoan({ id: id, status: selectedStatus }));
        }
      },
      customClass: {
        confirmButton: "swal-button swal-confirm",
        cancelButton: "swal-button swal-cancel",
      },
    });

    // Disable Closed radio button if Loan Status is "Pending"
    const ClosedRadio = document.querySelector("#Closed");
    if (loanRow.status === "pending") {
      ClosedRadio.disabled = true;
    }
  };

  const loanColumn2 = () => [
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 80,
      flex: 0.1,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          //<LoanUpdateActions  deleteHandler={deleteUserHandler} id={params.row.id} />
          <>
            <Link
              to={
                params.row.loanType === "personal"
                  ? `/loanprofile/${params.row.id}`
                  : `/bloanprofile/${params.row.id}`
              }
              className="text-blue-600 hover:bg-blue-200 p-1 rounded-full bg-blue-100"
            >
              <OpenInNew />
            </Link>
            <Link
              onClick={() => openSwal(params.row.id, params.row.loanType)}
              style={{ color: "#f65726" }}
            >
              <UpdateIcon />
            </Link>
          </>
        );
      },
    },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        const viewImage = (src) => {
          if (src) {
            swal.fire({
              imageUrl: src,
              imageWidth: 600,
              imageHeight: 400,
            });
          } else {
            swal.fire({
              title: "Image is not provided!",
            });
          }
        };

        return (
          <OpenInNewIcon
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => viewImage(params.value)}
          />
        );
      },
    },
    {
      field: "user",
      headerName: "Client Full Name",
      minWidth: 300,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "left",
      headerAlign: "left",
    },

    {
      field: "Bank",
      headerName: "Bank Name",
      minWidth: 300,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "branch",
      headerName: "Branch Name",
      minWidth: 300,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "left",
      headerAlign: "left",
    },

    {
      field: "Reason_for_loan",
      headerName: "Reason for the Loan",
      minWidth: 200,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "Loan_Payment_Period",
      headerName: "Loan Payment Period(Months)",
      minWidth: 200,
      flex: 0.2,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "loan_amount",
      headerName: "Amount Requested ETB",
      minWidth: 200,
      flex: 0.5,
      sortable: true,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "Monthly_payment",
      headerName: "Monthly Payment ETB",
      minWidth: 200,
      flex: 0.2,
      sortable: true,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "score",
      headerName: "Credit Score(500)",
      minWidth: 200,
      flex: 0.2,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "Type_Of_Loan",
      headerName: "Type Of Loan",
      minWidth: 150,
      flex: 0.1,
      sortable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "status",
      headerName: "status",
      minWidth: 100,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "approved" ? (
              <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full #22c55e capitalize">
                {params.row.status}
              </span>
            ) : params.row.status === "declined" ? (
              <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-red-800 capitalize">
                {params.row.status}
              </span>
            ) : (
              <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800 capitalize">
                {params.row.status}
              </span>
            )}
          </>
        );
      },
    },
    {
      field: "Job_Status",
      headerName: "Job Status",
      minWidth: 100,
      flex: 0.1,
      sortable: true,
    },

    {
      field: "Types_of_Collateral",
      headerName: "Collateral",
      minWidth: 100,
      flex: 0.1,
      sortable: true,
    },

    {
      field: "interest",
      headerName: "Annual Interest Rate",
      minWidth: 150,
      flex: 0.1,
      sortable: true,
    },
    {
      field: "requestedOn",
      headerName: "Requested On",
      type: "date",
      minWidth: 200,
      flex: 0.2,
    },
    {
      field: "rank",
      headerName: "Rank",
      minWidth: 100,
      flex: 0.1,
      sortable: true,
    },

    {
      field: "files",
      headerName: "Scanned File",
      width: 100,
      renderCell: (params) => {
        const fileUrl = params.value;
        return (
          <button
            onClick={() => download(fileUrl)} // Call the download function with the file URL
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <OpenInNewIcon style={{ color: "blue" }} />
          </button>
        );
      },
    },
  ];
  return (
    <div style={{ textTransform: "capitalize" }}>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <div className="page-header">
        <h3 className="page-title">Loan Types</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Loan Types
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Bank Registration
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">To Update Loan Use Update Icon</h4>
              <p className="card-description">
                Read complete information about loan and Borrowers before
                updating the loans{" "}
              </p>
              <h4 className="card-title">
                {type == 1
                  ? "Personal"
                  : type == 2
                  ? "Business"
                  : type == 3 || loan_status == "All"
                  ? "All"
                  : loan_status == "approved"
                  ? "Approved"
                  : loan_status == "Pending"
                  ? "Pending"
                  : loan_status == "Rejected"
                  ? "Declined"
                  : loan_status == "today"
                  ? "Today's"
                  : "Closed"}{" "}
                Loan Records
              </h4>
              <div style={{ height: "100vh", width: "100%" }}>
                <DataGrid
                  rows={
                    type == 1
                      ? loanrows
                      : type == 2
                      ? Bloanrows
                      : type == 3 || loan_status == "All"
                      ? Loanrows
                      : loan_status == "approved"
                      ? Approved
                      : loan_status == "Pending"
                      ? Pending
                      : loan_status == "Rejected"
                      ? Declined
                      : loan_status == "Closed"
                      ? Closed
                      : loan_status == "today"
                      ? Today
                      : []
                  }
                  columns={loanColumn2()}
                  declined
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[10, 20, 50, 100]}
                  pagination
                  rowHeight={80}
                  checkboxSelection
                  disableSelectIconOnClick
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "score", sort: "desc" }],
                    },
                  }}
                  sx={{
                    boxShadow: 1,
                    border: 1,
                    borderColor: "#e4e9ec",
                    color: "#343434",
                    background: "white",
                    fontWeight: "Normal",
                    fontSize: "1em",
                    fontFamily: "serif",
                    colorScheme: "white",
                  }}
                />
                <PDFGenerator
                  header={header1}
                  data={
                    type == 1
                      ? loanrows
                      : type == 2
                      ? Bloanrows
                      : type == 3 || loan_status === "All"
                      ? Loanrows
                      : loan_status == "approved"
                      ? Approved
                      : loan_status == "Pending"
                      ? Pending
                      : loan_status == "Rejected"
                      ? Declined
                      : loan_status == "Closed"
                      ? Closed
                      : loan_status == "todays"
                      ? Today
                      : []
                  }
                  DocumentTitle={
                    type == 1
                      ? "Personal Loan Records"
                      : type == 2
                      ? "Business Loan Records"
                      : type == 3 || loan_status == "All"
                      ? "All Loan Records"
                      : loan_status == "approved"
                      ? "Approved Loan Records"
                      : loan_status == "Pending"
                      ? "Pending Loan Records"
                      : loan_status == "Rejected"
                      ? "Declined Loan Records"
                      : loan_status == "today"
                      ? "Today's Loan Records"
                      : loan_status == "Closed"
                      ? "Closed Loan Records"
                      : "New Loan Records"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoanType;
