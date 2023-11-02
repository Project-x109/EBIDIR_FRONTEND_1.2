import React, { useEffect, useState } from "react";
import { getAllBanks } from "../../../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { horizontalScroll, statusDonught } from "./dashboardData";
import {
  GetStatus,
  getAllBLoans,
  getAllLoans,
  getBLoan,
  getLoan,
} from "../../../Actions/LoanAction";
import { bankBG } from "../../Dataset/DataCollections";
import moment from "moment";
import "./dashboard.css";
import BuildingandCar from "../../../assets/images/BuildingandCar.png";
import Car from "../../../assets/images/BuildingandCar.png";
import Building from "../../../assets/images/Car.png";
const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { myloan } = useSelector((state) => state.myloan);
  const { mybloan } = useSelector((state) => state.mybloan);
  const { banks } = useSelector((state) => state.banks);

  const { statusData, loading } = useSelector((state) => state.statusData);

  // const {Approved,Pending,Declined ,Closed}=statusData;
  /*  const BankLoans = [];
  banks.forEach((bank) => {
    BankLoans[bank.bank_name] = [];
  }); */

  const BankLoans = banks.reduce((acc, bank) => {
    acc[bank.bank_name] = [];
    return acc;
  }, {});

  useEffect(() => {
    dispatch(getLoan());
    dispatch(getBLoan());
    dispatch(GetStatus());
    dispatch(getAllBanks());
    dispatch(getAllBLoans());
    dispatch(getAllLoans());
  }, [dispatch]);

  var x = 0;
  /* loans &&
    loans.forEach((item) => {
      item.Bank in BankLoans ? BankLoans[item.Bank].push(item) : x++;
    });
  bloans &&
    bloans.forEach((item) => {
      item.Bank in BankLoans ? BankLoans[item.Bank].push(item) : x--;
    }); */

  Array.isArray(myloan) &&
    myloan.forEach((item) => {
      if (item.Bank in BankLoans) {
        BankLoans[item.Bank].push(item);
      }
    });

  Array.isArray(mybloan) &&
    mybloan.forEach((item) => {
      if (item.Bank in BankLoans) {
        BankLoans[item.Bank].push(item);
      }
    });

  // bloans &&
  //   bloans.forEach((item) => {
  //     if (item.Bank in BankLoans) {
  //       BankLoans[item.Bank].push(item);
  //     }
  //   });

  let [name, setname] = useState();
  useEffect(() => {
    if (user) {
      if (user && user.role === "user") setname(user.name);
      else if (user && user.role === "company") setname(user.cname);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getAllLoans());
    dispatch(getAllBLoans());
  }, [dispatch]);

  var loanSlice = [];
  var bloanSlice = [];
  if (user && user?.role === "user") {
    if (Array.isArray(myloan))
      loanSlice = [
        myloan
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3),
      ];
  } else {
    if (Array.isArray(mybloan))
      bloanSlice = [
        mybloan
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3),
      ];
  }
  const LoanStatus = [0, 0, 0, 0];
  Array.isArray(myloan) &&
    myloan.forEach((item) => {
      if (item.status === "approved") {
        LoanStatus[0]++;
      }
      if (item.status === "pending") {
        LoanStatus[1]++;
      }
      if (item.status === "declined") {
        LoanStatus[2]++;
      }
      if (item.status === "Closed") {
        LoanStatus[3]++;
      }
    });

  Array.isArray(mybloan) &&
    mybloan.forEach((item) => {
      if (item.status === "approved") {
        LoanStatus[0]++;
      }
      if (item.status === "pending") {
        LoanStatus[1]++;
      }
      if (item.status === "declined") {
        LoanStatus[2]++;
      }
      if (item.status === "Closed") {
        LoanStatus[3]++;
      }
    });
  return (
    <div>
      {/* {loading && <BackdropLoader/>} */}
      {horizontalScroll(banks, BankLoans)}

      <div className="row">
        {statusDonught([
          LoanStatus[0],
          LoanStatus[1],
          LoanStatus[2],
          LoanStatus[3],
        ])}
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 id="header4" className="card-title">
                Available Banks
              </h4>
              <div className="table-responsive">
                <table className="table header">
                  <thead>
                    <tr>
                      <th id="tabletitle"> Bank Name </th>
                      <th id="tabletitle"> Phone Number </th>
                      <th id="tabletitle"> Email</th>
                      <th id="tabletitle"> Head of office</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banks.slice(0, 7).map((bank) => {
                      return (
                        <tr>
                          <td>
                            <div className="d-flex">
                              <img
                                src={bankBG[0][bank.bank_name]?.img}
                                alt="face"
                              />
                              <span id="value" className="pl-2 image_value">
                                {bank.bank_name}
                              </span>
                            </div>
                          </td>
                          <td id="value">{bank.bank_phoneNo}</td>
                          <td id="value">{bank.bank_email}</td>
                          <td id="value"> Addis Ababa </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button class="custom-btn btn-2">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="/bankinfo"
                  >
                    Read More
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user && user?.role === "user"
        ? loanSlice?.map((loans) => {
            return (
              <div className="row">
                {loans?.map((loan) => {
                  return (
                    <>
                      {" "}
                      <div className="col-sm-4 grid-margin stretch-card">
                        <div class="card1">
                          <div className="cardcontainer">
                            <h4 className="headerforloan">Applied Loans</h4>
                            <div class="card1-content">
                              <div class="card1-top">
                                <span id="value" class="card1-title">
                                  {loan.Bank}
                                </span>
                                <p id="value">
                                  {moment(loan.createdAt)
                                    .utc()
                                    .format("DD-MM-YYYY")}
                                </p>
                              </div>
                              <div class="card1-bottom">
                                <p id="value">
                                  {Number(loan.loan_amount).toLocaleString()}
                                </p>
                                <p
                                  id="value"
                                  className="text-success ml-2 mb-0 font-weight-medium"
                                >
                                  ETB
                                </p>
                                <svg
                                  width="32"
                                  viewBox="0 -960 960 960"
                                  height="32"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z"></path>
                                </svg>
                              </div>
                            </div>
                            <div class="card1-image">
                              {loan.Types_of_Collateral == "Car" ? (
                                <img src={BuildingandCar}></img>
                              ) : loan.Types_of_Collateral == "Building" ? (
                                <img id="home" alt="Home" src={Building}></img>
                              ) : (
                                <img src={Car}></img>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            );
          })
        : bloanSlice?.map((bloans) => {
            return (
              <div className="row">
                {bloans?.map((bloans) => {
                  return (
                    <>
                      {" "}
                      <div className="col-sm-4 grid-margin stretch-card">
                        <div class="card1">
                          <div className="cardcontainer">
                            <h4 className="headerforloan">Applied Loans</h4>
                            <div class="card1-content">
                              <div class="card1-top">
                                <span id="value" class="card1-title">
                                  {bloans.Bank}
                                </span>
                                <p id="value">
                                  {moment(bloans.createdAt)
                                    .utc()
                                    .format("DD-MM-YYYY")}
                                </p>
                              </div>
                              <div class="card1-bottom">
                                <p id="value">
                                  {Number(bloans.loan_amount).toLocaleString()}
                                </p>
                                <p
                                  id="value"
                                  className="text-success ml-2 mb-0 font-weight-medium"
                                >
                                  ETB
                                </p>
                                <svg
                                  width="32"
                                  viewBox="0 -960 960 960"
                                  height="32"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19
                                -47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 
                                28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-
                                28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div class="card1-image">
                            {bloans.Types_of_Collateral == "Car" ? (
                              <img src={BuildingandCar}></img>
                            ) : bloans.Types_of_Collateral == "Building" ? (
                              <img id="home" alt="Home" src={Building}></img>
                            ) : (
                              <img src={Car}></img>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            );
          })}
    </div>
  );
};

export default UserDashboard;
