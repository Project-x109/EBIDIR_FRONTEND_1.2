import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import swal from "sweetalert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Doughnut, Bar } from "react-chartjs-2";
import { darkTheme, muiCache } from "../Admin/forms/errorConstants";
import styles from "./Modle.module.css";
import { makeStyles } from "@material-ui/core/styles";
import PDFGenerator from "../Admin/AdminPages/PDFGenerator";
const AmortizationComponent = ({
  loan_amount,
  Monthly_payment,
  interest,
  Loan_Payment_Period,
  createdAt,
  status,
  theLoan,
  updateAmortizeBLoan,
  className
}) => {
  const useStyles = makeStyles((theme) => ({
    table: {
      "& .MuiTableCell-root": {
        fontSize: "14px", // Default font size
      },
      [theme.breakpoints.up("sm")]: {
        "& .MuiTableCell-root": {
          fontSize: "12px", // Font size for small screens and above
        },
      },
      [theme.breakpoints.up("md")]: {
        "& .MuiTableCell-root": {
          fontSize: "14px", // Font size for medium screens and above
        },
      },
      [theme.breakpoints.up("lg")]: {
        "& .MuiTableCell-root": {
          fontSize: "14px", // Font size for large screens and above
        },
      },
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  //Table one
  const [responsive] = useState("vertical");
  //const [tableBodyWidth] = useState("");
  const [tableBodyMaxHeight] = useState("");
  const [searchBtn] = useState(true);
  const [downloadBtn] = useState(true);
  const [printBtn] = useState(true);
  const [viewColumnBtn] = useState(true);
  const [filterBtn] = useState(true);

  const columns = [
    { name: "Months" },
    { name: "Starting" },
    { name: "Interest" },
    { name: "Monthly" },
    { name: "Ending" },
  ];

  let Starting_Balance = loan_amount;
  let monthly = Monthly_payment;
  let interest_rate = interest;
  let payment_period = Loan_Payment_Period;
  let month = [
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

  const Years = new Date(createdAt).getFullYear();
  const numberOfYears = Math.ceil(Loan_Payment_Period / 12 + 100); // Calculate the number of years based on the loan payment period

  const Year = Array.from(
    { length: numberOfYears },
    (_, index) => Years + index
  );
  function createDate(months) {
    return month[months % 12] + " " + Year[parseInt(months / 12 + "")];
  }
  const startingDate = new Date(createdAt).getMonth();

  const menuItems = [];
  var Total_Interst_Charge = 0;
  for (var i = 1; i <= payment_period; i++) {
    let interest_Charge = (interest_rate / 12) * Starting_Balance;
    let ending_balance = Math.abs(Starting_Balance + interest_Charge - monthly);
    Total_Interst_Charge += interest_Charge;
    menuItems.unshift({
      Months: createDate(startingDate + i - 1),
      Starting: Number(Starting_Balance).toLocaleString(),
      Interest: Number(interest_Charge).toLocaleString(),
      Monthly: Number(monthly).toLocaleString(),
      Ending: Number(ending_balance).toLocaleString(),
    });

    Starting_Balance = ending_balance;
  }

  // Rest of the code for Doughnut, Bar, and Table
  const dynamicHeight = Math.min(menuItems.length * 18 + 10, 80) + "vh";

  const option = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive: "standard",
    downloadBtn: true,
    dynamicHeight,
    //tableBodyWidth,
    tableBodyMaxHeight,
    onTableChange: () => {},
  };
  const handleCreate = (value) => {
    swal({
      title: "Are you sure?",
      text: "Once updated, you will not be able to undo",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          updateAmortizeBLoan({ id: theLoan && theLoan._id, month: value })
        );
      } else {
        swal("Transaction has Been Cancelled ");
      }
    });
  };

  var btn = {
    name: "Months",
    label: "Update",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        var dateObj = new Date(value);
        var dateObjNew = new Date();
        var month = dateObj.getMonth();
        var year = dateObj.getFullYear();

        var monthNew = dateObjNew.getMonth();
        var yearNew = dateObjNew.getFullYear();

        var newdate = parseInt(year + "" + month);
        var newdateNew = parseInt(yearNew + "" + monthNew);
        return (
          <Button
            style={{ color: newdate < newdateNew ? "red" : null }}
            title={tableMeta}
            onClick={() => handleCreate(value)}
            disabled={newdate > newdateNew ? true : false}
            variant="outlined"
          >
            {theLoan?.paidMonths.indexOf(value) >= 0 ? (
              <CheckCircleOutlineIcon color="blue" />
            ) : (
              "Update"
            )}
          </Button>
        );
      },
    },
  };
  if (status === "approved") columns.push(btn);

  // Doughnut Chart data
  //Doughnut
  const doughnutPieData = {
    datasets: [
      {
        data: [Total_Interst_Charge, loan_amount],
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

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Total Interest Charge", "Total Loan"],
  };

  const doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  // Bar Chart data
  //Bar
  const data = {
    labels: ["Total Interset Charge", "Loan", "Total"],
    datasets: [
      {
        label: "ETB",
        data: [
          Total_Interst_Charge,
          loan_amount,
          Total_Interst_Charge + loan_amount,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
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
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const header1 = [
    "Months",
    "Starting Balance",
    "Interest",
    "Monthly Payment",
    "Ending Balance",
    "Status",
  ];
  // Return the JSX for the AmortizationComponent
  return (
    <div className={className}>
      <div className="col-12 grid-margin">
        <div
          style={{ marginTop: "20px" }}
          className="col-lg-12 grid-margin stretch-card"
        >
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Amortization Table</h3>
              <div className={`table-responsive ${classes.table}`}>
                <ThemeProvider theme={darkTheme}>
                  <CssBaseline />
                  <MUIDataTable
                    className={classes.table}
                    title={"Monthly Amortization"}
                    data={menuItems.reverse()}
                    columns={columns}
                    options={option}
                  />
                </ThemeProvider>
              </div>
              <PDFGenerator
                className={`${styles.cardnone}`}
                header={header1}
                data={menuItems}
                DocumentTitle="Amortization Detail"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row" id={styles.cards}>
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Loan Status</h3>
              <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Bar Chart</h4>
                      <Bar data={data} options={options} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="aligner-wrapper">
                        <h4 className="card-title">Doughnut Chart</h4>
                        <Doughnut
                          data={doughnutPieData}
                          options={doughnutPieOptions}
                        />
                        <div className="absolute center-content">
                          <br></br>
                          <br></br>
                          <br></br>
                          <p
                            style={{ color: "#343434" }}
                            className="font-weight-normal  text-center mb-0 "
                          >
                            Total
                          </p>
                          <h6
                            style={{
                              color: "#343434",
                              fontSize: "12px",
                            }}
                            className="font-weight-normal  text-center mb-8 "
                          >
                            {Number(
                              Total_Interst_Charge + loan_amount
                            ).toLocaleString()}
                          </h6>
                        </div>
                      </div>
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

export default AmortizationComponent;
