import { FormControl, FormLabel, Grid, Input } from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetUser } from "../../../../Actions/UserAction";
import { useEffect, useState } from "react";
import { loadBEconomic } from "../../../../Actions/EconomicAction";

function CompanyAdditionalInformation() {
  const { beconomic } = useSelector((state) => state.beconomic);
  const { login } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [Number_Of_Loans, setNumber_Of_Loans] = useState(
    beconomic && beconomic.Number_Of_Loans
  );
  const [Buildings, setBuildings] = useState(beconomic && beconomic.Buildings);
  const [Vehicles, setVehicles] = useState(beconomic && beconomic.Vehicles);
  const [Lands, setLands] = useState(beconomic && beconomic.Lands);
  const [Companies, setCompanies] = useState(beconomic && beconomic.Companies);
  const [EBIT, setEBIT] = useState(beconomic && beconomic.EBIT);
  const [FCBT, setFCBT] = useState(beconomic && beconomic.FCBT);
  const [fully_repaid_loans, setfully_repaid_loans] = useState(
    beconomic && beconomic.fully_repaid_loans
  );
  useEffect(() => {
    if (beconomic) {
      setNumber_Of_Loans(beconomic.Number_Of_Loans);
      setBuildings(beconomic.Buildings);
      setVehicles(beconomic.Vehicles);
      setLands(beconomic.Lands);
      setCompanies(beconomic.Companies);
      setEBIT(beconomic.EBIT);
      setFCBT(beconomic.FCBT);
      setfully_repaid_loans(beconomic.fully_repaid_loans);
    }
  }, [dispatch, beconomic]);

  useEffect(() => {
    dispatch(loadBEconomic({ id: login?.id }));
  }, [dispatch, login]);
  /* useEffect(()=>{
   dispatch(GetUser())
    },[dispatch])*/
  return (
    <Grid
    style={{textTransform:"capitalize"}}
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gap={6}
    >
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">Number of Previous Loans</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={Number_Of_Loans}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="number"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">Number of Fully Repaid Loans</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={fully_repaid_loans}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="number"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">Number Of Buildings</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={Buildings}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">Number Of Vehicle</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={Vehicles}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">Number Of Lands</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={Lands}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">Number of Companies</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={Companies}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          type="number"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">Fixed charges before tax</FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={Number(FCBT).toLocaleString()}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          placeholder="Not Available"
        />
      </FormControl>
      <FormControl id="firstName">
        <FormLabel id="fontsize" color="brand.white">
          Earnings before interest and taxes
        </FormLabel>
        <Input
         id="heightandwidth"
          borderColor="brand.dark"
          value={Number(EBIT).toLocaleString()}
          bg="brand.light"
          readOnly
          focusBorderColor="brand.blue"
          placeholder="Not Available"
        ></Input>
      </FormControl>
    </Grid>
  );
}

export default CompanyAdditionalInformation;
