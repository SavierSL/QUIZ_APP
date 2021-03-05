import { DarkModeSwitch } from "../components/DarkModeSwitch";
import {
  Box,
  Text,
  Flex,
  ColorModeScript,
  useColorMode,
} from "@chakra-ui/react";
import theme from "../theme";
import React from "react";
import MainContainer from "../components/MainContainer";

export interface IndexProps {}
const Index: React.FC<IndexProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);
  return (
    <>
      <MainContainer minHeight="100vh">
        <DarkModeSwitch />
        <Flex flexDirection="column">
          <Text fontSize="5rem" display="block">
            Awit
          </Text>
        </Flex>
      </MainContainer>
    </>
  );
};

export default Index;
