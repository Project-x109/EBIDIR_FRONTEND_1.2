import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import HorizontalScroll from "react-horizontal-scrolling";
import { bankBG } from "../../Dataset/DataCollections";
import { formatCompactNumber } from "../../Dataset/Functions";
import "./dashboard.css";
import male from "../../../assets/images/male.png";
import female from "../../../assets/images/female.png";
import logomain from "../../../assets/images/logocam.png";
export const statusDonught = (data) => {
  const transactionHistoryData = {
    labels: ["Pending", "Approved", "Rejected", "Closed"],
    datasets: [
      {
        data: data,
        backgroundColor: ["#00d25b", "#ffab00", "#FF1111", "#ee111c"],
      },
    ],
  };
  const total = data[0] + data[1] + data[2] + data[3];
  const transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  };
  return (
    <div className="col-md-4 grid-margin stretch-card">
      <div className="card admincards">
        <div className="card-body">
          <h4 id="header4" className="card-title">
            Loan Status Summary
          </h4>
          <div className="aligner-wrapper">
            <Doughnut
              data={transactionHistoryData}
              options={transactionHistoryOptions}
            />
            <div className="absolute center-content">
              <h5
                style={{ color: "#343434" }}
                className="font-weight-normal  text-center mb-2 "
              >
                {total ? total : 0}
              </h5>
              <p className="text-small text-muted text-center mb-0">Total</p>
            </div>
          </div>

          <div className="admincard red d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
            <div className="text-md-right text-xl-left">
              <h6 id="cardheader" className="mb-1 tip">
                Approved
              </h6>
              <p id="cardcontent" className="text-muted mb-0 second-text">
                Approved by all banks
              </p>
            </div>
            <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6 id="cardvalue" className="font-weight-bold mb-0">
                {data[0]}
              </h6>
            </div>
          </div>

          <div className="admincard blue d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
            <div className="text-md-right text-xl-left">
              <h6 id="cardheader" className="mb-1 tip">
                Pending
              </h6>
              <p id="cardcontent" className="text-muted mb-0 second-text">
                Waiting approval
              </p>
            </div>
            <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6 id="cardvalue" className="font-weight-bold mb-0">
                {data[1]}
              </h6>
            </div>
          </div>

          <div className="admincard green d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
            <div className="text-md-left text-xl-left">
              <h6 id="cardheader" className="mb-1 tip">
                Declined
              </h6>
              <p id="cardcontent" className="text-muted mb-0 second-text">
                Declined by Banks
              </p>
            </div>
            <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6 id="cardvalue" className="font-weight-bold mb-0">
                {data[2]}
              </h6>
            </div>
          </div>

          <div
            style={{ backgroundColor: "#e4e9ec" }}
            className="admincard yellow d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
          >
            <div className="text-md-left text-xl-left">
              <h6 id="cardheader" className="mb-1 tip">
                Closed
              </h6>
              <p id="cardcontent" className="text-muted mb-0 second-text">
                Fully Paid loans
              </p>
            </div>
            <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6 id="cardvalue" className="font-weight-bold mb-0">
                {data[3]}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const usercard = (userdata) => {
  return (
    <div className="preview-item border-bottom">
      <div className="preview-thumbnail">
        <div className="preview-icon bg-success">
          <Avatar
            style={{ height: 60, width: 60 }}
            variant={userdata?.type === "Bussiness" ? "square" : "circular"}
            src={userdata?.image}
            alt="parmas.userImage"
          />
        </div>
      </div>
      <div className="preview-item-content d-sm-flex flex-grow">
        <div className="flex-grow">
          <h6 className="preview-subject">{userdata?.name}</h6>
          <p className="text-muted mb-0">{userdata?.phoneNo}</p>
        </div>
        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
          <p className="text-muted">{userdata?.score}</p>
          <p className="text-muted mb-0">{userdata?.Rank}</p>
        </div>
      </div>
    </div>
  );
};
export const Top10 = (data) => {
  return (
    <div className="col-md-8 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Top 10 High Ranking Users</h4>
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <p className="text-muted mb-1">Users</p>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="preview-list">
                      {data.slice(0, 5).map((userdata) => {
                        return (
                          <div className="preview-item border-bottom">
                            <div className="preview-thumbnail">
                              <div className="preview-icon">
                                <Avatar
                                  style={{ height: 60, width: 60}}
                                  variant="circular"
                                  src={userdata?.image?userdata?.image:(userdata?.gender=="Male"?male:(userdata?.gender=="Female"?female:logomain))}
                                  alt="parmas.userImage"
                                />
                              </div>
                            </div>
                            <div className="preview-item-content d-sm-flex flex-grow">
                              <div className="flex-grow">
                                <h6 className="preview-subject mb-2">
                                  {userdata?.name}
                                </h6>
                                <p className="text-muted mb-2">
                                  {userdata?.phoneNo}
                                </p>
                              </div>
                              <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                <p className="text-muted mb-2">
                                  {userdata?.score}
                                </p>
                                <p className="text-muted mb-2">
                                  {userdata?.Rank}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <p className="text-muted mb-1">Users</p>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="preview-list">
                      {data.slice(5, 10).map((userdata) => {
                        return (
                          <div className="preview-item border-bottom">
                            <div className="preview-thumbnail">
                              <div className="preview-icon">
                                <Avatar
                                  style={{ height: 60, width: 60 }}
                                  variant={"circular"}
                                  src={userdata?.image?userdata?.image:(userdata?.gender=="Male"?male:(userdata?.gender=="Female"?female:logomain))}
                                  alt="parmas.userImage"
                                />
                              </div>
                            </div>
                            <div className="preview-item-content d-sm-flex flex-grow">
                              <div className="flex-grow">
                                <h6 className="preview-subject">
                                  {userdata?.name}
                                </h6>
                                <p className="text-muted mb-0">
                                  {userdata?.phoneNo}
                                </p>
                              </div>
                              <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                <p className="text-muted">{userdata?.score}</p>
                                <p className="text-muted mb-0">
                                  {userdata?.Rank}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const numberScroll = (totalMoney) => {
  const child = { width: `100em`, height: `100%` };
  return (
    <div id="cards">
      <HorizontalScroll>
        <div id="cards" style={{ child, whiteSpace: "pre" }} className="row">
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
                  {/*<div className="col-3">
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
                  {/*<div className="col-3">
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
                  {/*<div className="col-3">
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
                        {formatCompactNumber(totalMoney[6])}
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </HorizontalScroll>
    </div>
  );
};
export const MoneyStatus = (loans, bloans, totalMoney) => {
  const doughnutPieData = {
    datasets: [
      {
        data: [loans?.length, bloans?.length, bloans?.length + loans?.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],

    labels: ["Personal Loans", "Business Loans", "Total Loans"],
  };
  const doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };
  return (
    <div id="cards" className="col-md-6 grid-margin stretch-card">
      <div className="card admincards">
        <div className="card-body">
          <h4 className="card-title">Summary of Loans</h4>
          <div id="cards" className="aligner-wrapper">
            <Doughnut data={doughnutPieData} options={doughnutPieOptions} />
            <div className="absolute center-content">
              <br></br>
              <br></br>
              <h5 className="font-weight-normal body-color text-center mb-2 ">
                {loans.length + bloans?.length}
              </h5>
              <p className="text-small text-muted text-center mb-0">Total</p>
            </div>
          </div>

          <div
            style={{ backgroundColor: "#e4e9ec" }}
            className="admincard red d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
          >
            <div className="text-md-left text-xl-left">
              <h6 className="mb-1 tip">Personal</h6>
              <p id="loanlength" className="text-muted mb-0">
                {loans.length}
              </p>
            </div>
            <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6
                id="summery_of_loans"
                className="font-weight-bold mb-0 summery_of_loansfont"
              >
                Average {formatCompactNumber(totalMoney[1] / loans.length)} ETB
              </h6>
            </div>
          </div>
          <div
            style={{ backgroundColor: "#e4e9ec" }}
            className="admincard blue d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
          >
            <div className="text-md-left text-xl-left">
              <h6 className="mb-1 tip">Business</h6>
              <p id="loanlength" className="text-muted mb-0">
                {bloans?.length}
              </p>
            </div>
            <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6 id="summery_of_loans" className="font-weight-bold mb-0">
                Average {formatCompactNumber(totalMoney[2] / bloans?.length)}{" "}
                ETB
              </h6>
            </div>
          </div>
          <div
            style={{ backgroundColor: "#e4e9ec" }}
            className="admincard green d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
          >
            <div className="text-md-center text-xl-left">
              <h6 className="mb-1 tip">Total</h6>
              <p id="loanlength" className="text-muted mb-0">
                {loans.length + bloans?.length}
              </p>
            </div>
            <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6 id="summery_of_loans" className="font-weight-bold mb-0">
                Average{" "}
                {formatCompactNumber(
                  totalMoney[0] / (loans.length + bloans?.length)
                )}{" "}
                ETB
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const BankCard = (data) => {
  const child2 = { width: `13em`, height: `100%` };
  const logo = { width: `220`, height: 155 };
  return (
    <Card sx={{ display: "flex", bgcolor: data.bg, color: "white" }}>
      <CardMedia
        component="img"
        sx={logo}
        image={data.img}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent style={child2} sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {data.name}
          </Typography>
          <div className="row">
            <div className="col-9">
              <div className="d-flex align-items-center align-self-start">
                <h3 className="mb-0">{data.users}</h3>
                <p className="text-success ml-2 mb-0 font-weight-medium">
                  Users
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Box>
    </Card>
  );
};
export const getData = (Collaterals) => {
  const data = {
    labels: ["vehicles", "Building", "vehicles,Building", "Total"],
    datasets: [
      {
        label: "Personal Loan",
        data: [
          Collaterals[0],
          Collaterals[1],
          Collaterals[2],
          Collaterals[0] + Collaterals[1] + Collaterals[2],
        ],
        backgroundColor: [
          "rgb(40,95,136)",
          "rgb(40,95,136)",
          "rgb(40,95,136)",
          "rgb(40,95,136)",
        ],
        borderColor: [
          "rgb(40,95,136)",
          "rgb(40,95,136)",
          "rgb(40,95,136)",
          "rgb(40,95,136)",
        ],
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Business Loan",
        data: [
          Collaterals[3],
          Collaterals[4],
          Collaterals[5],
          Collaterals[3] + Collaterals[4] + Collaterals[5],
        ],
        backgroundColor: [
          "rgb(139,117,60)",
          "rgb(139,117,60)",
          "rgb(139,117,60)",
          "rgb(139,117,60)",
        ],
        borderColor: [
          "rgb(139,117,60)",
          "rgb(139,117,60)",
          "rgb(139,117,60)",
          "rgb(139,117,60)",
        ],
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Total",
        data: [
          Collaterals[3] + Collaterals[0],
          Collaterals[4] + Collaterals[1],
          Collaterals[5] + Collaterals[2],
          Collaterals[0] +
            Collaterals[1] +
            Collaterals[2] +
            Collaterals[3] +
            Collaterals[4] +
            Collaterals[5],
        ],
        backgroundColor: [
          "rgb(139,64,84)",
          "rgb(139,64,84)",
          "rgb(139,64,84)",
          "rgb(139,64,84)",
        ],
        borderColor: [
          "rgb(139,64,84)",
          "rgb(139,64,84)",
          "rgb(139,64,84)",
          "rgb(139,64,84)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  return data;
};

export const horizontalScroll = (banks, BankLoans) => {
  const child2 = { width: `13em`, height: `100%` };
  const logo = { width: `220`, height: 155 };
  const BankSlice = [
    banks.slice(0, 4),
    banks.slice(4, 8),
    banks.slice(8, 12),
    banks.slice(12, 16),
    banks.slice(16, 20),
    banks.slice(20, 24),
    banks.slice(24, 28),
  ];
  const addSpaceBetweenCards = (index) => {
    if (index === 4 || index === 8 || index === 12 || index === 16) {
      return <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;
    } else {
      return <></>;
    }
  };
  var x = 0;
  const child = { width: `100em`, height: `100%` };
  return (
    <HorizontalScroll>
      {BankSlice.map((bank) => {
        return (
          <div style={child} className="row">
            {bank &&
              bank.map((item, index) => {
                return (
                  <div
                    id="cards"
                    style={{ whiteSpace: "pre" }}
                    className="col-xl-3 col-sm-6 grid-margin stretch-card"
                  >
                    <Card
                      sx={{
                        display: "flex",
                        bgcolor: bankBG[0][item.bank_name]?.bg,
                        color: "white",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={logo}
                        image={bankBG[0][item.bank_name]?.img}
                        alt="Live from space album cover"
                        style={{ background: "white" }}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent style={child2} sx={{ flex: "1 0 auto" }}>
                          <Typography component="div" variant="h6">
                            {item.bank_name}
                          </Typography>
                          <div className="row">
                            <div className="col-9">
                              <div className="d-flex align-items-center align-self-start">
                                <h3
                                  style={{ whiteSpace: "pre" }}
                                  className="mb-0"
                                >
                                  {BankLoans[item.bank_name].length}
                                </h3>
                                <p
                                  id="spacebetwen"
                                  style={{ color: "white" }}
                                  className=" ml-2 mb-0 font-weight-medium"
                                >
                                  Loans
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Box>
                    </Card>
                    <div style={{ display: "none" }}>{(x = x + 1)}</div>
                    {addSpaceBetweenCards(index + 1)}
                    {/* {x === 4 ? (
                      addSpaceBetweenCards(index + 1)
                    ) : x === 8 ? (
                      addSpaceBetweenCards(index + 2)
                    ) : x === 12 ? (
                      addSpaceBetweenCards(index + 3)
                    ) : x === 16 ? (
                      addSpaceBetweenCards(index + 4)
                    ) : (
                      <></>
                    )} */}
                  </div>
                );
              })}
          </div>
        );
      })}
    </HorizontalScroll>
  );
};
export const loanScroll = (loanSlice) => {
  const child2 = { width: `13em`, height: `100%` };
  const logo = { width: `220`, height: 155 };
  var x = 0;
  const child = { width: `100em`, height: `100%` };
  return (
    <HorizontalScroll>
      {loanSlice &&
        loanSlice.map((bank) => {
          return (
            <div style={child} className="row">
              {bank &&
                bank.map((item) => {
                  return (
                    <div
                      style={{ whiteSpace: "pre" }}
                      className="col-xl-3 col-sm-6 grid-margin stretch-card"
                    >
                      <Card
                        sx={{
                          display: "flex",
                          bgcolor: bankBG[0][item.bank_name]?.bg,
                          color: "white",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={logo}
                          image={bankBG[0][item.bank_name]?.img}
                          alt="Live from space album cover"
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardContent style={child2} sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="h6">
                              {item.bank_name}
                            </Typography>
                            <div className="row">
                              <div className="col-9">
                                <div className="d-flex align-items-center align-self-start">
                                  <h3 className="mb-0">12</h3>
                                  <p className="text-success ml-2 mb-0 font-weight-medium">
                                    Users
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Box>
                      </Card>
                      <div style={{ display: "none" }}>{(x = x + 1)}</div>
                      {x === 3 ? (
                        <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                      ) : x === 6 ? (
                        <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                      ) : x === 9 ? (
                        <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                      ) : x === 12 ? (
                        <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </HorizontalScroll>
  );
};
export const LineData = (dataArray, topBanks) => {
  // Get the current date and month
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  // Subtract 10 months from the current date and month
  const startDate = new Date(date.setMonth(month - 10));

  // Get the start month and year
  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();

  var data1 = new Map();
  var data2 = new Map();
  var data3 = new Map();
  const months = [
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
  topBanks.forEach((bank, index) => {
    (bank || []).forEach((item) => {
      let key =
        months[new Date(item.createdAt).getMonth()] +
        " " +
        new Date(item.createdAt).getFullYear();
      // Use a switch statement to assign the values to the right map
      switch (index) {
        case 0:
          if (data1.has(key)) {
            data1.set(key, data1.get(key) + 1);
          } else {
            data1.set(key, 1);
          }
          break;
        case 1:
          if (data2.has(key)) {
            data2.set(key, data2.get(key) + 1);
          } else {
            data2.set(key, 1);
          }
          break;
        case 2:
          if (data3.has(key)) {
            data3.set(key, data3.get(key) + 1);
          } else {
            data3.set(key, 1);
          }
          break;
        default:
          break;
      }
    });
  });

  // Generate the labels as before
  const labels = Array.from(
    { length: 11 },
    (_, i) =>
      `${months[(startMonth + i) % 12]} ${
        startYear + Math.floor((startMonth + i) / 12)
      }`
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: dataArray[0]?.Bank,
        data: labels.map((label) => data1.get(label) || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(255,99,132,1)",
          "rgba(255,99,132,1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
      {
        label: dataArray[1]?.Bank,
        data: labels.map((label) => data2.get(label) || 0),
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
      {
        label: dataArray[2]?.Bank,
        data: labels.map((label) => data3.get(label) || 0),
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };
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
    hover: {
      mode: "hover",
      intersect: true,
    },
    tooltips: {
      mode: "hover",
      intersect: true,
      callbacks: {
        label: function (tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || "";
          if (label) {
            label += ": ";
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label;
        },
      },
    },
  };
  return [data, options];
};
