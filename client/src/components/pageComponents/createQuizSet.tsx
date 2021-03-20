import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Wrapper from "../wrapper";
import InputField from "../inputFIeld";
import MakeQuiz from "./makeQuiz";
import {
  Quiz,
  QuizSet,
  useCreateQuizSetMutation,
  useGetTeachersQuizSetQuery,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

export interface CreateQuizProps {}
interface quizSetDataType {
  title: string;
  subject: string;
  quizSetId: number;
  quizSetCode: string;
}

const CreateQuizSet: React.FC<CreateQuizProps> = () => {
  const [itemNumbers, setItemnumbers] = useState<number[]>([1]);
  const [isSet, setIsSet] = useState<boolean>(false);
  const addMoreQuiz = () => {
    const newItem = itemNumbers[itemNumbers.length - 1] + 1;
    setItemnumbers([...itemNumbers, newItem]);
  };
  const [createQuizSet] = useCreateQuizSetMutation();
  const [quizSetData, setQuizSetData] = useState<quizSetDataType>();
  const [value1, setValue1] = React.useState("");
  const handleChange1 = (event) => setValue1(event.target.value);
  const [value2, setValue2] = React.useState("");
  const handleChange2 = (event) => setValue2(event.target.value);
  const { refetch: refetchTeachersData } = useGetTeachersQuizSetQuery();
  return (
    <>
      <Flex flexDirection="column">
        {quizSetData ? (
          <>
            <Text fontSize="2.2rem">{`Subject: ${quizSetData.subject}`}</Text>
            <Text fontSize="2.2rem">{`Title: ${quizSetData.title}`}</Text>
            <Text fontSize="2.2rem" color="violet">
              {`Code: ${quizSetData.quizSetCode}`}
            </Text>
          </>
        ) : (
          <Box>
            <Formik
              initialValues={{ _: "" }}
              onSubmit={async () => {
                const data = await createQuizSet({
                  variables: { title: value1, subject: value2 },
                });
                console.log("submit");
                setQuizSetData({
                  title: data.data.createQuizSet.title,
                  subject: data.data.createQuizSet.subject,
                  quizSetId: data.data.createQuizSet.id,
                  quizSetCode: data.data.createQuizSet.quizSetCode,
                });
                setIsSet(true);
                refetchTeachersData();
              }}
            >
              {({ isSubmitting, initialValues }) => (
                <Form>
                  <InputField
                    value={value2}
                    onChange={handleChange2}
                    name="title"
                    placeholder="title"
                    type="text"
                  />
                  <InputField
                    name="subject"
                    value={value1}
                    onChange={handleChange1}
                    placeholder="subject"
                    type="text"
                  />
                  <Button
                    isDisabled={value1 === "" || value2 === "" ? true : false}
                    type="submit"
                  >
                    Create Quiz Set
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        )}
        <Box mt="1rem">
          {isSet ? (
            <>
              <Text fontSize="2.2rem" fontWeight={700} mb="1rem">
                Make Questions
              </Text>
              {itemNumbers.map((itemNum) => {
                return (
                  <MakeQuiz
                    itemNumber={itemNum}
                    quizSetId={quizSetData.quizSetId}
                  />
                );
              })}
            </>
          ) : (
            ""
          )}
        </Box>
        <Button
          mt="1rem"
          onClick={() => {
            addMoreQuiz();
          }}
        >
          Add more question
        </Button>
        <Button mt="1rem" color="green">
          COMPLETE
        </Button>
      </Flex>
    </>
  );
};

export default withApollo({ ssr: true })(CreateQuizSet);
