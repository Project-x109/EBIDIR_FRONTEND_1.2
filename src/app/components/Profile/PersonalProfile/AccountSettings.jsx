import { FormControl, FormLabel, Grid, Input } from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../../Actions/UserAction";
import { loadPersonal } from "../../../../Actions/UserAction";
import { useEffect, useState } from "react";
function AccountSettings() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { personal } = useSelector((state) => state.personal);

  // date collection z
  const [age, setAge] = useState(personal && personal.age);
  const [Number_Of_Dependents, setNumber_Of_Dependents] = useState(
    personal && personal.Number_Of_Dependents
  );
  const [Education_Status, setEducation_Status] = useState(
    personal && personal.Education_Status
  );
  const [Marriage_Status, setMarital_status] = useState(
    personal && personal.Marriage_Status
  );
  const [, setCriminal_Record] = useState(personal && personal.Criminal_Record);
  //User information
  const [gender, setgender] = useState(user && user.gender);
  // set data ojn change
  useEffect(() => {
    if (user) {
      setgender(user && user.gender);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (personal) {
      setAge(personal.age);
      setEducation_Status(personal.Education_Status);
      setMarital_status(personal.Marriage_Status);
      setCriminal_Record(personal.Criminal_Record);
      setNumber_Of_Dependents(personal.Number_Of_Dependents);
    }
  }, [dispatch, personal]);
  useEffect(() => {
    dispatch(loadPersonal());
  }, [dispatch]);

  return (
    <Grid
      style={{textTransform:"capitalize"}}
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gap={6}
    >
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">First Name</FormLabel>
        <Input
          borderColor="brand.dark"
          value={user && user.name?.split(" ")[0]}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          id="heightandwidth"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="middleName">
        <FormLabel id="fontsize" color="brand.white">Middle Name</FormLabel>
        <Input
          borderColor="brand.dark"
          value={user && user.name?.split(" ")[1]}
          bg="brand.light"
          readOnly
          id="heightandwidth"
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="lastName">
        <FormLabel id="fontsize" color="brand.white">Last Name</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          id="heightandwidth"
          value={user && user.name?.split(" ")[2]}
          readOnly
          bg="brand.light"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl  id="phoneNumber">
        <FormLabel id="fontsize" color="brand.white">Age</FormLabel>
        <Input
          bg="brand.light"
          readOnly
          id="heightandwidth"
          placeholder="Not Available"
          focusBorderColor="brand.blue"
          type="number"
          value={age}
        />
      </FormControl>
      <FormControl id="phoneNumber">
        <FormLabel id="fontsize" color="brand.white">Gender</FormLabel>
        <Input
          bg="brand.light"
          readOnly
          id="heightandwidth"
          focusBorderColor="brand.blue"
          type="tel"
          placeholder="Not Available"
          value={gender}
        />
      </FormControl>
      <FormControl id="emailAddress">
        <FormLabel id="fontsize" color="brand.white">Number of Dependents</FormLabel>
        <Input
          readOnly
          id="heightandwidth"
          bg="brand.light"
          focusBorderColor="brand.blue"
          type="text"
          value={Number_Of_Dependents}
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl  id="emailAddress">
        <FormLabel id="fontsize" color="brand.white">Education Status</FormLabel>
        <Input
          readOnly
          id="heightandwidth"
          bg="brand.light"
          focusBorderColor="brand.blue"
          value={Education_Status}
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="emailAddress">
        <FormLabel id="fontsize" color="brand.white">Marriage Status</FormLabel>
        <Input
          readOnly
          id="heightandwidth"
          bg="brand.light"
          focusBorderColor="brand.blue"
          type="text"
          value={Marriage_Status}
          placeholder="Not Available"
        />
      </FormControl>
    </Grid>
  );
}

export default AccountSettings;
