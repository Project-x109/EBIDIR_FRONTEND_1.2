import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import React from "react";
import { getBankDetails, getUser } from "../../../../Actions/UserAction";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button } from "@chakra-ui/react";
import swal from "sweetalert2";
import axios from "axios";
function BankNotification() {
  const { mybank } = useSelector((state) => state.mybank);
  const [createdAt, setcreatedAt] = useState(mybank && mybank.createdAt);
  const { login, loading, isAuthenticated } = useSelector(
    (state) => state.login
  );

  /* const deactivate = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Deactivate It!",
      })
      .then((result) => {
        if (result.value) {
          swal
            .fire({
              title: "Enter Your Password",
              input: "password",
              inputAttributes: {
                autocapitalize: "off",
              },
              showCancelButton: true,
              confirmButtonText: "Submit",
              showLoaderOnConfirm: true,
              allowOutsideClick: () => !swal.isLoading(),
            })
            .then((result) => {
              if (result.value) {
                axios({
                  url: "http://localhost:4000/api/v1/getpass",
                  method: "POST",
                  data: { id: login && login.id, password: result.value },
                }).then((res) => {
                  if (res.data.isPasswordMatched) {
                    axios({
                      url: "http://localhost:4000/api/v1/delete",
                      method: "POST",
                      data: { id: login && login.id },
                    })
                      .then((res) => {
                        localStorage.clear();
                        window.location = "/login";
                        alert("Account Deactivated");
                        swal("Account Deactivated ", "Sucessfull", "success");
                      })
                      .catch((err) => {
                        swal("Password Not Correct ", err, "error");
                      });
                  } else {
                    alert("password not correct");
                  }
                });
              }
            });
        }
      });
  };
 */
  const deactivate = () => {
    swal.fire({
      title: "Contact Administrators",
      text: "To deactivate your account, please contact the administrators.",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBankDetails());
  }, [dispatch]);
  useEffect(() => {
    if (mybank) {
      setcreatedAt(mybank && mybank.createdAt);
    }
  }, [mybank]);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  var DateCreated = moment(createdAt).utc().format("DD-MM-YYYY");
  return (
    <div style={{ textTransform: "capitalize" }}>
      <FormControl alignItems="center" justifyContent="space-between">
        <FormLabel
          color="brand.white"
          htmlFor="notificationEmails"
          mb={0}
          cursor="pointer"
          userSelect="none"
          id="fontsize"
        >
          <Text id="HEADER_Title">Vission</Text>
        </FormLabel>
      </FormControl>
      <FormControl alignItems="center" justifyContent="space-between">
        <FormLabel
          color="brand.white"
          htmlFor="notificationEmails"
          mb={0}
          cursor="pointer"
          userSelect="none"
          id="fontsize"
        >
          <Text id="fontsize">
            {" "}
            “To provide Innovative, Competitive and Diversified banking services
            accessible to the society with qualified and committed staff in a
            profitable and socially responsible manner”
          </Text>
        </FormLabel>
      </FormControl>
      <br></br>
      <FormControl alignItems="center" justifyContent="space-between">
        <FormLabel
          color="brand.white"
          htmlFor="notificationEmails"
          mb={0}
          cursor="pointer"
          userSelect="none"
        >
          <Text id="HEADER_Title">Mission</Text>
        </FormLabel>
      </FormControl>
      <FormControl alignItems="center" justifyContent="space-between">
        <FormLabel
          color="brand.white"
          htmlFor="notificationEmails"
          mb={0}
          cursor="pointer"
          userSelect="none"
          id="fontsize"
        >
          <Text id="fontsize">“To be the First Choice World Class Bank”</Text>
        </FormLabel>
      </FormControl>
      <br></br>
      <br></br>
      <br></br>

      <FormControl alignItems="center" justifyContent="space-between">
        <FormLabel
          color="brand.white"
          htmlFor="notificationEmails"
          mb={0}
          cursor="pointer"
          id="fontsize"
          userSelect="none"
        >
          <Text id="fontsize">Account Was Created on: {DateCreated}</Text>
        </FormLabel>
      </FormControl>
      <Button onClick={deactivate} id="buttondecative">
        <a className="dropdown-item preview-item">
          <div className="preview-thumbnail">
            <div className="preview-icon bg-dark rounded-circle">
              <i className="mdi mdi-onepassword  text-info"></i>
            </div>
          </div>
          <div className="preview-item-content">
            <span id="mainspan" className="preview-subject  mb-1 text-medium">
              Deactivate
            </span>
          </div>
        </a>
      </Button>
    </div>
  );
}

export default BankNotification;
