import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../../Actions/UserAction";
import { loadEconomic } from "../../../../Actions/EconomicAction";
import { useEffect, useState } from "react";
function CompanySettings() {
  const { user } = useSelector((state) => state.user);
  const { eerror, isUpdatedEconomic } = useSelector((state) => state.profile);
  const { economic } = useSelector((state) => state.economic);
  const dispatch = useDispatch();
  //econmic info
  const [id] = useState(localStorage.getItem("id"));
  const [field_of_employment, setfield_of_employment] = useState(
    economic && economic.field_of_employment
  );
  const [Source_of_income, setSource_of_income] = useState(
    economic && economic.Source_of_income
  );
  const [Experience, setExperience] = useState(economic && economic.Experience);
  const [fully_repaid_loans, setfully_repaid_loans] = useState(
    economic && economic.fully_repaid_loans
  );
  const [Total_Monthly_Income, setTotal_Monthly_Income] = useState(
    economic && economic.Total_Monthly_Income
  );
  useEffect(() => {
    if (economic) {
      setfield_of_employment(economic.field_of_employment);
      setSource_of_income(economic.Source_of_income);
      setExperience(economic.Experience);
      setTotal_Monthly_Income(economic.Total_Monthly_Income);
      setfully_repaid_loans(economic.fully_repaid_loans);
    }
  }, [dispatch, eerror, isUpdatedEconomic, economic]);
  useEffect(() => {
    dispatch(loadEconomic({ id: id }));
  }, [dispatch, id]);
  //user data
  const [TIN_Number, setTIN_Number] = useState(user && user.TIN_Number);
  const [email, setemail] = useState(user && user.email);
  const [phoneNo, setphoneNo] = useState(user && user.phoneNo);
  // set data ojn change
  useEffect(() => {
    if (user) {
      setTIN_Number(user && user.TIN_Number);
      setemail(user && user.email);
      setphoneNo(user && user.phoneNo);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Grid
    style={{textTransform:"capitalize"}}
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gap={6}
    >
      <FormControl id="companyId">
        <FormLabel id="fontsize" color="brand.white">Field of employment</FormLabel>
        <InputGroup>
          <Input
           id="heightandwidth"
            bg="brand.light"
            focusBorderColor="brand.blue"
            type="text"
            value={field_of_employment}
            placeholder="apple"
            readOnly
           
          />
        </InputGroup>
      </FormControl>
      <FormControl id="companyName">
        <FormLabel id="fontsize" color="brand.white">Total Monthly Income</FormLabel>
        <Input
          bg="brand.light"
          value={Number(Total_Monthly_Income).toLocaleString()}
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
          id="heightandwidth"
        />
      </FormControl>

      <FormControl id="companyName">
        <FormLabel id="fontsize" color="brand.white">Source of Income</FormLabel>
        <Input
          bg="brand.light"
          value={Source_of_income}
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
          id="heightandwidth"
        />
      </FormControl>
      <FormControl id="companyName">
        <FormLabel id="fontsize" color="brand.white">Experiance</FormLabel>
        <Input
          bg="brand.light"
          value={Experience}
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
          id="heightandwidth"
        />
      </FormControl>

      <FormControl id="emailCompany">
        <FormLabel id="fontsize" color="brand.white">Email Address</FormLabel>
        <Input
          bg="brand.light"
          focusBorderColor="brand.blue"
          value={email}
          readOnly
          type="email"
          placeholder="Not Available"
          id="heightandwidth"
        />
      </FormControl>
      <FormControl id="emailCompany">
        <FormLabel id="fontsize" color="brand.white">Phone Number</FormLabel>
        <Input
          bg="brand.light"
          focusBorderColor="brand.blue"
          value={phoneNo}
          readOnly
          type="number"
          placeholder="Not Available"
          id="heightandwidth"
        />
      </FormControl>
      <FormControl id="emailCompany">
        <FormLabel id="fontsize" color="brand.white">TIN Number</FormLabel>
        <Input
        id="heightandwidth"
          bg="brand.light"
          focusBorderColor="brand.blue"
          value={TIN_Number}
          readOnly
          type="number"
          placeholder="Not Available"
          
        />
      </FormControl>
      <FormControl id="emailCompany">
        <FormLabel id="fontsize" color="brand.white">Fully Repaid Loans</FormLabel>
        <Input
          bg="brand.light"
          focusBorderColor="brand.blue"
          value={fully_repaid_loans}
          readOnly
          type="number"
          placeholder="Not Available"
          id="heightandwidth"
        />
      </FormControl>
    </Grid>
  );
}

export default CompanySettings;
