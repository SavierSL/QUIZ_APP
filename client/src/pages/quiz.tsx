import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../components/inputFIeld";
import Layout from "../components/layout";
import MainContainer from "../components/MainContainer";
import Wrapper from "../components/wrapper";

export interface QuizProps {}

const Quiz: React.SFC<QuizProps> = () => {
  return (
    <>
      <MainContainer>
        <Layout withNav={true}>
          <Wrapper variant="regular">
            <Box pt="5rem">
              <Formik
                initialValues={{ id: "" }}
                onSubmit={() => console.log("sent")}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField label="search" name="search" type="text" />
                    <Button>search</Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Wrapper>
        </Layout>
      </MainContainer>
    </>
  );
};

export default Quiz;
