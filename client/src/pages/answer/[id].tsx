import { Box, Flex, Text, Checkbox, Button } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import {
  useGetQuizSetv2Query,
  useAnswerMutation,
  useGetStudentQuery,
  useGetAnswerSetScoreQuery,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useApolloClient } from "@apollo/client";

export interface AnswerProps {}

type Item = {
  choiceId: number;
  itemNumber: number;
  quizId: number;
  answer: string;
  quizSetId: number;
};

const Answer: React.FC<AnswerProps> = () => {
  const apolloClient = useApolloClient();
  const { refetch } = useGetStudentQuery();

  const [answer] = useAnswerMutation();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const routerId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, refetch: refetchScore } = useGetAnswerSetScoreQuery({
    variables: { id: routerId },
  });
  const { data: QuizSetData } = useGetQuizSetv2Query({
    variables: { id: routerId },
  });
  const isInItems = (choiceId: number, quizId: number): boolean => {
    const boolean: Item[] = items.filter((item) => {
      if (item.quizId === quizId && item.choiceId === choiceId) {
        return true;
        // } else if (item.quizId === quizId) {
        //   return true;
      } else {
        return false;
      }
    });
    return boolean[0]?.choiceId === choiceId && boolean[0]?.quizId === quizId;
  };
  console.log(QuizSetData);
  console.log(items);
  const submitAnswer = (item: Item) => {
    answer({
      variables: {
        answer: item.answer,
        quizId: item.quizId,
        quizSetId: item.quizSetId,
        itemNumber: item.itemNumber,
      },
    });
  };
  return (
    <>
      <Text>{QuizSetData?.getQuizSetv2.subject}</Text>
      <Text>{QuizSetData?.getQuizSetv2.title}</Text>
      {QuizSetData?.getQuizSetv2 ? (
        <>
          {QuizSetData?.getQuizSetv2.quizzes.map((quiz) => {
            return (
              <>
                <Flex flexDirection="column">
                  <Box>
                    <Text>{`${quiz.itemNumber}. ${quiz.question}`}</Text>
                  </Box>
                  <Flex flexDirection="row">
                    {quiz.multipleChoices.map((choice) => {
                      return (
                        <>
                          <Box mr="1rem">
                            <Flex flexDirection="row">
                              <Checkbox
                                isChecked={isInItems(choice.id, quiz.id)}
                                onChange={() => {
                                  if (isInItems(choice.id, quiz.id)) {
                                    console.log("true");
                                    const newItems = items.filter((item) => {
                                      return (
                                        item.choiceId !== choice.id ||
                                        item.quizId !== quiz.id
                                      );
                                    });
                                    console.log(newItems);
                                    setItems(newItems);
                                  } else {
                                    const newItems = items.filter((item) => {
                                      return item.quizId !== quiz.id;
                                    });
                                    setItems([
                                      ...newItems,
                                      {
                                        itemNumber: quiz.itemNumber,
                                        choiceId: choice.id,
                                        quizId: quiz.id,
                                        answer: choice.letterContent,
                                        quizSetId: quiz.quizSetId,
                                      },
                                    ]);
                                  }
                                }}
                              >
                                {choice.letterItem}
                              </Checkbox>
                              <Text>{choice.letterContent}</Text>
                            </Flex>
                          </Box>
                        </>
                      );
                    })}
                  </Flex>
                </Flex>
              </>
            );
          })}
        </>
      ) : (
        ""
      )}
      <Button
        onClick={() => {
          items.map((item) => {
            submitAnswer(item);
          });
        }}
      >
        Submit Answer
      </Button>
      <Button
        onClick={() => {
          refetchScore();
        }}
      >
        back
      </Button>
    </>
  );
};

export default withApollo({ ssr: true })(Answer);
