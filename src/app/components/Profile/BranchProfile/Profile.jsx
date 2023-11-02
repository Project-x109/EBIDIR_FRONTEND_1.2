import SimpleBar from "simplebar-react";
import { Container } from "@chakra-ui/layout";
import {
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import { theme } from "../index";
import Cover from "../Cover";
import React from "react";
import "simplebar/dist/simplebar.min.css";
import "../index.css";
//sidebar imprts
import { Box } from "@chakra-ui/react";
import BranchNotification from "./Branch_Notification";
import Actions from "./Actions";
import BranchLeft from "./Branch_left";
import BranchInformation from "./Branch_info";
import "./BranchProfile.css";
const tabs = ["Branch Information", "Account Information"];
export default function BranchProfile() {
  return (
    <div style={{textTransform:"capitalize"}}>
      <SimpleBar style={{ maxHeight: "100vh" }}></SimpleBar>
      <ChakraProvider theme={theme}>
      <Box id="cards">
          <Cover  />
        </Box>
        <Container id="height" display={{ base: "block", md: "flex" }} maxW="container.xl">
          <BranchLeft />
          <Box
            as="main"
            flex={3}
            d="flex"
            flexDir="column"
            justifyContent="space-between"
            pt={5}
            bg="brand.og"
            rounded="md"
            borderWidth={1}
            borderColor="brand.main"
            style={{ transform: "translateY(-100px)" }}
          >
            <Tabs>
              <TabList px={5}>
                {tabs.map((tab) => (
                  <Tab
                    key={tab}
                    mx={3}
                    px={0}
                    py={3}
                    fontWeight="semibold"
                    color="brand.white"
                    borderBottomWidth={1}
                    _hover={{color:"#4164E3" , fontSize:"18px",borderColor: "#4164E3"}}
                    _active={{ bg: "transparent" }}
                    _selected={{ color: "#F1592A",borderColor: "#F1592A" }}
                  >
                    <Text id="header">{tab}</Text>
                  </Tab>
                ))}
              </TabList>

              <TabPanels px={3} mt={5}>
                <TabPanel>
                  <BranchInformation />
                </TabPanel>
                <TabPanel>
                  <BranchNotification />
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Actions />
          </Box>
        </Container>
      </ChakraProvider>
    </div>
  );
}
