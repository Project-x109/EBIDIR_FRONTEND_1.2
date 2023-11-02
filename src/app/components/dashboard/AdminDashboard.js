import React, { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  getAllBanks,
  getAllCompanies,
  getAllUsers,
} from "../../../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getData,
  horizontalScroll,
  LineData,
  MoneyStatus,
  numberScroll,
  statusDonught,
  Top10,
} from "./dashboardData";
import { getAllBLoans, getAllLoans } from "../../../Actions/LoanAction";
import moment from "moment";
import { DESCSort, selectionSort } from "../../Dataset/Functions";
import BackdropLoader from "../../components/common/BackdropLoader";
import "./dashboard.css";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  // const {isAuthenticated,login,loading}=useSelector(state=>state.login)
  const { users } = useSelector((state) => state.users);
  const { companies } = useSelector((state) => state.companies);
  const { loans } = useSelector((state) => state.loans);
  const { bloans } = useSelector((state) => state.bloans);
  const { banks, loader } = useSelector((state) => state.banks);
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCompanies());
    dispatch(getAllLoans());
    dispatch(getAllBLoans());
    dispatch(getAllBanks());
  }, [dispatch]);
  const Approved = [],
    Pending = [],
    Declined = [],
    Closed = [];
 /*  const BankLoans = [];
  banks.forEach((bank) => {
    BankLoans[bank.bank_name] = [];
  }); */



  const BankLoans = banks.reduce((acc, bank) => {
    acc[bank.bank_name] = [];
    return acc;
  }, {});
  const dataArray = [];
  let totalMoney = [0, 0, 0, 0, 0, 0, 0];
  let Collaterals = [0, 0, 0, 0, 0, 0];
  var x = 0;
  loans &&
    loans.forEach((item) => {
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
      item.Bank in BankLoans ? BankLoans[item.Bank].push(item) : ++x;
      totalMoney[0] += parseFloat(item?.loan_amount);
      if (item.status === "approved") {
        Approved.push(item);
        totalMoney[4] += parseFloat(item?.loan_amount);
      }
      if (item.status === "pending") {
        Pending.push(item);
        totalMoney[3] += parseFloat(item?.loan_amount);
      }
      if (item.status === "declined") {
        Declined.push(item);
        totalMoney[5] += parseFloat(item?.loan_amount);
      }
      if (item.status === "closed") {
        Closed.push(item);
        totalMoney[6] += parseFloat(item?.loan_amount);
      }
    });
  totalMoney[1] = totalMoney[0];
  bloans &&
    bloans.forEach((item) => {
      if (
        item.Types_of_Collateral === "Car,Building" ||
        item.Types_of_Collateral === "Car, Building"
      )
        Collaterals[5] += 1;
        item.Bank in BankLoans ? BankLoans[item.Bank].push(item) : ++x;
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
      totalMoney[0] += parseFloat(item?.loan_amount);
      if (item.status === "approved") {
        Approved.push(item);
        totalMoney[4] += parseFloat(item?.loan_amount);
      }
      if (item.status === "pending") {
        Pending.push(item);
        totalMoney[3] += parseFloat(item?.loan_amount);
      }
      if (item.status === "Declined") {
        Declined.push(item);
        totalMoney[5] += parseFloat(item?.loan_amount);
      }
      if (item.status === "Closed") {
        Closed.push(item);
        totalMoney[6] += parseFloat(item?.loan_amount);
      }
    });
  totalMoney[2] = totalMoney[0] - totalMoney[1];

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
        gender:item.gender,
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
        score: item.score,
        role:item.role,
        Rank: item.rank,
        image: item?.logo?.url,
        createdAt: moment(item.createdAt).utc().format("DD-MM-YYYY"),
      });
    });
  userData.sort(DESCSort("score"));
  Object.keys(BankLoans).map((item) => {
    dataArray.push({ Bank: item, length: BankLoans[item].length });
  });

  selectionSort(BankLoans);
  dataArray.sort(DESCSort("length"));
  // You can use maps or objects like this

  const topBanks = [
    BankLoans[dataArray[0]?.Bank],
    BankLoans[dataArray[1]?.Bank],
    BankLoans[dataArray[2]?.Bank],
  ];

  const data = getData(Collaterals);

  const lineData = LineData(dataArray, topBanks);
  const datasetKeyProvider = (dataset, index) => {
    return `dataset-${dataset.label}`;
  };

  var x = 0;
  return (
    <div style={{ textTransform: "capitalize" }}>
      {loader && <BackdropLoader />}
      {horizontalScroll(banks, BankLoans)}


      <div className="row">
        {statusDonught([
          Approved.length,
          Pending.length,
          Declined.length,
          Closed.length,
        ])}
        {Top10(userData.filter(item => item.role == 'user' || item.role == 'company').slice(0, 10))}
      </div>

      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Collateral Status Summary</h4>
              <div id="cards" className="aligner-wrapper">
                <Bar data={data} options={lineData[1]} />
              </div>
              <div
                style={{ backgroundColor: "#e4e9ec" }}
                className=" d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
              >
                <div className="text-md-right text-xl-left">
                  <h6
                    id="header6"
                    style={{ color: "#12151e" }}
                    className="mb-1"
                  >
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
              <div
                style={{ backgroundColor: "#e4e9ec" }}
                className=" d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
              >
                <div className="text-md-right text-xl-left">
                  <h6
                    id="header6"
                    style={{ color: "#12151e" }}
                    className="mb-1"
                  >
                    Building
                  </h6>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 id="cardvalue" className="font-weight-bold mb-0">
                    {Collaterals[4] + Collaterals[1]}
                  </h6>
                </div>
              </div>
              <div
                style={{ backgroundColor: "#e4e9ec" }}
                className=" d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
              >
                <div className="text-md-right text-xl-left">
                  <h6
                    id="header6"
                    style={{ color: "#12151e" }}
                    className="mb-1"
                  >
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
                className=" d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
              >
                <div className="text-md-right text-xl-left">
                  <h6
                    id="header6"
                    style={{ color: "#12151e" }}
                    className="mb-1"
                  >
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
        {MoneyStatus(loans, bloans, totalMoney)}
      </div>
      {numberScroll(totalMoney)}

      <div id="cards" className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Top Banks Loan Summary </h4>
              <div className="aligner-wrapper">
                <Line data={lineData[0]} options={lineData[2]} datasetKeyProvider={datasetKeyProvider}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AdminDashboard;
