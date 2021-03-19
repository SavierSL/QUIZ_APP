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
  itemNumberQ: number;
}

const MakeQuiz: React.FC<MakeQuizProps> = ({ itemNumber, quizSetId }) => {
  const [multipleChoice, setMultipleChoice] = useState<string[]>(["a"]);
  const [isQuiestionSet, setIsSetQuestion] = useState(false);
  const [makeQuiz] = useMakeQuizMutation();
  const [quizData, setQuizData] = useState<QuizData>();
  const [value1, setValue1] = React.useState("");
  const handleChange1 = (event) => setValue1(event.target.value);
  const [value2, setValue2] = React.useState("");
  const handleChange2 = (event) => setValue2(event.target.value);

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
      <Box mt="1rem">
        <Formik
          initialValues={{ _: "" }}
          onSubmit={async () => {
            const questionData = await makeQuiz({
              variables: {
                question: value1,
                answer: value2,
                itemNumber,
                quizSetId,
              },
            });
            setQuizData({
              question: questionData.data.makeQuiz.question,
              answer: questionData.data.makeQuiz.answer,
              id: questionData.data.makeQuiz.id,
              itemNumberQ: questionData.data.makeQuiz.itemNumber,
            });
            setIsSetQuestion(true);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {isQuiestionSet ? (
                <>
                  <Flex alignItems="flex-start" flexDirection="column">
                    <Box>
                      <Text
                        mr="1rem"
                        fontSize="2rem"
                      >{`${quizData.itemNumberQ}. ${quizData.question}`}</Text>
                    </Box>
                    <Box mb="1rem">
                      <Text
                        fontSize="1.2rem"
                        color="green"
                      >{`Answer: ${quizData.answer}`}</Text>
                    </Box>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex alignItems="center">
                    <Text fontSize="1.5rem" mr="1rem">{`${itemNumber}. `}</Text>
                    <InputField
                      value={value1}
                      onChange={handleChange1}
                      name="question"
                      placeholder="question"
                      type="text"
                    />
                  </Flex>
                  <InputField
                    value={value2}
                    onChange={handleChange2}
                    name="answer"
                    placeholder="answer"
                    type="text"
                  />
                  <Button
                    isDisabled={value1 === "" || value2 === "" ? true : false}
                    type="submit"
                  >
                    Set Question
                  </Button>
                </>
              )}

              {isQuiestionSet ? (
                <>
                  {multipleChoice.map((letter) => {
                    return (
                      <>
                        <Box mt=".5rem">
                          <MultipleChoice
                            letter={letter}
                            itemNumber={itemNumber}
                            quizId={quizData.id}
                          />
                        </Box>
                      </>
                    );
                  })}

                  {multipleChoice.length !== 4 ? (
                    <Button
                      width="100%"
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
