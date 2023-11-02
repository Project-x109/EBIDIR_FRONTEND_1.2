import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import styles from "../User/pages/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-material-ui-carousel";
import { Dropdown } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import MuiGrid from "@mui/material/Grid";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const boxSX = {
  "&:hover": {
    border: "1px solid #e1cb87",
    color: "gray",
    backgroundColor: "#e1cb87",
    transform: "scale(0.95)",
  },
};
const boxSX1 = {
  "&:hover": {
    border: "1px solid #1c2e4a",
    color: "gray",
    backgroundColor: "#1c2e4a",
    transform: "scale(0.95)",
  },
};
const boxSX2 = {
  "&:hover": {
    border: "1px solid #f5b225",
    color: "gray",
    backgroundColor: "#f5b225",
    transform: "scale(0.95)",
  },
};

export default function BankInformations() {
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  //Awash
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //ZamZam
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  //Abaysinia
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const Grid = styled(MuiGrid)(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
  }));

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <Card sx={{ maxWidth: 1300, bgcolor: "#191c25", color: "white" }}>
                <CardHeader
                  sx={{ titleTypographyProps: "h2", color: "white" }}
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500], color: "white" }}
                      src="/Awash_Bank_Final_logo.jpg"
                      aria-label="recipe"
                    >
                      {" "}
                    </Avatar>
                  }
                  action={
                    <Dropdown alignRight>
                      <Dropdown.Toggle
                        as="a"
                        className="cursor-pointer no-caret"
                      >
                        <i className="mdi mdi-dots-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="sidebar-dropdown preview-list">
                        <a
                          href="https://awashbank.com/"
                          style={{ backgroundColor: "#191c25" }}
                          className="dropdown-item preview-item"
                        >
                          <div className="preview-thumbnail">
                            <div className="preview-icon bg-dark rounded-circle">
                              <i className="mdi mdi-onepassword  text-info"></i>
                            </div>
                          </div>
                          <div className="preview-item-content">
                            <p
                              className="preview-subject  mb-1 text-small"
                              style={{
                                paddingTop: "10px",
                                fontSize: "15px",
                                color: "white",
                              }}
                            >
                              More Information
                            </p>
                          </div>
                        </a>
                      </Dropdown.Menu>
                    </Dropdown>
                  }
                  title={
                    <Typography sx={{ color: "white", fontSize: "20px" }}>
                      Awash International Bank
                    </Typography>
                  }
                  subheader={
                    <Typography sx={{ color: "white" }}>
                      Nurturing Like the river
                    </Typography>
                  }
                />
                <Carousel sx={boxSX1}>
                  <CardMedia
                    component="img"
                    height="300"
                    image="/OldBldg.jpg"
                    alt="Paella dish"
                  />
                  <CardMedia
                    component="img"
                    height="300"
                    image="/WinterLake.jpg"
                    alt="Paella dish"
                  />
                  <CardMedia
                    component="img"
                    height="300"
                    image="/OldRecord.jpg"
                    alt="Paella dish"
                  />
                </Carousel>
                <CardContent>
                  <Typography variant="body2" color="white">
                    Awash Bank, Ethiopia’s pioneering private bank, was
                    established on November 10, 1994 after the downfall of the
                    socialist regime.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ExpandMore
                    sx={{ color: "white" }}
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <Button variant="contained" onClick={handleShow1}>
                      Details
                    </Button>
                  </ExpandMore>
                </CardActions>
                <Modal
                  show={show1}
                  onHide={handleClose1}
                  backdrop="static"
                  keyboard={false}
                >
                  <div className={styles.darkBG} onClick={handleClose1} />
                  <div className={styles.centered}>
                    <div className={styles.modal}>
                      <div
                        className={styles.modalHeader}
                        style={{ backgroundColor: "#f35924" }}
                      >
                        <h5
                          className={styles.heading}
                          style={{ backgroundColor: "#0790e4", color: "white" }}
                        >
                          Awash International Bank Loan Details
                        </h5>
                      </div>

                      <div className={styles.modalContent}>
                        <CardContent>
                          <Grid container>
                            <Grid item xs>
                              <Typography paragraph>About:</Typography>
                              <Typography paragraph>
                                Awash Bank, Ethiopia’s pioneering private bank,
                                was established on November 10, 1994 after the
                                downfall of the socialist regime. The Bank was
                                established by 486 founding shareholders with a
                                paid-up capital of Birr 24.2 million and started
                                banking operations on Feb. 13, 1995. Since
                                embarking operation, the Bank has registered
                                remarkable growth. Notwithstanding global and
                                domestic challenges, Awash Bank has exhibited a
                                superior operational and financial performances
                                among private banks operating in Ethiopia. Awash
                                Bank is currently working towards strengthening
                                its capital base, technological capabilities,
                                human resources and customer base.
                              </Typography>
                            </Grid>
                            <Divider
                              light="true"
                              varient="fullwidth"
                              orientation="vertical"
                              flexItem
                            >
                              E-BIDIR
                            </Divider>
                            <Grid item xs>
                              <Typography paragraph>About:</Typography>
                              <Typography paragraph>
                                Awash Bank, Ethiopia’s pioneering private bank,
                                was established on November 10, 1994 after the
                                downfall of the socialist regime. The Bank was
                                established by 486 founding shareholders with a
                                paid-up capital of Birr 24.2 million and started
                                banking operations on Feb. 13, 1995. Since
                                embarking operation, the Bank has registered
                                remarkable growth. Notwithstanding global and
                                domestic challenges, Awash Bank has exhibited a
                                superior operational and financial performances
                                among private banks operating in Ethiopia. Awash
                                Bank is currently working towards strengthening
                                its capital base, technological capabilities,
                                human resources and customer base.
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </div>
                      <button
                        className={styles.closeBtn}
                        style={{ backgroundColor: "#f35924", color: "white" }}
                        onClick={handleClose1}
                      >
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                      </button>
                    </div>
                  </div>
                </Modal>
              </Card>
            </div>
          </div>
        </div>

        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <Card sx={{ maxWidth: 1300, bgcolor: "#191c25", color: "white" }}>
                <CardHeader
                  sx={{ titleTypographyProps: "h2", color: "white" }}
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500], color: "white" }}
                      src="/ZamZam.jpg"
                      aria-label="recipe"
                    >
                      {" "}
                    </Avatar>
                  }
                  action={
                    <Dropdown alignRight>
                      <Dropdown.Toggle
                        as="a"
                        className="cursor-pointer no-caret"
                      >
                        <i className="mdi mdi-dots-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="sidebar-dropdown preview-list">
                        <a
                          href="https://zamzambank.com/"
                          style={{ backgroundColor: "#191c25" }}
                          className="dropdown-item preview-item"
                        >
                          <div className="preview-thumbnail">
                            <div className="preview-icon bg-dark rounded-circle">
                              <i className="mdi mdi-onepassword  text-info"></i>
                            </div>
                          </div>
                          <div className="preview-item-content">
                            <p
                              className="preview-subject  mb-1 text-small"
                              style={{
                                paddingTop: "10px",
                                fontSize: "15px",
                                color: "white",
                              }}
                            >
                              More Information
                            </p>
                          </div>
                        </a>
                      </Dropdown.Menu>
                    </Dropdown>
                  }
                  title={
                    <Typography sx={{ color: "white", fontSize: "20px" }}>
                      ZamZam Bank
                    </Typography>
                  }
                  subheader={
                    <Typography sx={{ color: "white" }}>
                      Our Motto is Go hard or Go home
                    </Typography>
                  }
                />
                <Carousel sx={boxSX}>
                  <CardMedia
                    component="img"
                    height="300"
                    image="/OldBldg.jpg"
                    alt="Paella dish"
                  />
                  <CardMedia
                    component="img"
                    height="300"
                    image="/WinterLake.jpg"
                    alt="Paella dish"
                  />
                  <CardMedia
                    component="img"
                    height="300"
                    image="/OldRecord.jpg"
                    alt="Paella dish"
                  />
                </Carousel>
                <CardContent>
                  <Typography variant="body2" color="white">
                    ZamZam bank S.C is the first bank to get a license from the
                    National bank of Ethiopia to operate as a full-fledged
                    Interest-Free Bank in the country.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ExpandMore
                    sx={{ color: "white" }}
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <Button variant="contained" onClick={handleShow2}>
                      Details
                    </Button>
                  </ExpandMore>
                </CardActions>
                <Modal
                  show={show2}
                  onHide={handleClose2}
                  backdrop="static"
                  keyboard={false}
                >
                  <div className={styles.darkBG} onClick={handleClose2} />
                  <div className={styles.centered}>
                    <div className={styles.modal}>
                      <div
                        className={styles.modalHeader}
                        style={{ backgroundColor: "#f35924" }}
                      >
                        <h5
                          className={styles.heading}
                          style={{ backgroundColor: "#0790e4", color: "white" }}
                        >
                          ZamZam Bank Loan Details
                        </h5>
                      </div>
                      <div className={styles.modalContent}>
                        <CardContent>
                          <Grid container>
                            <Grid item xs>
                              <Typography paragraph>About:</Typography>
                              <Typography paragraph>
                                ZamZam bank S.C is the first bank to get a
                                license from the National bank of Ethiopia to
                                operate as a full-fledged Interest-Free Bank in
                                the country. The bank is established to enhance
                                financial inclusion with a special focus on the
                                part of society that is alienated from the
                                financial system due to their religious beliefs
                                or other factors. At the time of its formation,
                                ZamZam Bank managed to mobilize a subscribed
                                capital of Birr 1.683 billion and a paid-up
                                capital of Birr 872 million from 11,200
                                shareholders.
                              </Typography>
                            </Grid>
                            <Divider
                              light="true"
                              varient="fullwidth"
                              orientation="vertical"
                              flexItem
                            >
                              E-BIDIR
                            </Divider>
                            <Grid item xs>
                              <Typography paragraph>About:</Typography>
                              <Typography paragraph>
                                ZamZam bank S.C is the first bank to get a
                                license from the National bank of Ethiopia to
                                operate as a full-fledged Interest-Free Bank in
                                the country. The bank is established to enhance
                                financial inclusion with a special focus on the
                                part of society that is alienated from the
                                financial system due to their religious beliefs
                                or other factors. At the time of its formation,
                                ZamZam Bank managed to mobilize a subscribed
                                capital of Birr 1.683 billion and a paid-up
                                capital of Birr 872 million from 11,200
                                shareholders.
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </div>
                      <button
                        className={styles.closeBtn}
                        onClick={handleClose2}
                        style={{ backgroundColor: "#f35924", color: "white" }}
                      >
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                      </button>
                    </div>
                  </div>
                </Modal>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <Card sx={{ maxWidth: 1300, bgcolor: "#191c25", color: "white" }}>
                <CardHeader
                  sx={{ titleTypographyProps: "h2", color: "white" }}
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500], color: "white" }}
                      src="/Abyssinia1.jpg"
                      aria-label="recipe"
                    >
                      {" "}
                    </Avatar>
                  }
                  action={
                    <Dropdown alignRight>
                      <Dropdown.Toggle
                        as="a"
                        className="cursor-pointer no-caret"
                      >
                        <i className="mdi mdi-dots-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="sidebar-dropdown preview-list">
                        <a
                          href="https://www.bankofabyssinia.com/"
                          style={{ backgroundColor: "#191c25" }}
                          className="dropdown-item preview-item"
                        >
                          <div className="preview-thumbnail">
                            <div className="preview-icon bg-dark rounded-circle">
                              <i className="mdi mdi-onepassword  text-info"></i>
                            </div>
                          </div>
                          <div className="preview-item-content">
                            <p
                              className="preview-subject  mb-1 text-small"
                              style={{
                                paddingTop: "10px",
                                fontSize: "15px",
                                color: "white",
                              }}
                            >
                              More Information
                            </p>
                          </div>
                        </a>
                      </Dropdown.Menu>
                    </Dropdown>
                  }
                  title={
                    <Typography sx={{ color: "white", fontSize: "20px" }}>
                      Abyssinia Bank
                    </Typography>
                  }
                  subheader={
                    <Typography sx={{ color: "white" }}>
                      Caring for our community
                    </Typography>
                  }
                />
                <Carousel sx={boxSX2}>
                  <CardMedia
                    component="img"
                    height="300"
                    image="/OldBldg.jpg"
                    alt="Paella dish"
                  />
                  <CardMedia
                    component="img"
                    height="300"
                    image="/WinterLake.jpg"
                    alt="Paella dish"
                  />
                  <CardMedia
                    component="img"
                    height="300"
                    image="/OldRecord.jpg"
                    alt="Paella dish"
                  />
                </Carousel>
                <CardContent>
                  <Typography variant="body2" color="white">
                    The name Abyssinia resembles bravery and character which are
                    the core attributes of BoA.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ExpandMore
                    sx={{ color: "white" }}
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <Button variant="contained" onClick={handleShow}>
                      Details
                    </Button>
                  </ExpandMore>
                </CardActions>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <div className={styles.darkBG} onClick={handleClose} />
                  <div className={styles.centered}>
                    <div className={styles.modal}>
                      <div
                        className={styles.modalHeader}
                        style={{ backgroundColor: "#f35924" }}
                      >
                        <h5
                          className={styles.heading}
                          style={{ backgroundColor: "#0790e4", color: "white" }}
                        >
                          Abyssinia Bank Loan Details
                        </h5>
                      </div>
                      <div className={styles.modalContent}>
                        <CardContent>
                          <Grid container>
                            <Grid item xs>
                              <Typography paragraph>About:</Typography>
                              <Typography paragraph>
                                The name Abyssinia resembles bravery and
                                character which are the core attributes of BoA.
                                Its identity is demarcated with a sense of hope,
                                optimism, and belief as it is perfectly
                                displayed in its logo, the Adey Abeba. Adey
                                Abeba brings the promise of a new beginning. BoA
                                brings that very sense to all the customers it
                                engages with. Working with and through BoA
                                brings sustained success with the help of a bank
                                that is a symbol of determination and hard work.
                              </Typography>
                            </Grid>
                            <Divider
                              light="true"
                              varient="fullwidth"
                              orientation="vertical"
                              flexItem
                            >
                              E-BIDIR
                            </Divider>
                            <Grid item xs>
                              <Typography paragraph>About:</Typography>
                              <Typography paragraph>
                                The name Abyssinia resembles bravery and
                                character which are the core attributes of BoA.
                                Its identity is demarcated with a sense of hope,
                                optimism, and belief as it is perfectly
                                displayed in its logo, the Adey Abeba. Adey
                                Abeba brings the promise of a new beginning. BoA
                                brings that very sense to all the customers it
                                engages with. Working with and through BoA
                                brings sustained success with the help of a bank
                                that is a symbol of determination and hard work.
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </div>
                      <button
                        className={styles.closeBtn}
                        onClick={handleClose}
                        style={{ backgroundColor: "#f35924", color: "white" }}
                      >
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                      </button>
                    </div>
                  </div>
                </Modal>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
