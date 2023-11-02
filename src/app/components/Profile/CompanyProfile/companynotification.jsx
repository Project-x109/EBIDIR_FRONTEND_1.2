import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import React from "react";
import { getCompanyDetails } from "../../../../Actions/UserAction";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button } from "@chakra-ui/react";
import swal from "sweetalert2";
import axios from "axios";
function CompanyNotifications() {
  const { user } = useSelector((state) => state.user);
  const [createdAt, setcreatedAt] = useState(user && user.createdAt);
  const dispatch = useDispatch();
  const { login, loading, isAuthenticated } = useSelector(
    (state) => state.login
  );

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
  }; */
  // set data ojn change
  useEffect(() => {
    if (user) {
      setcreatedAt(user && user.createdAt);
    }
  }, [user]);
  useEffect(() => {
    dispatch(getCompanyDetails());
  }, [dispatch]);
  var DateCreated = moment(createdAt).utc().format("DD-MM-YYYY");
  return (
    <>
      <FormControl
        style={{ display: "flex", textTransform: "capitalize" }}
        alignItems="center"
      >
        <FormLabel
          color="brand.white"
          htmlFor="notificationEmails"
          mb={0}
          cursor="pointer"
          userSelect="none"
          id="fontsize"
        >
          Account Was Created on:
        </FormLabel>
        <Text id="fontsize">{DateCreated}</Text>
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
    </>
  );
}
export default CompanyNotifications;
