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
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

export interface CreateQuizProps {}
interface quizSetDataType {
  title: string;
  subject: string;
  quizSetId: number;
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

  return (
    <>
      <Flex flexDirection="column">
        {quizSetData ? (
          <>
            <Text>{quizSetData.subject}</Text>
            <Text>{quizSetData.title}</Text>
          </>
        ) : (
          <Box>
            <Formik
              initialValues={{ title: "", subject: "" }}
              onSubmit={async ({ title, subject }) => {
                const data = await createQuizSet({
                  variables: { title, subject },
                });
                console.log("submit");
                setQuizSetData({
                  title: data.data.createQuizSet.title,
                  subject: data.data.createQuizSet.subject,
                  quizSetId: data.data.createQuizSet.id,
                });
                setIsSet(true);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField name="title" placeholder="title" type="text" />
                  <InputField
                    name="subject"
                    placeholder="subject"
                    type="text"
                  />
                  <Button type="submit">Create Quiz Set</Button>
                </Form>
              )}
            </Formik>
          </Box>
        )}

        {isSet ? (
          <>
            <Text>Make Questions</Text>
            {itemNumbers.map((itemNum) => {
              return (
                <MakeQuiz
                  itemNumber={itemNum}
                  quizSetId={quizSetData.quizSetId}
                />
              );
            })}
            <Button
              onClick={() => {
                addMoreQuiz();
              }}
            >
              Add more
            </Button>
          </>
        ) : (
          ""
        )}
      </Flex>
    </>
  );
};

export default withApollo({ ssr: true })(CreateQuizSet);
