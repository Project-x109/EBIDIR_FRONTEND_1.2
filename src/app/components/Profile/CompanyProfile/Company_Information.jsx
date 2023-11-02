import { FormControl, FormLabel, Grid, Input } from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyDetails, getUser } from "../../../../Actions/UserAction";
import { useEffect, useState } from "react";
import { loadBEconomic } from "../../../../Actions/EconomicAction";
function CompanyInformation() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [cname, setCname] = useState(user && user.cname);
  const [General_Manager, setGeneral_Manager] = useState(
    user && user.General_Manager
  );
  const [cphoneNo, setcphoneNo] = useState(user && user.cphoneNo);
  const [legal_status, setlegal_status] = useState(user && user.legal_status);
  const [sector, setSector] = useState(user && user.sector);
  const [CTIN_Number, setCTIN_Number] = useState(user && user.CTIN_Number);

  useEffect(() => {
    if (user) {
      setCname(user.cname);
      setGeneral_Manager(user.General_Manager);
      setcphoneNo(user.cphoneNo);
      setlegal_status(user.legal_status);
      setSector(user.sector);
      setCTIN_Number(user.CTIN_Number);
    }
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getCompanyDetails());
  }, [dispatch]);

  const { beconomic } = useSelector((state) => state.beconomic);
  const { login } = useSelector((state) => state.login);
  const [id] = useState(login && login.id);
  const [Number_of_Employees, setNumber_of_Employees] = useState(
    beconomic && beconomic.Number_of_Employees
  );
  const [year, setYear] = useState(beconomic && beconomic.year);

  useEffect(() => {
    if (beconomic) {
      setNumber_of_Employees(beconomic.Number_of_Employees);
      setYear(beconomic.year);
    }
  }, [dispatch, beconomic]);

  useEffect(() => {
    dispatch(loadBEconomic({ id: id }));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Grid
    style={{textTransform:"capitalize"}}
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gap={6}
    >
      <FormControl id="cname">
        <FormLabel id="fontsize" color="brand.white">Company Name</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={cname}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="General_Manager">
        <FormLabel id="fontsize" color="brand.white">General Manager Name</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={General_Manager}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">Number of Employees</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={Number_of_Employees}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">Establishment Year</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={year}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="legal_status">
        <FormLabel id="fontsize" color="brand.white">Legal Status</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={legal_status}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="sector">
        <FormLabel id="fontsize" color="brand.white">Sector</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={sector}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="cphoneNo">
        <FormLabel id="fontsize" color="brand.white">Phone Number</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={cphoneNo}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="CTIN_Number">
        <FormLabel id="fontsize" color="brand.white">Company TIN Number</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={CTIN_Number}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="number"
          placeholder="Not Available"
        />
      </FormControl>
    </Grid>
  );
}

export default CompanyInformation;
