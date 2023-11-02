import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBLoanDetails,
  updateAmortizeBLoan,
} from "../../../Actions/LoanAction";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { getUser } from "../../../Actions/UserAction";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import { getBankDetails, getCompanyById } from "../../../Actions/UserAction";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { UPDATE_BLOAN_RESET } from "../../../Constants/LoanConstants";
import BackdropLoader from "../common/BackdropLoader";
import { getCarByLoanId } from "../../../Actions/CarAction";
import { getBuildingByLoanId } from "../../../Actions/BuildingAction";
import styles from "./Modle.module.css";
import AmortizationComponent from "./AmortizationComponent";
import CarModal from "./carModal";
import BuildingModal from "./buildingModal";
import CarandBuildingModal from "./carandbuildingModal";
import LoanDetailGenerator from "../Admin/AdminPages/LoanDetailPrinter";
import "./BankInfo.css"; // Import the CSS file
import download from "downloadjs";
const BLoanDetails = () => {
  let { id } = useParams();

  const { theUser } = useSelector((state) => state.theUser);

  const { car } = useSelector((state) => state.car);
  const { building } = useSelector((state) => state.building);
  const { mybank } = useSelector((state) => state.mybank);
  const { success, error } = useSelector((state) => state.update);
  const { theLoan, loading } = useSelector((state) => state.theLoan);
  const [IdUser, setIdUser] = useState(theLoan && theLoan.id);

  const dispatch = useDispatch();
  const [loan_amount, setloan_amount] = useState(
    theLoan && theLoan.loan_amount
  );
  const [Reason_for_loan, setReason_for_loan] = useState(
    theLoan && theLoan.Reason_for_loan
  );
  const [Loan_Payment_Period, setLoan_Payment_Period] = useState(
    theLoan && theLoan.Loan_Payment_Period
  );
  const [status, setstatus] = useState(theLoan && theLoan.status);
  const [Type_Of_Loan, setType_Of_Loan] = useState(
    theLoan && theLoan.Type_Of_Loan
  );
  const [Bank, setBank] = useState(theLoan && theLoan.Bank);
  const [Branch, setBranch] = useState(theLoan && theLoan.Branch?.branch_name);
  const [Types_of_Collateral, setTypes_of_Collateral] = useState(
    theLoan && theLoan.Types_of_Collateral
  );
  const [Collateralcar, setCollateralCar] = useState(
    theLoan && theLoan.totalCollateral?.car
  );
  const [Collateralbuilding, setCollateralBuilding] = useState(
    theLoan && theLoan.totalCollateral?.building
  );
  const [Monthly_payment, setMonthly_payment] = useState(
    Math.round(theLoan && theLoan.Monthly_payment)
  );
  const [interest, setinterest] = useState(theLoan && theLoan.interest);
  const [score, setScore] = useState(theLoan && theLoan.score);
  const [createdAt, setCreatedAt] = useState(theLoan && theLoan.createdAt);

  const [CTIN_Number, serCTINumber] = useState(theUser && theUser.CTIN_Number);
  const [General_Manager, setGeneralManager] = useState(
    theUser && theUser.General_Manager
  );
  const [cemail, setCemail] = useState(theUser && theUser.cemail);
  const [cname, setcname] = useState(theUser && theUser.cname);
  const [cphoneNo, setCphoneNo] = useState(theUser && theUser.cphoneNo);
  const [legal_status, setlegal_status] = useState(
    theUser && theUser.legal_status
  );
  const [logo, setlogo] = useState(theUser && theUser.logo?.url);
  const [sector, setSector] = useState(theUser && theUser.sector);
  const [file, setFile] = useState(theUser && theUser.scannedFiles?.[0]?.url);

  const [rank, setRank] = useState(theLoan && theLoan.rank);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getCarByLoanId({ id: id }));
  }, [id, dispatch]);
  useEffect(() => {
    dispatch(getBuildingByLoanId({ id: id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "" + error,
        type: "error",
        text: "Eror Occured: " + error,
        background: "pink",
      });
    }
    if (success) {
      Swal.fire({
        title: "Loan information Updated",
        type: "success",
        text: "The Loan Status has been updated Successfully!",
        background: "white",
      });
      dispatch({ type: UPDATE_BLOAN_RESET });
      dispatch(getBLoanDetails({ id: id }));
    }
  }, [success, error, dispatch, id]);

  //const [setButtonText] = useState('Update');
  //const [setDisable] = React.useState(false);
  useEffect(() => {
    dispatch(getBankDetails());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCompanyById(theLoan?.id));
  }, [dispatch, theLoan,IdUser]);

  useEffect(() => {
    if (theLoan) {
      setIdUser(theLoan.id);
      setloan_amount(theLoan.loan_amount);
      setReason_for_loan(theLoan.Reason_for_loan);
      setLoan_Payment_Period(theLoan.Loan_Payment_Period);
      setstatus(theLoan.status);
      setType_Of_Loan(theLoan.Type_Of_Loan);
      setBank(theLoan.Bank);
      setBranch(theLoan && theLoan.Branch?.branch_name);
      setTypes_of_Collateral(theLoan.Types_of_Collateral);
      setMonthly_payment(theLoan.Monthly_payment);
      setinterest(theLoan.interest);
      setCollateralBuilding(theLoan.totalCollateral?.building);
      setCollateralCar(theLoan.totalCollateral?.car);
      setScore(theLoan.score);
      setRank(theLoan.rank);
      setCreatedAt(theLoan.createdAt);
    } else dispatch(getBLoanDetails({ id: id }));
  }, [dispatch, theLoan, id]);

  useEffect(() => {
    dispatch(getBLoanDetails({ id: id }));
  }, [dispatch, id]);
  const [expanded] = React.useState(true);
 


  useEffect(() => {
    if (theUser) {
      setcname(theUser.cname);
      setSector(theUser.sector);
      setlegal_status(theUser.legal_status);
      setCphoneNo(theUser.cphoneNo);
      setCemail(theUser.cemail);
      setlogo(theUser.logo?.url);
      setGeneralManager(theUser.General_Manager);
      serCTINumber(theUser && theUser.CTIN_Number);
      setFile(theUser && theUser.scannedFiles?.[0]?.url);
    }
  }, [dispatch, theUser]);

  const showImage = () => {
    Swal.fire({
      title: "Profile Image",
      html: `<img src="${logo}" alt="Profile Image" style="max-width: 100%; height: auto;" />`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Close",
      showCancelButton: false,
      showCloseButton: true,
      customClass: {
        title: "my-swal-title",
        content: "my-swal-content",
      },
      onOpen: () => {
        Swal.getCloseButton().focus(); // Focus on the close button when Swal is opened
      },
    });
  };

  return (
    <div>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <div className="page-header">
        <h3 className={`${"page-title"} ${styles.headerthree}`}>Loan Detail</h3>
        <nav id={styles.cards} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Add Users
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Bank Registration
            </li>
          </ol>
        </nav>
      </div>

      <div className={`${"row"} ${styles.mainmargin}`}>
        <div className="col-12 grid-margin">
          <div className={`${"card"} ${styles.mainmargin2}`}>
            <div className="card-body">
              <h3 className={`${"card-title"} ${styles.maintitle}`}>
                Company Detail
              </h3>
              <Card sx={{ maxWidth: 1300, bgcolor: "white", color: "#343434" }}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <MDBRow style={{ whiteSpace: "pre" }} tag="dl">
                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Name:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {cname}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Sector:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {sector}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Phone Number:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {cphoneNo}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Email:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {cemail}
                        </MDBCol>
                      </div>
                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Manager Name:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {General_Manager}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          TIN Number:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {CTIN_Number}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Legal Status:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {legal_status}
                        </MDBCol>
                      </div>
                      <div className={styles.buttonContainer}>
                        <Button
                          className={`${styles.cancelBtn} ${styles.cardnone}`}
                          variant="contained"
                          onClick={showImage}
                        >
                          View Image
                        </Button>
                        <Button
                          className={`${styles.DownloadBtn} ${styles.cardnone}`}
                          variant="contained"
                          onClick={() => download(file)}
                        >
                          Download File
                        </Button>
                      </div>
                    </MDBRow>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className={`${"row"} ${styles.mainmargin}`}>
        <div className="col-12 grid-margin">
          <div className={`${"card"} ${styles.mainmargin2}`}>
            <div className="card-body">
              <h3 className={`${"card-title"} ${styles.maintitle}`}>
                Loan Detail
              </h3>
              <Card sx={{ maxWidth: 1300, bgcolor: "white", color: "#343434" }}>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <MDBRow style={{ whiteSpace: "pre" }} tag="dl">
                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Bank:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {Bank}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Branch:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {Branch}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Reason for Loan:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {Reason_for_loan}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Status:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {status}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Type Of Loan:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {Type_Of_Loan}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Type Of Collateral:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {Types_of_Collateral}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Interest:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {interest * 100}
                          {"%"}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Loan Amount:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {Number(loan_amount).toLocaleString()} {"ETB"}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Monthly Payment:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {Number(Monthly_payment).toLocaleString()} {"ETB"}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Loan Payment Period:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {Loan_Payment_Period} {"Months"}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Score:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {Math.round(score)}
                        </MDBCol>
                      </div>

                      <div className={styles.rowContainer}>
                        <MDBCol
                          className={`${styles.modalfontsize} ${styles.labelColumn}`}
                          tag="dt"
                          sm="3"
                        >
                          <CheckCircleOutlineIcon
                            className={`${styles.rightcolor}`}
                          />{" "}
                          Rank:
                        </MDBCol>
                        <MDBCol
                          className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                          sm="9"
                        >
                          {rank}
                        </MDBCol>
                      </div>

                      {Types_of_Collateral == "Car" ? (
                        <div className={styles.rowContainer}>
                          <MDBCol
                            className={`${styles.modalfontsize} ${styles.labelColumn}`}
                            tag="dt"
                            sm="3"
                          >
                            <CheckCircleOutlineIcon
                              className={`${styles.rightcolor}`}
                            />{" "}
                            Total Collateral Value:
                          </MDBCol>
                          <MDBCol
                            className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                            sm="9"
                          >
                            {Number(Collateralcar).toLocaleString()} {"ETB"}
                          </MDBCol>
                        </div>
                      ) : Types_of_Collateral == "Building" ? (
                        <div className={styles.rowContainer}>
                          <MDBCol
                            className={`${styles.modalfontsize} ${styles.labelColumn}`}
                            tag="dt"
                            sm="3"
                          >
                            <CheckCircleOutlineIcon
                              className={`${styles.rightcolor}`}
                            />{" "}
                            Total Collateral Value:
                          </MDBCol>
                          <MDBCol
                            className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                            sm="9"
                          >
                            {Number(Collateralbuilding).toLocaleString()}{" "}
                            {"ETB"}
                          </MDBCol>
                        </div>
                      ) : (
                        <div className={styles.rowContainer}>
                          <MDBCol
                            className={`${styles.modalfontsize} ${styles.labelColumn}`}
                            tag="dt"
                            sm="3"
                          >
                            <CheckCircleOutlineIcon
                              className={`${styles.rightcolor}`}
                            />
                            Collateral Value
                          </MDBCol>
                          <MDBCol
                            className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                            tag="dd"
                            sm="9"
                          >
                            {"Total:"}
                            {Number(
                              Collateralbuilding + Collateralcar
                            ).toLocaleString()}
                            {"ETB"}
                          </MDBCol>
                          <MDBCol
                            className={`${styles.modalfontsize} ${styles.labelColumn}`}
                            tag="dt"
                            sm="3"
                          ></MDBCol>
                          <MDBCol
                            className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                            tag="dd"
                            sm="9"
                          >
                            {"Vehicle:"}
                            {Number(Collateralcar).toLocaleString()} {"ETB"}
                          </MDBCol>

                          <MDBCol
                            className={`${styles.modalfontsize} ${styles.labelColumn}`}
                            tag="dt"
                            sm="3"
                          ></MDBCol>
                          <MDBCol
                            className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                            tag="dd"
                            sm="9"
                          >
                            {"Building:"}
                            {Number(Collateralbuilding).toLocaleString()}{" "}
                            {"ETB"}
                          </MDBCol>
                        </div>
                      )}

                      <div className="row">
                        <MDBCol tag="dt" sm="3">
                          <Button
                            className={styles.collateralButton}
                            variant="contained"
                            onClick={handleShow}
                          >
                            Collateral Information
                          </Button>

                          {Types_of_Collateral === "Car"
                            ? setShow && (
                                <CarModal
                                  show={show}
                                  carDetails={car}
                                  handleClose={handleClose}
                                />
                              )
                            : null}
                          {Types_of_Collateral === "Building"
                            ? setShow && (
                                <BuildingModal
                                  show={show}
                                  buildingDetails={building}
                                  handleClose={handleClose}
                                />
                              )
                            : null}
                          {Types_of_Collateral === "Car,Building"
                            ? setShow && (
                                <CarandBuildingModal
                                  show={show}
                                  carDetails={car}
                                  buildingDetails={building}
                                  handleClose={handleClose}
                                />
                              )
                            : null}
                        </MDBCol>
                        <LoanDetailGenerator
                          data={theLoan}
                          carDetails={car ? car : null}
                          userDetail={theUser ? theUser : null}
                          buildingDetails={building ? building : null}
                          DocumentTitle="Loan Detail"
                          type="business"
                          className={`${styles.cardnone}`}
                        />
                      </div>
                    </MDBRow>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className={`${"row"} ${styles.mainmargin}`}>
        <AmortizationComponent
          loan_amount={loan_amount}
          Monthly_payment={Monthly_payment}
          interest={interest}
          Loan_Payment_Period={Loan_Payment_Period}
          createdAt={createdAt}
          updateAmortizeBLoan={updateAmortizeBLoan}
          theLoan={theLoan}
          status={status}
        />
      </div>
    </div>
  );
};
export default BLoanDetails;
