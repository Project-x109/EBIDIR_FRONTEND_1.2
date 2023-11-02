import SimpleBar from "simplebar-react";
import { Container } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import Content from "./Content";
import { theme } from "../index";
import Cover from "../Cover";
import React from "react";
import "simplebar/dist/simplebar.min.css";
import "../index.css";
import "./CompanyProfile.css";

//sidebar imprts
import { Box } from "@chakra-ui/react";
import CompanyLeft from "./CompanyLeft";

export default function CompanyProfile() {
  return (
    <div style={{textTransform:"capitalize"}}>
      <SimpleBar style={{ maxHeight: "100vh" }}></SimpleBar>
      <ChakraProvider theme={theme}>
        <Box id="cards">
          <Cover  />
        </Box>
        <Container id="height" display={{ base: "block", md: "flex" }} maxW="container.xl">
          <Box
            as="aside"
            flex={1}
            mr={{ base: 0, md: 5 }}
            mb={{ base: 5, md: 0 }}
            bg="brand.og"
            rounded="md"
            borderWidth={1}
            borderColor="brand.main"
            style={{ transform: "translateY(-100px)" }}
          >
            <CompanyLeft />
          </Box>
          <Content />
        </Container>
      </ChakraProvider>
    </div>
  );
}
