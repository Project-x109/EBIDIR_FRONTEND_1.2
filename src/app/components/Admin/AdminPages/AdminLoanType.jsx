import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert2";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  UPDATE_BLOAN_RESET,
  UPDATE_LOAN_RESET,
} from "../../../../Constants/LoanConstants";
import {
  clearErrors,
  getAllCompanies,
  getAllUsers,
} from "../../../../Actions/UserAction";
import { getAllBLoans, getAllLoans } from "../../../../Actions/LoanAction";
import BackdropLoader from "../../common/BackdropLoader";
import { BreadComb, LOAN_TYPE_TABLE_COLUMN } from "../../CodeSegments";
import PDFGenerator from "./PDFGenerator";
const AdminLoanType = () => {
  const { type, loan_status } = useParams();
  const { users } = useSelector((state) => state.users);
  const { companies } = useSelector((state) => state.companies);
  const { login, loading } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { LisUpdated, Lerror, BLisUpdated, BLerror } = useSelector(
    (state) => state.profile
  );
  const { loans } = useSelector((state) => state.loans);
  const { bloans } = useSelector((state) => state.bloans);
  const [, setId] = useState();
  const [, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    if (!users[0]) dispatch(getAllUsers());
  }, [dispatch, users]);
  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllLoans());
  }, [dispatch, login]);
  useEffect(() => {
    dispatch(getAllBLoans);
  }, [dispatch, login]);
  useEffect(() => {
    if (Lerror) {
      swal.fire({
        title: "" + Lerror,
        type: "error",
        text: "Error Occured:" + Lerror,
        background: "pink",
      });
      dispatch(clearErrors());
    }
    if (LisUpdated) {
      swal.fire({
        title: "Loan Updated",
        type: "success",
        text: "Loan Updated Successfully",
        background: "white",
      });
      dispatch({ type: UPDATE_LOAN_RESET });
      handleClose();
    }
    dispatch(getAllLoans());
  }, [dispatch, Lerror, LisUpdated]);
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
    dispatch(getAllBLoans());
  }, [dispatch, Lerror, BLisUpdated, BLerror]);
  const getName = (id) => {
    // eslint-disable-next-line
    for (let user of users) {
      if (user._id === id) return user.name;
    }
  };
  const getname = (id) => {
    // eslint-disable-next-line
    for (let user of companies) {
      if (user._id === id) return user.cname;
    }
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
  const loanrows = loans.map((item) => ({
    id: item._id,
    user: getName(item.id),
    loan_amount: Number(item.loan_amount).toLocaleString(),
    Bank: item.Bank,
    branch: item.Branch?.branch_name,
    Types_of_Collateral: item.Types_of_Collateral,
    Monthly_payment: Number(item.Monthly_payment).toLocaleString(),
    score: Math.round(item.score),
    interest: item.interest,
    padiMonths:item.paidMonths,
    requestedOn: new Date(item.createdAt).toISOString().substring(0, 10),
    Reason_for_loan: item.Reason_for_loan,
    Loan_Payment_Period: item.Loan_Payment_Period,
    status: item.status,
    Type_Of_Loan: item.Type_Of_Loan,
    rank: item.rank,
    loanType: "personal",
  }));

  const Bloanrows = bloans.map((item) => ({
    id: item._id,
    user: getname(item.id),
    loan_amount: Number(item.loan_amount).toLocaleString(),
    Bank: item.Bank,
    branch: item.Branch?.branch_name,
    Types_of_Collateral: item.Types_of_Collateral,
    Monthly_payment: Number(Math.round(item.Monthly_payment)).toLocaleString(),
    score: Math.round(item.score),
    padiMonths:item.paidMonths,
    interest: item.interest,
    Reason_for_loan: item.Reason_for_loan,
    Loan_Payment_Period: item.Loan_Payment_Period,
    status: item.status,
    Type_Of_Loan: item.Type_Of_Loan,
    requestedOn: new Date(item.createdAt).toISOString().substring(0, 10),
    rank: item.rank,
    loanType: "business",
  }));
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
    if (item.status === "Declined") Declined.push(item);
    if (item.status === "Closed") Closed.push(item);
    var newDate = new Date(item.requestedOn).toISOString().substring(2, 10);
    if (date === newDate) Today.push(item);
  });
  const handleClick = (id) => {
    setId(id);
  };
  return (
    <div>
      {BreadComb(
        "Loan Types",
        "Loan Types",
        type == 1
          ? "Personal"
          : type == 2
          ? "Business"
          : type == 3
          ? "All Loans"
          : type
      )}
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Banks Can Update Loan Use Update Icon
              </h4>
              <p className="card-description">
                Read complete information about loan and Borrowers before
                updating the loans{" "}
              </p>
              {/* // eslint-disable-next-line */}
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
                  : loan_status == "Closed"
                  ? "Closed"
                  : "Today's"}{" "}
                Loan Records
              </h4>

              <div style={{ height: "100vh", width: "100%" }}>
                {loading && <BackdropLoader />}
                <DataGrid
                  rows={
                    type == 1
                      ? loanrows
                      : type == 2
                      ? Bloanrows
                      : type == 3 || loan_status === "All"
                      ? Loanrows
                      : loan_status === "approved"
                      ? Approved
                      : loan_status === "Pending"
                      ? Pending
                      : loan_status === "Rejected"
                      ? Declined
                      : loan_status === "Closed"
                      ? Closed
                      : loan_status === "todays"
                      ? Today
                      : []
                  }
                  columns={LOAN_TYPE_TABLE_COLUMN()}
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
                  onRowClick={(params) => {
                    handleClick(params.id);
                  }}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: "score", sort: "desc" }],
                    },
                  }}
                  sx={{
                    boxShadow: 1,
                    border: 1,
                    borderColor: "#e2e7ea",
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
                      : loan_status === "approved"
                      ? Approved
                      : loan_status === "Pending"
                      ? Pending
                      : loan_status === "Rejected"
                      ? Declined
                      : loan_status === "Closed"
                      ? Closed
                      : loan_status === "todays"
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
export default AdminLoanType;
