import { useState, useRef, useEffect } from "react";
import React from "react";
import {
  Avatar,
  Heading,
  Text,
  VStack,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  useClipboard,
} from "@chakra-ui/react";
import "simplebar/dist/simplebar.min.css";
import "../index.css";
import { Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyDetails } from "../../../../Actions/UserAction";
import { getBLoan } from "../../../../Actions/LoanAction";
function CompanyLeft() {
  const { user } = useSelector((state) => state.user);
  const { mybloan } = useSelector((state) => state.mybloan);
  const dispatch = useDispatch();
  const [sector, setsector] = useState(user && user.sector);
  const [score, setscore] = useState(mybloan && mybloan.score);
  const [cemail, setCemail] = useState(user && user.cemail);
  const [CTIN_Number, setCTIN_Number] = useState(user && user.CTIN_Number);
  const [cphoneNo, setcphoneNo] = useState(user && user.cphoneNo);
  const profileUrl = useRef(null);
  const { hasCopied, onCopy } = useClipboard(cemail);


  useEffect(() => {
    if (hasCopied) {
      profileUrl.current.focus();
      profileUrl.current.select();
    }
  });
  useEffect(() => {
    if (user) {
      setsector(user && user.sector);
      setCTIN_Number(user && user.CTIN_Number);
      setCemail(user && user.cemail);
      setcphoneNo(user && user.cphoneNo);
      setscore(user && user.score);
    }
  }, [user]);
  useEffect(() => {
    dispatch(getCompanyDetails());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBLoan());
  }, [dispatch]);
  return (
    <div style={{textTransform:"capitalize"}}>
      <VStack
        spacing={3}
        py={5}
        borderBottomWidth={1}
        borderColor="brand.light"
      >
        <Avatar
         id="Avater"
          size="2xl"
          name="Tim Cook"
          cursor="pointer"
          backgroundColor="white"
          src={user && user.logo && user.logo.url}
        ></Avatar>
        <VStack spacing={1}>
          <Heading as="h3" fontSize="xl" color="brand.white">
            <Text id="fontsize">{user && user.cname}</Text>
          </Heading>
          <Text id="fontsize" color="brand.white" fontSize="sm">
            {sector}
          </Text>
        </VStack>
      </VStack>
      <VStack as="ul" spacing={0} listStyleType="none">
        <Box
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.dark"
        >
          <Text id="fontsize" color="brand.white">TIN Number</Text>
          <Text id="fontsize" color="#343434" fontWeight="bold">
            {CTIN_Number}
          </Text>
        </Box>
        <Box
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.dark"
        >
          <Text id="fontsize" color="brand.white">Credit Score</Text>
          <Text id="fontsize" color="#343434" fontWeight="bold">
            {score}
          </Text>
        </Box>
        {/*<Box
                                    
                                    as="li"
                                    w="full"
                                    py={3}
                                    px={5}
                                    d="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    borderBottomWidth={1}
                                    borderColor="brand.dark"
                                    >
                                    <Text color="brand.white">Approved Loans</Text>
                                    <Text color='cadetblue' fontWeight="bold">
                                        6
                                    </Text>
  </Box>*/}
      </VStack>
      <VStack py={8} px={5} spacing={3}>
        <Button
          w="full"
          color="brand.white"
          bg="brand.blue"
          borderColor="brand.#343434"
          variant="solid"
          id="phonebutton"
        >
          Phone {cphoneNo}
        </Button>
        <InputGroup>
          <Input
            ref={profileUrl}
            type="url"
            color="brand.white"
            value={cemail}
            id="fontsize"
            userSelect="all"
            borderColor="brand.main"
            isReadOnly
            _focus={{ borderColor: "brand.blue" }}
          />
          <InputRightAddon
            borderColor="brand.main"
            bg="transparent"
            px={0}
            overflow="hidden"
          >
            <Button onClick={onCopy} variant="link">
              <svg width="1.2em" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </Button>
          </InputRightAddon>
        </InputGroup>
      </VStack>
    </div>
  );
}
export default CompanyLeft;
