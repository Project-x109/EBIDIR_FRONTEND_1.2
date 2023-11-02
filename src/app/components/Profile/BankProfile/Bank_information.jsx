import { FormControl, FormLabel, Grid, Input } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { getBankDetails, getUser } from "../../../../Actions/UserAction";
import { useSelector, useDispatch } from "react-redux";
function BankInformation() {
  const { mybank } = useSelector((state) => state.mybank);
  const [bank_name, setBankName] = useState(mybank && mybank.bank_name);
  const [email, setemail] = useState(mybank && mybank.bank_email);
  const [phoneNo, setphoneNo] = useState(mybank && mybank.bank_phoneNo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBankDetails());
  }, [dispatch]);
  useEffect(() => {
    if (mybank) {
      setemail(mybank && mybank.bank_email);
      setphoneNo(mybank && mybank.bank_phoneNo);
      setBankName(mybank && mybank.bank_name);
    }
  }, [ mybank]);
  return (
    <Grid
    style={{textTransform:"capitalize"}}
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gap={6}
    >
      <FormControl id="name">
        <FormLabel id="fontsize" color="brand.white">Bank Name</FormLabel>
        <Input
          borderColor="brand.dark"
          value={bank_name}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Tim"
        />
      </FormControl>
      <FormControl  id="Establishment Year<">
        <FormLabel id="fontsize" color="brand.white">Establishment Year</FormLabel>
        <Input
          borderColor="brand.dark"
          value={1991}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Tim"
        />
      </FormControl>
      <FormControl  id="Number of Branches">
        <FormLabel id="fontsize" color="brand.white">Number of Branches</FormLabel>
        <Input
          borderColor="brand.dark"
          value={180}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Tim"
        />
      </FormControl>
      <FormControl  id="Head office laoction">
        <FormLabel id="fontsize" color="brand.white">Head office Location</FormLabel>
        <Input
          borderColor="brand.dark"
          value={"Stadium"}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Tim"
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel id="fontsize"  color="brand.white">Bank Email</FormLabel>
        <Input
          borderColor="brand.dark"
          value={email}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Tim"
        />
      </FormControl>
      <FormControl  id="phoneNo">
        <FormLabel id="fontsize" color="brand.white">Phone Number</FormLabel>
        <Input
          borderColor="brand.dark"
          value={phoneNo}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Tim"
        />
      </FormControl>
    </Grid>
  );
}

export default BankInformation;
