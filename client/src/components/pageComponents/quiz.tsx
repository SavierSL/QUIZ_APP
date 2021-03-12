import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../inputFIeld";
import Layout from "../layout";
import MainContainer from "../MainContainer";
import QuizBox from "./quizBox";
import Wrapper from "../wrapper";
import { useGetQuizSetMutation } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

export interface QuizProps {}

const Quiz: React.FC<QuizProps> = () => {
  const [getQuizSet, { data: quizSetData }] = useGetQuizSetMutation();
  return (
    <>
      <Wrapper variant="regular">
        <Box>
          <Formik
            initialValues={{ quizSetCode: "" }}
            onSubmit={async ({ quizSetCode }) => {
              console.log(quizSetCode);
              const data = await getQuizSet({ variables: { quizSetCode } });
              console.log(data);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Flex height="100%" alignItems="center" justifyContent="center">
                  <Box width="100%">
                    <InputField
                      label="Quiz code"
                      name="quizSetCode"
                      type="text"
                    />
                  </Box>
                  <Box height="100%" mt="2rem">
                    <Button type="submit">search</Button>
                  </Box>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
        {quizSetData?.getQuizSet ? (
          <QuizBox quizSet={quizSetData?.getQuizSet} />
        ) : (
          ""
        )}
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(Quiz);
