import { Box, Tab, TabList, TabPanel, TabPanels, Tabs,Text } from "@chakra-ui/react";
import React from "react";
import AccountSettings from "./AccountSettings";
import Actions from "./Actions";
import CompanySettings from "./CompanySettings";
import Notifications from "./Notifications";
import "./Personalprofile.css";
const Content = () => {
  const tabs = ["User Info", "Additional Info", "Account Info"];

  return (
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
      style={{ transform: "translateY(-100px)",textTransform:'capitalize' }}
    >
      <Tabs>
        <TabList px={5}>
          {tabs.map((tab) => (
            <Tab
            
              _hover={{color:"#4164E3" ,borderColor: "#4164E3"}}
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="brand.white"
              borderBottomWidth={1}
              _active={{ bg: "transparent" }}
              _selected={{ color: "#F1592A",borderColor: "#F1592A" }}
            >
              <Text id="header">{tab}</Text>
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <AccountSettings />
          </TabPanel>
          <TabPanel>
            <CompanySettings />
          </TabPanel>
          <TabPanel>
            <Notifications />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Actions />
    </Box>
  );
};

export default Content;
