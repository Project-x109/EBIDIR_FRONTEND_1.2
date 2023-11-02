import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../../Actions/UserAction";
import { loadEconomic } from "../../../../Actions/EconomicAction";
import { useEffect, useState, useRef } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  useClipboard,
  VStack,
  Box,
  Text,
  Heading,
  Avatar,
} from "@chakra-ui/react";
import "./Personalprofile.css";

function Sidebar() {
  const { user } = useSelector((state) => state.user);
  const { eerror, isUpdatedEconomic } = useSelector((state) => state.profile);
  const { economic } = useSelector((state) => state.economic);
  const dispatch = useDispatch();
  const [gender, setgender] = useState(user && user.gender);
  const [id] = useState(localStorage.getItem("id"));
  const [field_of_employment, setfield_of_employment] = useState(
    economic && economic.field_of_employment
  );
  const [email, setemail] = useState(user && user.email);
  const [phoneNo, setphoneNo] = useState(user && user.phoneNo);
  const [TIN_Number, setTIN_Number] = useState(user && user.TIN_Number);
  const [score, setscore] = useState(user && user.score);

 

  useEffect(() => {
    if (economic) {
      setfield_of_employment(economic.field_of_employment);
    }
  }, [dispatch, eerror, isUpdatedEconomic, economic]);
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
    dispatch(loadEconomic({ id: id }));
  }, [dispatch, id]);
  useEffect(() => {
    if (user) {
      setemail(user && user.email);
      setphoneNo(user && user.phoneNo);
    }
  }, [user]);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const { hasCopied, onCopy } = useClipboard(email);

  const profileUrl = useRef(null);

  useEffect(() => {
    if (hasCopied) {
      profileUrl.current.focus();
      profileUrl.current.select();
    }
  });
  // set data ojn change
  useEffect(() => {
    if (user) {
      setTIN_Number(user && user.TIN_Number);
      setscore(user && user.score);
    }
  }, [user]);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div style={{ textTransform: "capitalize" }}>
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
          src={user && user.profile && user.profile.url}
        ></Avatar>

        <VStack spacing={1}>
          <Heading as="h3" fontSize="xl" color="brand.white">
            {gender === "Male" ? (
              <Text id="fontsize">
                {" "}
                Mr.{user && user.name?.split(" ")[0]}{" "}
                {user && user.name?.split(" ")[1]}
              </Text>
            ) : (
              <Text id="fontsize">
                {" "}
                Mrs.{user && user.name?.split(" ")[0]}{" "}
                {user && user.name?.split(" ")[1]}
              </Text>
            )}
          </Heading>
          <Text id="fontsize" color="brand.white" fontSize="sm">
            {field_of_employment}
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
          <Text id="fontsize" color="brand.white">
            TIN Number
          </Text>
          <Text id="fontsize" color="#343434" fontWeight="bold">
            {TIN_Number}
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
          <Text id="fontsize" color="brand.white">
            Credit Score
          </Text>
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
          Phone {phoneNo}
        </Button>
        <InputGroup>
          <Input
            ref={profileUrl}
            type="url"
            color="brand.white"
            value={email}
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

export default Sidebar;
