import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React from "react";
import CompanyInformation from "./Company_Information";
import Actions from "./Actions";
import CompanyAdditionalInformation from "./Company_Additional_Information";
import CompanyNotifications from "./companynotification";

const Content = () => {
  const tabs = ["Company Info", "Additional Info", "Account Info"];

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
      style={{ transform: "translateY(-100px)", textTransform:'capitalize' }}
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
              _hover={{color:"#4164E3" , fontSize:"18px",borderColor: "#4164E3"}}
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
            <CompanyInformation />
          </TabPanel>
          <TabPanel>
            <CompanyAdditionalInformation />
          </TabPanel>
          <TabPanel>
            <CompanyNotifications />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Actions />
    </Box>
  );
};

export default Content;
