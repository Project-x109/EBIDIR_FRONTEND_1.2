import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLoanDetails } from "../../../../Actions/LoanAction";
import { getUser } from "../../../../Actions/UserAction";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Carousel from "react-material-ui-carousel";
import moment from "moment";
import { getCarByLoanId } from "../../../../Actions/CarAction";
import { getBuildingByLoanId } from "../../../../Actions/BuildingAction";
import styles from "../../Bank/Modle.module.css";
import styledbakcup from "./Modal.module.css";
import copy from "copy-to-clipboard";
import swal from "sweetalert";
import BackdropLoader from "../../common/BackdropLoader";
import "../Buton.css";
import CarModal from "../../Bank/carModal";
import BuildingModal from "../../Bank/buildingModal";
import CarandBuildingModal from "../../Bank/carandbuildingModal";
import male from "../../../../assets/images/male.png";
import female from "../../../../assets/images/female.png";
const MyLoansDetails = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { car } = useSelector((state) => state.car);
  const { building } = useSelector((state) => state.building);
  const { user } = useSelector((state) => state.user);

  const { theLoan, loading } = useSelector((state) => state.theLoan);
  let { id } = useParams();
  const dispatch = useDispatch();
  // render this data
  const [Job_Status, setJob_Status] = useState(theLoan && theLoan.Job_Status);
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
  const [Monthly_payment, setMonthly_payment] = useState(
    Math.round(theLoan && theLoan.Monthly_payment)
  );
  const [interest, setinterest] = useState(theLoan && theLoan.interest);
  const [createdAt, setcreatedAt] = useState(theLoan && theLoan.createdAt);
  const [score, setscore] = useState(theLoan && theLoan.score);
  const [rank, setRank] = useState(theLoan && theLoan.rank);
  //user
  const [gender, setgender] = useState(user && user.gender);
  const [icon_color, seticon_color] = useState("#343434");
  const handleColor = () => {
    if (icon_color === "#343434") {
      seticon_color("red");
      swal({
        title: "Added To Favorites",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      seticon_color("#343434");
      swal({
        title: "Removed From Favorites",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  const handleshare = () => {
    copy(window.location);
    swal({
      title: "Link copied to clipboard",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };
  // set data ojn change
  useEffect(() => {
    if (user) {
      setgender(user && user.gender);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // set data ojn change
  useEffect(() => {
    if (theLoan) {
      setJob_Status(theLoan && theLoan.Job_Status);
      setloan_amount(theLoan && theLoan.loan_amount);
      setReason_for_loan(theLoan && theLoan.Reason_for_loan);
      setLoan_Payment_Period(theLoan && theLoan.Loan_Payment_Period);
      setstatus(theLoan && theLoan.status);
      setType_Of_Loan(theLoan && theLoan.Type_Of_Loan);
      setBank(theLoan && theLoan.Bank);
      setBranch(theLoan && theLoan.Branch?.branch_name);
      setTypes_of_Collateral(theLoan && theLoan.Types_of_Collateral);
      setMonthly_payment(Math.round(theLoan && theLoan.Monthly_payment));
      setinterest(theLoan && theLoan.interest);
      setcreatedAt(theLoan && theLoan.createdAt);
      setscore(theLoan && theLoan.score);
      setRank(theLoan.rank);
    }
  }, [theLoan]);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  var DateCreated = moment(createdAt).utc().format("DD-MM-YYYY");
  // load from axios
  useEffect(() => {
    dispatch(getLoanDetails({ id: id }));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getCarByLoanId({ id: id }));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getBuildingByLoanId({ id: id }));
  }, [id, dispatch]);
  return (
    <div style={{ textTransform: "capitalize" }}>
      {loading && (
        <div className="backdrop-loader">
          <BackdropLoader />
        </div>
      )}
      <h2 className={styledbakcup.heading1}>Loan Detail</h2>
      <div className={styledbakcup.imageremover}>
        <div className="page-header">
          <h3 className="page-title">{/* {'DO NOT REMOVE IT '} */}</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Display Loan
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                loan Detail
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <Card sx={{ maxWidth: 1400, bgcolor: "white", color: "#343434" }}>
          <CardHeader
            sx={{ titleTypographyProps: "h2", color: "#343434" }}
            avatar={
              user && user.profile && user.profile.url ? (
                <Avatar
                  className={styledbakcup.bgcoloravatar}
                  src={user && user.profile && user.profile.url}
                  aria-label="recipe"
                ></Avatar>
              ) : gender === "Male" || gender === "male" ? (
                <Avatar
                  className={styledbakcup.bgcoloravatar}
                  src={male}
                  aria-label="recipe"
                ></Avatar>
              ) : (
                <Avatar
                  className={styledbakcup.bgcoloravatar}
                  src={female}
                  aria-label="recipe"
                ></Avatar>
              )
            }
            action={
              <IconButton sx={{ color: "#343434" }} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              gender === "Male" ? (
                <Typography className={styledbakcup.heading2}>
                  {" "}
                  Mr.{user && user.name?.split(" ")[0]}{" "}
                  {user && user.name?.split(" ")[1]}
                </Typography>
              ) : (
                <Typography className={styles.heading2}>
                  {" "}
                  Mrs.{user && user.name?.split(" ")[0]}{" "}
                  {user && user.name?.split(" ")[1]}
                </Typography>
              )
            }
            subheader={
              <Typography
                className={styledbakcup.heading2}
                sx={{ color: "#343434" }}
              >
                Loan was Created on {DateCreated}
              </Typography>
            }
          />
          <Carousel className={styledbakcup.carousal}>
            <CardMedia
              component="img"
              height="500"
              image="/Autumn.jpg"
              alt="Paella dish"
            />
            <CardMedia
              component="img"
              height="500"
              image="/AndroidRobot.jpg"
              alt="Paella dish"
            />
            <CardMedia
              component="img"
              height="500"
              image="/WinterLake.jpg"
              alt="Paella dish"
            />
          </Carousel>

          <CardContent className={styledbakcup.carousal}>
            <Typography variant="body2" color="#343434">
              On The Above Board You Can Put Your Products For Advertisment For
              More Inofrmation You Can Contact Us on:-
              <br />{" "}
              <Typography variant="body2" color="white" sx={{ color: "White" }}>
                Phone:0919485189 &nbsp;&nbsp; Email:amanuelgirma108@gmail.com
              </Typography>
              <br></br>
              Click On the Far Right Icon to Hide Loan Details
            </Typography>
          </CardContent>
          <CardActions className={styledbakcup.carousal} disableSpacing>
            <IconButton sx={{ color: "red" }} aria-label="add to favorites">
              <FavoriteIcon sx={{ color: icon_color }} onClick={handleColor} />
            </IconButton>
            <IconButton sx={{ color: "#343434" }} aria-label="share">
              <ShareIcon onClick={handleshare} />
            </IconButton>
            <ExpandMore
              sx={{ color: "#343434" }}
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
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
                    Job Status:
                  </MDBCol>
                  <MDBCol
                    className={`${styles.hundredpadding} ${styles.modalfontsize}`}
                    sm="9"
                  >
                    {Job_Status}
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
                </div>
              </MDBRow>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
};
export default MyLoansDetails;
