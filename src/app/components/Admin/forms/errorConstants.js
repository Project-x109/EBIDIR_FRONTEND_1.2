import React, { useState } from "react";
import { Form } from "react-bootstrap";
import validator from "validator";
import "./forms.css";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
export const ERROR_MESSAGES = {
  //Bank Messages
  BANK_NAME_REQUIRED: "Bank name is required.",
  BANK_NAME_ALPHABETS_ONLY: "Bank Name only contains alphabets",
  EMAIL_REQUIRED: "Insert Email",
  LOGO_NOT_UPLOADED: "Logo Not Uploaded",
  SHORT_PASSWORD: "Password Must Be at Least 8 Characters Long.",
  LONG_PASSWORD: "Password Length must below 50 characters.",
  MISMATCH_PASSWORD: "Password Must Be Same As Confirm Password",
  INVALID_EMAIL: "Invalid Email Address",
  EMAIL_TOO_SHORT: "Email Length too short",
  EMAIL_TOO_LONG: "Email Length Too Long",
  INVALID_PHONE_LENGTH: "Phone Number Must Be 10 Digit",
  INVALID_PHONE: "Invalid Phone Address",
  LOAN_TYPE_REQUIRED: "Please insert a loan Type",
  INTEREST_RATE_REQUIRED: "Please Enter Interest Rate",
  INTEREST_RATE_RANGE: "Rate Should Be between Zero and One",
  IMAGE_SUPPORTED: "Supported types are png jpg and gif",
  IMAGE_SIZE: "File should be below 1MB",
  EMAIL_VALIDATOR: "Valid Email :)",
  EMAIL_VALIDATOR_ERROE: "Enter valid Email!",
  PASSWORD_VALIDATOR: "Is Strong Password",
  PASSWORD_VALIDATOR_ERROR: "Is Not Strong Password",
  BANK_CREATED_SUCCESSFFULY: "Bank Created Successfully",
  // Add more error messages as needed

  //Compnay Messages
  EMPTY_COMPANY_NAME: "Please Enter Company's Name",
  INVALID_COMPANY_NAME: "Company Name only contains alphabets",
  EMPTY_FILE: "File should be below 1MB",
  EMPTY_EMAIL:"Email Can not be Empty",
  EMPTY_LEGAL_STATUS: "Select Legal Status from the drop down menu",
  EMPTY_PASSWORD: "Please Make Sure to enter your password",
  EMPTY_MANAGER_NAME: "Enter General Managers Name",
  INVALID_MANAGER_NAME: "General Manager Name only contains alphabets",
  EMPTY_SECTOR: "Enter Company's Sector",
  EMPTY_TIN: "Enter Company's TIN Number",
  Ten_TIN: "Tin Number should be Ten Character",
  INVALID_TIN_DECIMAL: "TIN Number cannot contain decimal number",
  INVALID_TIN_NEGATIVE: "TIN Number cannot contain Negative Number",
  COMPANY_CREATED_SUCCESSFFULY: "Company Created Successfully",
  FILE_TYPE: "Supported types is PDF",
  FILE_SIZE: "File should be below 1MB",

  //PERSONAL ERROR MESSAGES

  EMPTY_NAME: "Please Make Sure to Enter full name",
  INVALID_NAME: "Name only contains alphabets",
  LONG_EMAIL: "Email Length too long",
  EMPTY_GENDER: "Please Make Sure to Select the Gender",
  EMPTY_TIN: "Please Make Sure to Enter TIN Number",
  INVALID_TIN_DECIMAL: "TIN Number cannot contain decimal number",
  INVALID_TIN_NEGATIVE: "TIN Number cannot contain Negative Number",
  PERSON_CREATED_SUCCESSFFULY: "Account Created Successfully",
  //BRANCH

  EMPTY_BANK_NAME: "Bank name is required",
  EMPTY_BRANCH_NAME: "Branch name is required",
  EMPTY_BRANCH_EMAIL: "Branch Email is required",
  EMPTY_MANAGER: "Manager name is required",
  EMPTY_PHONE: "Phone Number is required",
  EMPTY_LOCATION: "Location is required",
  INVALID_BANK_NAME: "Bank Name only contains alphabets",
  INVALID_BRANCH_NAME: "Branch Name only contains alphabets",
  BRANCH_CREATED_SUCCESSFFULY: "Branch has been Created Successfully",
  BRANCH_CREATED_SUCCESSFFULY_TITLE: "Registered Successfully",
  CREATED_SUCCESSFFULY_TITLE: "Registered Successfully",
};

export const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
export const validPhoneRegex = RegExp(
  /(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))|(0\s*7\s*(([0-9]\s*){8}))/
);
export const alpahbet = RegExp(/^[A-Z ]+$/i);
export const dotremoval = RegExp(/([.])\w+/);

// PasswordValidator.js

export const PasswordValidator = ({ compassword, setCompassword,disabled }) => {
  const [errorMessage, setErrorMessage] = useState("Enter A strong Password");

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage(ERROR_MESSAGES.PASSWORD_VALIDATOR);
    } else {
      setErrorMessage(ERROR_MESSAGES.PASSWORD_VALIDATOR_ERROR);
    }
  };

  return (
    <Form.Group className="row">
      <label className="col-sm-3 col-form-label">
        Password:<span className="text-danger">*</span>
      </label>
      <div className="col-sm-9">
        <Form.Control
          required
          type="password"
          name="company_password"
          id="exampleInputPassword1"
          onChange={(e) => {
            setCompassword(e.target.value);
            validate(e.target.value);
          }}
          disabled={disabled}
          value={compassword}
        />
        {compassword === "" ? null : errorMessage == "Is Strong Password" ? (
          <span className="erroremail approveemail">{errorMessage}</span>
        ) : (
          <span className="erroremail rejectedemail">{errorMessage}</span>
        )}
      </div>
    </Form.Group>
  );
};

export const EmailValidator = ({ cemail, setCemail,disabled }) => {
  const [emailError, setEmailError] = useState("Enter A correct Email");

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email) && email.length > 15 && email.length < 320) {
      setEmailError(ERROR_MESSAGES.EMAIL_VALIDATOR);
    } else {
      setEmailError(ERROR_MESSAGES.EMAIL_VALIDATOR_ERROE);
    }
  };

  return (
    <Form.Group className="row">
      <label className="col-sm-3 col-form-label">
        Email
      </label>
      <div className="col-sm-9">
        <Form.Control
          required
          name="company_email"
          type="email"
          placeholder="youremail@gmail.com"
          onChange={(e) => {
            setCemail(e.target.value);
            validateEmail(e);
          }}
          disabled={disabled}
          value={cemail}
        />
        {cemail === "" ? null : emailError == "Valid Email :)" ? (
          <span className="erroremail approveemail">{emailError}</span>
        ) : (
          <span className="erroremail rejectedemail">{emailError}</span>
        )}
      </div>
    </Form.Group>
  );
};

 
export  const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          whiteSpace: "pre",
          color: "#343434",
        },
      },
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        root: {
          whiteSpace: "pre",
        },
      },
    },
  },
});
