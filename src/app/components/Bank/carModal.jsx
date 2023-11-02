import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { RiCloseLine } from "react-icons/ri";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import styles from "./Modle.module.css";

const CarModal = ({ carDetails, handleClose, show }) => {
  if (!carDetails) {
    return null; // Return null if carDetails is undefined
  }
  const {
    Type_of_Vehicle,
    Brand_of_Vehicle,
    Model_of_Vehicle,
    Plate_Number,
    Mileage,
    Number_of_Cylinders,
    Horsepower,
    Country_of_Manufacture,
    Transportation_Capacity,
    Year_of_Manufacture,
    Transmission,
    Collateral_Coverage_Ratio,
  } = carDetails;

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
            <h3 className={styles.heading}>Vehicle Details</h3>
            <MDBRow style={{ whiteSpace: "pre" }} tag="dl">
              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Type of Vehicle:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Type_of_Vehicle}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Brand of Vehicle:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Brand_of_Vehicle}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Model of Vehicle:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Model_of_Vehicle}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Plate number:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Plate_Number}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Transmission:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Transmission}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Mileage:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Mileage}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Number of Cylinders:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Number_of_Cylinders}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Year of Manufacture:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Year_of_Manufacture}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Horse Power:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Horsepower}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Country of Manufacture:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Country_of_Manufacture}
                </MDBCol>
              </div>

              <div className={styles.rowContainerCarModal}>
                <MDBCol
                  className={`${styles.modalfontsize} ${styles.labelColumn}`}
                  tag="dt"
                  sm="3"
                >
                  <CheckCircleOutlineIcon className={`${styles.rightcolor}`} />{" "}
                  Transportation Capacity:
                </MDBCol>
                <MDBCol
                  className={`${styles.hundredpaddingCar} ${styles.modalfontsize}`}
                  sm="9"
                >
                  {Transportation_Capacity}
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
            </MDBRow>
          </div>
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
    </Modal>
  );
};

export default CarModal;
