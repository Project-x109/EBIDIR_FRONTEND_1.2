import React, { useEffect } from "react";
import HorizontalScroll from "react-horizontal-scrolling";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getBranchBLoans, getBranchLoans } from "../../../Actions/LoanAction";
import {
  getAllCompanies,
  getAllUsers,
  getMyBranchBank,
} from "../../../Actions/UserAction";
import { getData, MoneyStatus, statusDonught, Top10 } from "./dashboardData";
import { DESCSort, formatCompactNumber } from "../../Dataset/Functions";
import moment from "moment";
import BackdropLoader from "../common/BackdropLoader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Pending_Loans from "../../../assets/images/Pending_Loans.png";
import Approved_Loans from "../../../assets/images/Approved_Loans.png";
import Rejected_Loans from "../../../assets/images/Rejected_Loans.png";
import "./dashboard.css";
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

const BranchDashboard = () => {
  const { branchLoan } = useSelector((state) => state.branchLoan);
  const { branchBLoan } = useSelector((state) => state.branchBLoan);
  const { users } = useSelector((state) => state.users);
  const { companies } = useSelector((state) => state.companies);
  const { loading } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);
  useEffect(() => {
    if (!users[0]) dispatch(getAllUsers());
  }, [dispatch, users]);

  useEffect(() => {
    dispatch(getBranchLoans());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBranchBLoans());
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
  branchLoan &&
    branchLoan.forEach((item) => {
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
  branchBLoan &&
    branchBLoan.forEach((item) => {
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
  var data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var data2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var data3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  branchLoan.forEach((item) => {
    data1[new Date(item.createdAt).getMonth()] =
      data1[new Date(item.createdAt).getMonth()] + 1;
  });
  branchBLoan.forEach((item) => {
    data2[new Date(item.createdAt).getMonth()] =
      data2[new Date(item.createdAt).getMonth()] + 1;
  });
  for (var i = 0; i < 12; i++) data3[i] = data1[i] + data2[i];
  const datax = data1.slice(8, 12).concat(data1.slice(0, 8));
  const datay = data2.slice(8, 12).concat(data2.slice(0, 8));
  const dataz = data3.slice(8, 12).concat(data3.slice(0, 8));

  function generateData(startMonth, startYear, endMonth, endYear) {
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
    let data = [];

    let monthIndex = startMonth - 1; // -1 because array indices start from 0
    let year = startYear;

    while (year < endYear || (year === endYear && monthIndex < endMonth)) {
      data.push({
        name: `${monthNames[monthIndex]} ${year}`,
        PersonalLoan: data1[monthIndex],
        BusinessLoan: data2[monthIndex],
        TotalLoan: data3[monthIndex],
      });

      monthIndex = (monthIndex + 1) % 12;

      // If we've looped back to the beginning of the year, increment the year
      if (monthIndex === 0) {
        year++;
      }
    }

    return data;
  }

  // Get current month and year
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth() + 1; // getMonth() returns month index starting from 0
  let currentYear = currentDate.getFullYear();

  // Generate data starting from current month and year
  let data = generateData(1, 2023, currentMonth, currentYear);
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
        role:item.role,
        Rank: item.rank,
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
                  <h6 style={{ color: "#12151e" }} className="mb-1 tip">
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
                  <h6 style={{ color: "#12151e" }} className="mb-1 tip">
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
                  <h6 style={{ color: "#12151e" }} className="mb-1 tip">
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
                  <h6 style={{ color: "#12151e" }} className="mb-1 tip">
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
        {MoneyStatus(branchLoan, branchBLoan, [
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
              <div className="aligner-wrapper">
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
                  <XAxis dataKey="name" />
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

export default BranchDashboard;
