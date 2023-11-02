import {
  Box,
  Avatar,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import {
  getBranchDetails,
  getMyBranchBank,
} from "../../../../Actions/UserAction";
import { useSelector, useDispatch } from "react-redux";
const BranchLeft = () => {
  const { mybranch } = useSelector((state) => state.mybranch);
  const { mybranchbank } = useSelector((state) => state.mybranchbank);
  const [bank_name, setBankName] = useState(mybranch && mybranch.bank_name);
  const [logo, setlogo] = useState();
  const [branch_name, setBranchName] = useState(
    mybranch && mybranch.branch_name
  );
  const [branch_email, setBranchEmail] = useState(
    mybranch && mybranch.branch_email
  );
  const [branch_phoneNo, setphoneNo] = useState(
    mybranch && mybranch.branch_phoneNo
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBranchDetails());
    dispatch(getMyBranchBank());
  }, [dispatch]);
  useEffect(() => {
    if (mybranch) {
      setBranchEmail(mybranch && mybranch.branch_email);
      setBranchName(mybranch && mybranch.branch_name);
      setBankName(mybranch && mybranch.bank_name);
      setphoneNo(mybranch && mybranch.branch_phoneNo);
    } else if (mybranchbank) {
      setlogo(mybranchbank && mybranchbank.logo);
    }
  }, [mybranch]);

  const { hasCopied, onCopy } = useClipboard(branch_email);
  const profileUrl = useRef(null);
  useEffect(() => {
    if (hasCopied) {
      profileUrl.current.focus();
      profileUrl.current.select();
    }
  });

  return (
    <Box
      as="aside"
      flex={1}
      mr={{ base: 0, md: 5 }}
      mb={{ base: 5, md: 0 }}
      bg="brand.og"
      rounded="md"
      borderWidth={1}
      borderColor="brand.main"
      style={{ transform: "translateY(-100px)", textTransform: "capitalize" }}
    >
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
          src={logo ? logo.url : mybranchbank?.logo?.url}
        ></Avatar>
        <VStack spacing={1}>
          <Heading as="h3" fontSize="xl" color="brand.white">
            <Text id="fontsize">{bank_name}</Text>
          </Heading>
          <Text id="fontsize" color="brand.white" fontSize="sm">
            {branch_name}
          </Text>
        </VStack>
      </VStack>
      {/*<VStack as="ul" spacing={0} listStyleType="none">
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
            <Text color="brand.white">Approved</Text>
            <Text color='yellow' fontWeight="bold">
                {0}
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
            <Text color="brand.white">Pending</Text>
            <Text color='green' fontWeight="bold">
                {3}
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
            <Text color="brand.white">Rejected</Text>
            <Text color='cadetblue' fontWeight="bold">
                6
            </Text>
          </Box>
        
      </VStack>*/}
      <VStack py={8} px={5} spacing={3}>
        <Button
          w="full"
          color="brand.white"
          bg="brand.blue"
          borderColor="brand.#343434"
          variant="solid"
          id="phonebutton"
        >
          {branch_phoneNo}
        </Button>
        <InputGroup>
          <Input
            ref={profileUrl}
            type="url"
            color="brand.white"
            value={branch_email}
            userSelect="all"
            id="fontsize"
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
    </Box>
  );
};
export default BranchLeft;
