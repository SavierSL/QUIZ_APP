import React from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  ColorModeScript,
  useColorMode,
  Stack,
} from "@chakra-ui/react";
import MidBox from "../components/chakraCustom/MidBox";
import Layout from "../components/layout";
import MainContainer from "../components/MainContainer";
import { fadeInMotion } from "../components/animation";
import { MotionBox } from "../components/motionElements";
import InputField from "../components/inputFIeld";
import { Form, Formik } from "formik";
import Wrapper from "../components/wrapper";

export interface QUserProps {}

const QUser: React.FC<QUserProps> = () => {
  return (
    <>
      <MainContainer minHeight="100vh">
        <Layout withNav={true}>
          <MidBox>
            <MotionBox
              variants={fadeInMotion}
              animate="animate"
              initial="initial"
              ml="auto"
              mr="auto"
            >
              <Box textAlign="center" pt="5rem">
                <Text fontSize="4.5rem">Quser Login</Text>
              </Box>
              <Formik
                initialValues={{ name: "" }}
                onSubmit={() => {
                  console.log("login");
                }}
              >
                {() => (
                  <Form>
                    <Wrapper variant="small">
                      <InputField
                        name="email"
                        label="Email"
                        type="text"
                        placeholder="email"
                      />
                      <InputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                      />
                    </Wrapper>
                  </Form>
                )}
              </Formik>
            </MotionBox>
          </MidBox>
        </Layout>
      </MainContainer>
    </>
  );
};

export default QUser;
