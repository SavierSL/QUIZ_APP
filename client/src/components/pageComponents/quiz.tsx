import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../inputFIeld";
import Layout from "../layout";
import MainContainer from "../MainContainer";
import QuizBox from "./quizBox";
import Wrapper from "../wrapper";
import {
  useGetQuizSetMutation,
  useGetStudentQuery,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

export interface QuizProps {}

const Quiz: React.FC<QuizProps> = () => {
  const { data: studentData } = useGetStudentQuery();
  const [getQuizSet, { data: quizSetData }] = useGetQuizSetMutation();
  const [quizSetDataID, setQuizSetDataID] = useState<number>();
  const isAdded = studentData?.getStudent?.answerSets.filter((answerSet) => {
    return answerSet.quizSetId === quizSetDataID;
  });
  console.log(isAdded?.length != 0);
  console.log(isAdded);
  const added = isAdded?.length != 0;
  return (
    <>
      <Wrapper variant="regular">
        <Box>
          <Formik
            initialValues={{ quizSetCode: "" }}
            onSubmit={async ({ quizSetCode }) => {
              console.log(quizSetCode);
              //we should get the answer set ID for the answer button
              const data = await getQuizSet({ variables: { quizSetCode } });
              setQuizSetDataID(data.data.getQuizSet.id);
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
          <QuizBox quizSet={quizSetData?.getQuizSet} added={added} />
        ) : (
          ""
        )}
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(Quiz);
