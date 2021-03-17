import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Wrapper from "../wrapper";
import InputField from "../inputFIeld";
import { useMakeQuizMutation } from "../../generated/graphql";
import MultipleChoice from "./multipleChoice";
export interface MakeQuizProps {
  itemNumber: number;
  quizSetId: number;
}
interface QuizData {
  question: string;
  answer: string;
  id: number;
}

const MakeQuiz: React.FC<MakeQuizProps> = ({ itemNumber, quizSetId }) => {
  const [multipleChoice, setMultipleChoice] = useState<string[]>(["a"]);
  const [isQuiestionSet, setIsSetQuestion] = useState(false);
  const [makeQuiz] = useMakeQuizMutation();
  const [quizData, setQuizData] = useState<QuizData>();

  //     @Arg("question") question: string,
  // @Arg("itemNumber") itemNumber: number,
  // @Arg("answer") answer: string,
  // @Arg("quizSetId") quizSetId: number,
  // @Arg("creatorId") creatorId: number
  const addMoreChoice = () => {
    let newChoice = "b";
    if (multipleChoice.length === 1) {
      return setMultipleChoice([...multipleChoice, newChoice]);
    } else if (multipleChoice.length === 2) {
      newChoice = "c";
      return setMultipleChoice([...multipleChoice, newChoice]);
    } else if (multipleChoice.length === 3) {
      newChoice = "d";
      return setMultipleChoice([...multipleChoice, newChoice]);
    }
  };
  return (
    <>
      <Box mt="2rem">
        <Formik
          initialValues={{ question: "", answer: "" }}
          onSubmit={async ({ question, answer }) => {
            const questionData = await makeQuiz({
              variables: { question, answer, itemNumber, quizSetId },
            });
            setQuizData({
              question: questionData.data.makeQuiz.question,
              answer: questionData.data.makeQuiz.answer,
              id: questionData.data.makeQuiz.id,
            });
            setIsSetQuestion(true);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {isQuiestionSet ? (
                <>
                  <Text>{quizData.question}</Text>
                  <Text>{quizData.answer}</Text>
                </>
              ) : (
                <>
                  <Flex alignItems="center">
                    <Text fontSize="1.5rem" mr="1rem">{`${itemNumber}. `}</Text>
                    <InputField
                      name="question"
                      placeholder="question"
                      type="text"
                    />
                  </Flex>
                  <InputField name="answer" placeholder="answer" type="text" />
                  <Button type="submit">Set Question</Button>
                </>
              )}

              {isQuiestionSet ? (
                <>
                  {multipleChoice.map((letter) => {
                    return (
                      <>
                        <MultipleChoice
                          letter={letter}
                          itemNumber={itemNumber}
                          quizId={quizData.id}
                        />
                      </>
                    );
                  })}

                  {multipleChoice.length !== 4 ? (
                    <Button
                      onClick={() => {
                        addMoreChoice();
                      }}
                    >
                      Add more choice
                    </Button>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default MakeQuiz;
