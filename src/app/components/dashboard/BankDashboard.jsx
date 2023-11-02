import React, { useEffect } from "react";
import HorizontalScroll from "react-horizontal-scrolling";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getBankBLoans, getBankLoans } from "../../../Actions/LoanAction";
import {
  getAllCompanies,
  getAllUsers,
  GetUser,
} from "../../../Actions/UserAction";
import { getData, MoneyStatus, statusDonught, Top10 } from "./dashboardData";
import { DESCSort, formatCompactNumber } from "../../Dataset/Functions";
import moment from "moment";
import BackdropLoader from "../../components/common/BackdropLoader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./dashboard.css";
import Pending_Loans from "../../../assets/images/Pending_Loans.png";
import Approved_Loans from "../../../assets/images/Approved_Loans.png";
import Rejected_Loans from "../../../assets/images/Rejected_Loans.png";
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          color: "rgba(204, 204, 204,0.1)",
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          color: "rgba(204, 204, 204,0.1)",
        },
      },
    ],
  },
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const BankDashboard = () => {
  const { bankLoan } = useSelector((state) => state.bankLoan);
  const { bankBLoan } = useSelector((state) => state.bankBLoan);
  const { users } = useSelector((state) => state.users);
  const { companies } = useSelector((state) => state.companies);
  const { loading } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  /*useEffect(()=>{
  dispatch(GetUser());
},[dispatch])*/

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);
  useEffect(() => {
    if (!users[0]) dispatch(getAllUsers());
  }, [dispatch, users]);
  useEffect(() => {
    dispatch(getBankLoans());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBankBLoans());
  }, [dispatch]);
  const getName = (id) => {
    for (let u of users) {
      if (u._id === id) return u.name;
    }
  };

  const getname = (id) => {
    for (let u of companies) {
      if (u._id === id) return u.cname;
    }
  };
  let totalMoney = [0, 0, 0, 0, 0, 0, 0];
  let Collaterals = [0, 0, 0, 0, 0, 0];
  const loanrows = [];
  const loansArray = [[], [], [], [], [], [], [], [], [], [], [], []];
  bankLoan &&
    bankLoan.forEach((item) => {
      if (
        item.Types_of_Collateral === "Car,Building" ||
        item.Types_of_Collateral === "Car, Building"
      )
        Collaterals[2] += 1;
      if (
        item.Types_of_Collateral === "Car" ||
        item.Types_of_Collateral === "car"
      )
        Collaterals[0] += 1;
      if (
        item.Types_of_Collateral === "Building" ||
        item.Types_of_Collateral === "Building"
      )
        Collaterals[1] += 1;
      totalMoney[0] += parseFloat(item?.loan_amount);

      if (item.status === "approved") {
        loansArray[0].push(item);
        totalMoney[3] += parseFloat(item?.loan_amount);
      }
      if (item.status === "pending") {
        loansArray[1].push(item);
        totalMoney[2] += parseFloat(item?.loan_amount);
      }
      if (item.status === "Declined" || item.status === "declined") {
        loansArray[2].push(item);
        totalMoney[4] += parseFloat(item?.loan_amount);
      }
      if (item.status === "Closed" || item.status === "closed") {
        loansArray[3].push(item);
        totalMoney[5] += parseFloat(item?.loan_amount);
      }

      loanrows.unshift({
        id: item._id,
        loan_amount: Number(item.loan_amount).toLocaleString(),
        Reason_for_loan: item.Reason_for_loan,
        Loan_Payment_Period: item.Loan_Payment_Period,
        status: item.status,
        Job_Status: item.Job_Status,
        Type_Of_Loan: item.Type_Of_Loan,
        Bank: item.Bank,
        Types_of_Collateral: item.Types_of_Collateral,
        Monthly_payment: Number(item.Monthly_payment).toLocaleString(),
        interest: item.interest * 100 + "%",
        requestedOn: new Date(item.createdAt).toISOString().substring(0, 10),
        user: getName(item.id),
        score: item.score,
        rank: item.rank,
        loanType: "personal",
      });
    });
  const Bloanrows = [];
  bankBLoan &&
    bankBLoan.forEach((item) => {
      if (
        item.Types_of_Collateral === "Car,Building" ||
        item.Types_of_Collateral === "Car, Building"
      )
        Collaterals[5] += 1;
      if (
        item.Types_of_Collateral === "Car" ||
        item.Types_of_Collateral === "car"
      )
        Collaterals[3] += 1;
      if (
        item.Types_of_Collateral === "Building" ||
        item.Types_of_Collateral === "Building"
      )
        Collaterals[4] += 1;
      totalMoney[1] += parseFloat(item?.loan_amount);

      if (item.status === "approved") {
        loansArray[4].push(item);
        totalMoney[3] += parseFloat(item?.loan_amount);
      }
      if (item.status === "pending") {
        loansArray[5].push(item);
        totalMoney[2] += parseFloat(item?.loan_amount);
      }
      if (item.status === "Declined" || item.status === "declined") {
        loansArray[6].push(item);
        totalMoney[4] += parseFloat(item?.loan_amount);
      }
      if (item.status === "Closed" || item.status === "closed") {
        loansArray[7].push(item);
        totalMoney[5] += parseFloat(item?.loan_amount);
      }
      Bloanrows.unshift({
        id: item._id,
        loan_amount: Number(item.loan_amount).toLocaleString(),
        Reason_for_loan: item.Reason_for_loan,
        Loan_Payment_Period: item.Loan_Payment_Period,
        status: item.status,
        Job_Status: item.Job_Status,
        Type_Of_Loan: item.Type_Of_Loan,
        Bank: item.Bank,
        Types_of_Collateral: item.Types_of_Collateral,
        Monthly_payment: Number(
          Math.round(item.Monthly_payment)
        ).toLocaleString(),
        interest: item.interest * 100 + "%",
        requestedOn: new Date(item.createdAt).toISOString().substring(0, 10),
        user: getname(item.id),
        score: item.score,
        rank: item.rank,
        loanType: "business",
      });
    });
  const child = { width: `104em`, height: `100%` };
  // Define an array of objects that contains the personal loan, business loan and total loan for each month
  var data = [];

  // Loop over the bankLoan array and populate the data array
  bankLoan.forEach((item) => {
    // Get a unique key for each month using the ISO string
    let key = new Date(item.createdAt).toISOString().slice(0, 7);
    // Find the index of the object that matches the key in the data array
    let index = data.findIndex((obj) => obj.key === key);
    // If the object exists, increment the personal loan by one
    if (index > -1) {
      data[index].PersonalLoan++;
    }
    // Otherwise, create a new object with the key and the personal loan
    else {
      data.push({
        key: key,
        PersonalLoan: 1,
        BusinessLoan: 0,
        TotalLoan: 0,
      });
    }
  });

  // Loop over the bankBLoan array and populate the data array
  bankBLoan.forEach((item) => {
    // Get a unique key for each month using the ISO string
    let key = new Date(item.createdAt).toISOString().slice(0, 7);
    // Find the index of the object that matches the key in the data array
    let index = data.findIndex((obj) => obj.key === key);
    // If the object exists, increment the business loan by one
    if (index > -1) {
      data[index].BusinessLoan++;
    }
    // Otherwise, create a new object with the key and the business loan
    else {
      data.push({
        key: key,
        PersonalLoan: 0,
        BusinessLoan: 1,
        TotalLoan: 0,
      });
    }
  });

  // Loop over the data array and calculate the total loan for each month
  data.forEach((obj) => {
    obj.TotalLoan = obj.PersonalLoan + obj.BusinessLoan;
  });
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Define a function that generates an array of labels and an array of values based on a start date and an end date
  function generateData(startDate, endDate) {
    let labels = [];
    let values = [];

    // Convert the start date and end date to timestamps
    let startTimestamp = new Date(startDate).getTime();
    let endTimestamp = new Date(endDate).getTime();

    // Loop from the start date to the end date with a one-month increment
    for (
      let timestamp = startTimestamp;
      timestamp <= endTimestamp;
      timestamp += 1000 * 60 * 60 * 24 * 30
    ) {
      // Convert the timestamp to a date object
      let date = new Date(timestamp);
      // Get the month name and year from the date object
      let label = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      // Push the label to the labels array
      labels.push(label);
      // Get the ISO string from the date object
      let key = date.toISOString().slice(0, 7);

      // Find the object that matches the key in the data array
      let obj = data.find((obj) => obj.key === key);
      // If the object exists, push its value to the values array
      if (obj) {
        values.push(obj.TotalLoan);
      }
      // Otherwise, push zero to the values array
      else {
        values.push(0);
      }
    }

    return [labels, values];
  }

  // Get current month and year as strings
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth() + 1; // getMonth() returns month index starting from 0
  let currentYear = currentDate.getFullYear();

  // Generate labels and values starting from January of the current year and ending at the current month and year
  let [labels, values] = generateData(
    `${currentYear}-01-01`,
    `${currentYear}-${currentMonth}-01`
  );
  const tickFormatter = (key) => {
    // Split the key by the dash
    let [year, month] = key.split("-");
    // Convert the month number to a month name
    let monthName = monthNames[month - 1];
    // Return the formatted string
    return `${monthName} ${year}`;
  };

  const userData = [];

  users &&
    Array.isArray(users) &&
    users.forEach((item) => {
      userData.unshift({
        id: item._id,
        name: item.name.split(" ")[0],
        type: "Personal",
        email: item.email,
        phoneNo: item.phoneNo,
        TIN_Number: item.TIN_Number,
        Rank: item.rank,
        role:item.role,
        score: item.score,
        image: item?.profile?.url,
        createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
      });
    });
  companies &&
    Array.isArray(companies) &&
    companies.forEach((item) => {
      userData.unshift({
        id: item._id,
        name: item.cname.split(" ")[0],
        email: item.cemail,
        phoneNo: item.cphoneNo,
        TIN_Number: item.CTIN_Number,
        type: "Bussiness",
        role:item.role,
        score: item.score,
        Rank: item.rank,
        image: item?.logo?.url,
        createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
      });
    });
  userData.sort(DESCSort("score"));

  return (
    <div style={{ textTransform: "capitalize" }}>
      {loading && <BackdropLoader />}
      <div id="cards">
        <HorizontalScroll>
          <div className="row">
            <div className="col-sm-4 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h5>Pending Personal Loan</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 my-auto">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0">{loansArray[1].length}</h2>
                        <p
                          id="spacebetwen"
                          className="text-primary ml-2 mb-0 font-weight-medium"
                        >
                          Loans
                        </p>
                      </div>
                      {/*<h6 className="text-muted font-weight-normal"></h6>*/}
                    </div>
                    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <img
                        alt="Pending Loans"
                        id="iconsizeCard"
                        src={Pending_Loans}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h5 style={{ whiteSpace: "pre" }}>Approved Personal Loan</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 my-auto">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0">{loansArray[0].length}</h2>
                        <p
                          id="spacebetwen"
                          className="text-success ml-2 mb-0 font-weight-medium"
                        >
                          Loans
                        </p>
                      </div>
                      {/*<h6 className="text-muted font-weight-normal"></h6>*/}
                    </div>
                    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <img
                        alt="Approved Loans"
                        id="iconsizeCard"
                        src={Approved_Loans}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h5 style={{ whiteSpace: "pre" }}>Rejected Personal Loan</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 my-auto">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0">{loansArray[2].length}</h2>
                        <p
                          id="spacebetwen"
                          className="text-danger ml-2 mb-0 font-weight-medium"
                        >
                          Loans
                        </p>
                      </div>
                      {/*<h6 className="text-muted font-weight-normal"></h6>*/}
                    </div>
                    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <img
                          alt="Rejected Loans"
                          id="iconsizeCard"
                          src={Rejected_Loans}
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div style={{}} className="row">
            <div className="col-sm-4 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h5>Pending Business Loan</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 my-auto">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0">{loansArray[5].length}</h2>
                        <p
                          id="spacebetwen"
                          className="text-primary ml-2 mb-0 font-weight-medium"
                        >
                          Loans
                        </p>
                      </div>
                      {/*<h6 className="text-muted font-weight-normal"></h6>*/}
                    </div>
                    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <img
                        alt="Pending Loans"
                        id="iconsizeCard"
                        src={Pending_Loans}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h5 style={{ whiteSpace: "pre" }}>Approved Business Loan</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 my-auto">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0">{loansArray[4].length}</h2>
                        <p
                          id="spacebetwen"
                          className="text-success ml-2 mb-0 font-weight-medium"
                        >
                          Loans
                        </p>
                      </div>
                      {/*<h6 className="text-muted font-weight-normal"></h6>*/}
                    </div>
                    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <img
                        alt="Approved Loans"
                        id="iconsizeCard"
                        src={Approved_Loans}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h5 style={{ whiteSpace: "pre" }}>Rejected Business Loan</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 my-auto">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0">{loansArray[6].length}</h2>
                        <p
                          id="spacebetwen"
                          className="text-danger ml-2 mb-0 font-weight-medium"
                        >
                          Loans
                        </p>
                      </div>
                      {/*<h6 className="text-muted font-weight-normal"></h6>*/}
                    </div>
                    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <img
                        alt="Rejected Loans"
                        id="iconsizeCard"
                        src={Rejected_Loans}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HorizontalScroll>
      </div>

      <div className="row">
        {statusDonught([
          loansArray[0].length + loansArray[4].length,
          loansArray[1].length + loansArray[5].length,
          loansArray[2].length + loansArray[6].length,
          loansArray[3].length + loansArray[7].length,
        ])}
        {Top10(userData.filter(item => item.role == 'user' || item.role == 'company').slice(0, 10))}
      </div>

      <div id="cards">
        <HorizontalScroll>
          <div style={{ child, whiteSpace: "pre" }} className="row">
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h4 className="mb-0">
                          {formatCompactNumber(totalMoney[0] + totalMoney[1])}
                        </h4>
                        <p
                          id="spacebetwen"
                          className="text-success ml-2 mb-0 font-weight-medium"
                        >
                          ETB
                        </p>
                      </div>
                    </div>
                    {/* <div className="col-3">
                            <div className="icon icon-box-success ">
                              <span className="mdi mdi-coin icon-item"></span>
                            </div>
                          </div>*/}
                  </div>
                  <br></br>

                  <h6 className="text-muted font-weight-normal">Total Loans</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h4 className="mb-0">
                          {formatCompactNumber(totalMoney[0])}
                        </h4>
                        <p
                          id="spacebetwen"
                          className="text-success ml-2 mb-0 font-weight-medium"
                        >
                          ETB
                        </p>
                      </div>
                    </div>
                    {/* <div className="col-3">
                            <div className="icon icon-box-success">
                              <span className="mdi mdi-coin icon-item"></span>
                            </div>
                          </div>*/}
                  </div>
                  <br></br>

                  <h6 className="text-muted font-weight-normal">
                    Total Personal loan
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h4 className="mb-0">
                          {formatCompactNumber(totalMoney[1])}
                        </h4>
                        <p
                          id="spacebetwen"
                          className="text-success ml-2 mb-0 font-weight-medium"
                        >
                          ETB
                        </p>
                      </div>
                    </div>
                    {/*<div className="col-3">
                            <div className="icon icon-box-success">
                              <span className="mdi mdi-coin icon-item"></span>
                            </div>
                          </div>*/}
                  </div>
                  <br></br>

                  <h6
                    className="text-muted font-weight-normal"
                    style={{ whiteSpace: "pre" }}
                  >
                    Total Business Loan
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h4 className="mb-0">
                          {formatCompactNumber(totalMoney[2])}
                        </h4>
                        <p
                          id="spacebetwen"
                          className="text-success ml-2 mb-0 font-weight-medium"
                        >
                          ETB
                        </p>
                      </div>
                    </div>
                    {/* <div className="col-3">
                            <div className="icon icon-box-success ">
                              <span className="mdi mdi-coin icon-item"></span>
                            </div>
                          </div>*/}
                  </div>
                  <br></br>

                  <h6 className="text-muted font-weight-normal">
                    Total Pending Loan
                  </h6>
                </div>
              </div>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div style={{ child, whiteSpace: "pre" }} className="row">
            <div
              style={{ whiteSpace: "pre" }}
              className="col-xl-3 col-sm-6 grid-margin stretch-card"
            >
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h4 className="mb-0">
                          {formatCompactNumber(totalMoney[3])}
                        </h4>
                        <p
                          id="spacebetwen"
                          className="text-success ml-2 mb-0 font-weight-medium"
                        >
                          ETB
                        </p>
                      </div>
                    </div>
                    {/* <div className="col-3">
                            <div className="icon icon-box-success ">
                              <span className="mdi mdi-coin icon-item"></span>
                            </div>
                          </div>*/}
                  </div>
                  <br></br>

                  <h6 className="text-muted font-weight-normal">
                    Total Approved Loans
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h4 className="mb-0">
                          {formatCompactNumber(totalMoney[4])}
                        </h4>
                        <p
                          id="spacebetwen"
                          className="text-success ml-2 mb-0 font-weight-medium"
                        >
                          ETB
                        </p>
                      </div>
                    </div>
                    {/*  <div className="col-3">
                            <div className="icon icon-box-success">
                              <span className="mdi mdi-coin icon-item"></span>
                            </div>
                          </div>*/}
                  </div>
                  <br></br>

                  <h6 className="text-muted font-weight-normal">
                    Total Rejected Loans
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h4 className="mb-0">
                          {formatCompactNumber(totalMoney[5])}
                        </h4>
                        <p
                          id="spacebetwen"
                          className="text-success ml-2 mb-0 font-weight-medium"
                        >
                          ETB
                        </p>
                      </div>
                    </div>
                    {/* <div className="col-3">
                            <div className="icon icon-box-success">
                              <span className="mdi mdi-coin icon-item"></span>
                            </div>
                          </div>*/}
                  </div>
                  <br></br>
                  <h6 className="text-muted font-weight-normal">
                    Total Closed Loans
                  </h6>
                </div>
              </div>
            </div>
            <div
              style={{ whiteSpace: "pre" }}
              className="col-xl-3 col-sm-6 grid-margin stretch-card"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </HorizontalScroll>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card admincards">
            <div className="card-body">
              <h4 className="card-title">Collateral Status Summary</h4>
              <div id="cards" className="aligner-wrapper">
                <Bar data={getData(Collaterals)} options={options} />
              </div>
              <div className="admincard red d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <h6 id="cardvalue" style={{ color: "#12151e" }} className="mb-1 tip">
                    Vehicle
                  </h6>
                </div>
                <div
                  style={{ color: "#12151e" }}
                  className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0"
                >
                  <h6 id="cardvalue" className="font-weight-bold mb-0">
                    {Collaterals[3] + Collaterals[0]}
                  </h6>
                </div>
              </div>
              <div className="admincard blue d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <h6 id="cardvalue" style={{ color: "#12151e" }} className="mb-1 tip">
                    Building
                  </h6>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 id="cardvalue" className="font-weight-bold mb-0">
                    {Collaterals[4] + Collaterals[1]}
                  </h6>
                </div>
              </div>
              <div className="admincard green d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <h6 id="cardvalue" style={{ color: "#12151e" }} className="mb-1 tip">
                    Vehicle,Building
                  </h6>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 id="cardvalue" className="font-weight-bold mb-0">
                    {Collaterals[5] + Collaterals[2]}
                  </h6>
                </div>
              </div>
              <div
                style={{ backgroundColor: "#e4e9ec" }}
                className="admincard yellow d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
              >
                <div className="text-md-center text-xl-left">
                  <h6 id="cardvalue" style={{ color: "#12151e" }} className="mb-1 tip">
                    Grand Total
                  </h6>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 id="cardvalue" className="font-weight-bold mb-0">
                    {Collaterals[0] +
                      Collaterals[1] +
                      Collaterals[2] +
                      Collaterals[3] +
                      Collaterals[4] +
                      Collaterals[5]}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {MoneyStatus(bankLoan, bankBLoan, [
          totalMoney[0] + totalMoney[1],
          totalMoney[0],
          totalMoney[1],
        ])}
      </div>

      <div id="cards" className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card ">
            <div className="card-body">
              <h4 className="card-title">Loan Status Summary</h4>
              <div  className="aligner-wrapper">
                {/* <Line data={lineData} options={options} />*/}
                <LineChart
                  width={1100}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="key" tickFormatter={tickFormatter} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="PersonalLoan"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="BusinessLoan"
                    stroke="#82ca9d"
                  />
                  <Line type="monotone" dataKey="TotalLoan" stroke="#343434" />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDashboard;
