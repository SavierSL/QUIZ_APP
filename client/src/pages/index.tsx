import {
  Box,
  Text,
  Flex,
  Button,
  ColorModeScript,
  useColorMode,
  Stack,
} from "@chakra-ui/react";
import theme from "../theme";
import React from "react";
import MainContainer from "../components/MainContainer";
import { MotionBox } from "../components/motionElements";
import { fadeInMotion } from "../components/animation";
import NextLink from "next/link";
import Layout from "../components/layout";
import MidBox from "../components/chakraCustom/MidBox";
import Wrapper from "../components/wrapper";

export interface IndexProps {}
const Index: React.FC<IndexProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);
  return (
    <>
      <MainContainer minHeight="100vh">
        <Layout withNav={false}>
          <MotionBox
            variants={fadeInMotion}
            animate="animate"
            initial="initial"
            ml="auto"
            mr="auto"
          >
            <Flex flexDirection="column" textAlign="center" pt="4rem">
              <Text fontSize="7rem" display="block">
                Q share
              </Text>
              <Wrapper variant="small">
                <Stack spacing={5}>
                  <NextLink href="/admin">
                    <Button shadow="sm">Admin</Button>
                  </NextLink>
                  <NextLink href="/quser">
                    <Button shadow="sm">Quser</Button>
                  </NextLink>
                  <NextLink href="/student">
                    <Button shadow="sm">Student</Button>
                  </NextLink>
                </Stack>
              </Wrapper>
            </Flex>
          </MotionBox>
        </Layout>
      </MainContainer>
    </>
  );
};

export default Index;
