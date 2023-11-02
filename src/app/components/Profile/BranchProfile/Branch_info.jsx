import { FormControl, FormLabel, Grid, Input } from "@chakra-ui/react";
import React,{useState,useEffect} from "react";
import { getBranchDetails } from "../../../../Actions/UserAction";
import { useSelector,useDispatch } from "react-redux";
import {  } from "react-redux";
function BranchInformation() {
  const { mybranch } = useSelector((state) => state.mybranch);
  const [bank_name, setBankName] = useState(mybranch && mybranch.bank_name);
  const [branch_name, setBranchName] = useState(mybranch && mybranch.branch_name);
  const [branch_code, setBranchCode] = useState(mybranch && mybranch.branch_code);
  const [branch_email, setBranchEmail] = useState(mybranch && mybranch.branch_email);
  const [location, setLocation] = useState(mybranch && mybranch.location);
  const [Manager, setManager] = useState(mybranch && mybranch.manager);
  const [branch_phoneNo, setphoneNo] = useState(mybranch && mybranch.branch_phoneNo);
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getBranchDetails());
  }, [dispatch]);
  useEffect(() => {
    if (mybranch) {
      setBranchEmail(mybranch && mybranch.branch_email);
      setBranchCode(mybranch && mybranch.branch_code)
      setBranchName(mybranch && mybranch.branch_name)
      setBankName(mybranch && mybranch.bank_name)
      setManager(mybranch && mybranch.manager)
      setLocation(mybranch && mybranch.location)
      setphoneNo(mybranch && mybranch.phone_no)
    }
  }, [mybranch]);

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

      <FormControl id="name">
        <FormLabel id="fontsize" color="brand.white">Branch Name</FormLabel>
        <Input
          borderColor="brand.dark"
          value={branch_name}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Tim"
        />
      </FormControl>
      <FormControl id="name">
        <FormLabel id="fontsize" color="brand.white">Manager Name</FormLabel>
        <Input
          borderColor="brand.dark"
          value={Manager}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Tim"
        />
      </FormControl>
      <FormControl id="Establishment Year<">
        <FormLabel id="fontsize" color="brand.white">Location</FormLabel>
        <Input
          borderColor="brand.dark"
          value={location}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Tim"
        />
      </FormControl>
      <FormControl id="Head office laoction">
        <FormLabel id="fontsize" color="brand.white">Phone Number</FormLabel>
        <Input
          borderColor="brand.dark"
          value={branch_phoneNo}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Tim"
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel id="fontsize" color="brand.white">Email</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={branch_email}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Tim"
        />
      </FormControl>
    </Grid>
  );
}

export default BranchInformation;
