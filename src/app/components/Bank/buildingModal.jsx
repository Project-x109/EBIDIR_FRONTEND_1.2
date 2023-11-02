import React from "react";
import { Modal } from "react-bootstrap";
import { RiCloseLine } from "react-icons/ri";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import styles from "./Modle.module.css";

const BuildingModal = ({ buildingDetails, handleClose, show }) => {
  if (!buildingDetails) {
    return null; // Return null if carDetails is undefined
  }
  const {
    Location,
    Total_Area,
    Year_of_Construction,
    Distance_from_Main_Road,
    Type_of_Building,
    Purpose_of_the_Building,
    blueprintId,
    Construction_Status,
    Collateral_Coverage_Ratio,
    utility,
  } = buildingDetails;

  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <div className={styles.darkBG} onClick={handleClose} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5
              className={styles.heading}
              style={{
                backgroundColor: "#e3e8eb",
              }}
            >
              Collateral for the Loan
            </h5>
          </div>
          <button className={styles.closeBtn} onClick={handleClose}>
            <RiCloseLine
              className={styles.closeBtn}
              style={{ marginBottom: "-1.5px" }}
            />
          </button>

          <div>
            <h3 className={styles.heading}>Building Details</h3>
            <MDBRow
              style={{
                whiteSpace: "pre",
              }}
              tag="dl"
            >
              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Location:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Location}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Total Area:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Total_Area}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Year of Construction:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Year_of_Construction}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Distance From Road:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Distance_from_Main_Road}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Type of Building:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Type_of_Building}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Purpose of Building:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Purpose_of_the_Building}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Blue print ID:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {blueprintId}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Collateral Coverage Ratio:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Collateral_Coverage_Ratio}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Construction Status:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                  tad="dd"
                >
                  {Construction_Status?.Electro_Mechanical_Lifts === 1 ? (
                    <p>
                      <CheckCircleOutlineIcon
                        className={`${styles.rightcolor}`}
                      />
                      Electro Mechanical Lifts
                    </p>
                  ) : (
                    <p>
                      <CheckCircleOutlineIcon
                        className={`${styles.rightcolor}`}
                      />
                      No Electro Mechanical Lifts
                    </p>
                  )}
                  {Construction_Status?.Sub_Structure === 1 ? (
                    <p>
                      <CheckCircleOutlineIcon
                        className={`${styles.rightcolor}`}
                      />
                      Sub Structure
                    </p>
                  ) : (
                    <p>
                      <CheckCircleOutlineIcon
                        className={`${styles.rightcolor}`}
                      />
                      No Substructure
                    </p>
                  )}
                  {Construction_Status?.Super_Structure === 1 ? (
                    <p>
                      <CheckCircleOutlineIcon
                        className={`${styles.rightcolor}`}
                      />
                      Super Structure
                    </p>
                  ) : (
                    <p>
                      <CheckCircleOutlineIcon
                        className={`${styles.rightcolor}`}
                      />
                      No Super Structure
                    </p>
                  )}
                  {Construction_Status?.Partially === 1 ? (
                    <p>
                      <CheckCircleOutlineIcon
                        className={`${styles.rightcolor}`}
                      />
                      Partially Completed
                    </p>
                  ) : (
                    <p>
                      <CheckCircleOutlineIcon
                        className={`${styles.rightcolor}`}
                      />
                      Not Partially Completed
                    </p>
                  )}
                  {Construction_Status?.Fully === 1 ? (
                    <p>
                      <CheckCircleOutlineIcon
                        className={`${styles.rightcolor}`}
                      />
                      Fully Completed
                    </p>
                  ) : (
                    <p>
                      <CheckCircleOutlineIcon
                        className={`${styles.rightcolor}`}
                      />
                      Not Fully Completed
                    </p>
                  )}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Utilities:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                  tag="dd"
                >
                  {utility?.electricity === 1 ? (
                    <p>
                      {" "}
                      <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />
                      Electricity
                    </p>
                  ) : (
                    <p>
                      {" "}
                       <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />
                      Electricity Unavailable
                    </p>
                  )}
                  {utility?.water === 1 ? (
                    <p>
                      {" "}
                       <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />
                      Water
                    </p>
                  ) : (
                    <p>
                      {" "}
                       <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />
                      Water Unavailable
                    </p>
                  )}
                  {utility?.internet === 1 ? (
                    <p>
                      {" "}
                       <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />
                      Internet
                    </p>
                  ) : (
                    <p>
                      {" "}
                       <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />
                      Internet Unavailable
                    </p>
                  )}
                  {utility?.gas === 1 ? (
                    <p>
                      {" "}
                       <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />
                      Gas
                    </p>
                  ) : (
                    <p>
                      {" "}
                       <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />
                      Gas Unavailable
                    </p>
                  )}
                </MDBCol>
              </div>
            </MDBRow>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button
                  className={styles.cancelBtn}
                  onClick={handleClose}
                  style={{
                    backgroundColor: "#f35924",
                    color: "white",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BuildingModal;
