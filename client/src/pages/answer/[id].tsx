import { Box, Flex, Text, Checkbox, Button } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import {
  useGetQuizSetv2Query,
  useAnswerMutation,
  useGetStudentQuery,
  useGetAnswerSetScoreQuery,
  useGetAnswerSetv2Query,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useApolloClient } from "@apollo/client";
import MainContainer from "../../components/MainContainer";
import Layout from "../../components/layout";
import Wrapper from "../../components/wrapper";
import NextLink from "next/link";

export interface AnswerProps {}

type Item = {
  choiceId: number;
  itemNumber: number;
  quizId: number;
  answer: string;
  quizSetId: number;
  answerSetId: number;
};
interface AnswerSetData {
  quizSetId: number;
  answerSetId: number;
}
const Answer: React.FC<AnswerProps> = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDoneSubmitting, setIsDoneSubmitting] = useState(false);
  const apolloClient = useApolloClient();
  const { refetch } = useGetStudentQuery();

  const [answer] = useAnswerMutation();
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const routerId = typeof router.query.id === "string" ? router.query.id : "";
  const answerSetData: AnswerSetData = JSON.parse(routerId);
  const { data, refetch: refetchScore } = useGetAnswerSetScoreQuery({
    variables: { id: +answerSetData.answerSetId },
  });
  const { data: QuizSetData } = useGetAnswerSetv2Query({
    variables: {
      id: +answerSetData.quizSetId,
      answerSetId: +answerSetData.answerSetId,
    },
  });
  const {
    data: GetAnswerSetData,
    refetch: refetchAnswers,
  } = useGetAnswerSetv2Query({
    variables: {
      id: +answerSetData.quizSetId,
      answerSetId: +answerSetData.answerSetId,
    },
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
  const submitAnswer = async (item: Item) => {
    await answer({
      variables: {
        answerSetId: +answerSetData.answerSetId,
        answer: item.answer,
        quizId: item.quizId,
        quizSetId: item.quizSetId,
        itemNumber: item.itemNumber,
      },
    });
  };
  return (
    <>
      <MainContainer>
        <Layout withNav={true}>
          <Wrapper variant="large">
            <Box minHeight="100vh" bg="blackAlpha.200" p="5rem">
              <Box mb="1rem">
                <Text fontSize="1.5rem">
                  {`Title: ${QuizSetData?.getAnswerSetv2.quizSet.title}`}
                </Text>
                <Text fontSize="1.5rem">
                  {`Subject: ${QuizSetData?.getAnswerSetv2.quizSet.subject}`}
                </Text>
              </Box>
              {QuizSetData?.getAnswerSetv2 ? (
                <>
                  {QuizSetData?.getAnswerSetv2.quizSet.quizzes.map((quiz) => {
                    return (
                      <>
                        <Box mt="1.5rem">
                          <Flex flexDirection="column">
                            <Box>
                              <Text
                                fontWeight={500}
                              >{`${quiz.itemNumber}. ${quiz.question}`}</Text>
                            </Box>
                            <Flex flexDirection="row">
                              {quiz.multipleChoices
                                // ERROR Cannot assign to read only property '0' of object '[object Array]'
                                //Because the array is frozen in strict mode, you'll need to copy the array before sorting it: by adding a slice
                                .slice()
                                .sort((a, b) => {
                                  var textA = a.letterItem.toUpperCase();
                                  var textB = b.letterItem.toUpperCase();
                                  return textA < textB
                                    ? -1
                                    : textA > textB
                                    ? 1
                                    : 0;
                                })
                                .map((choice) => {
                                  return (
                                    <>
                                      <Box mr="1rem" mt=".5rem">
                                        <Flex flexDirection="row">
                                          <Checkbox
                                            isChecked={isInItems(
                                              choice.id,
                                              quiz.id
                                            )}
                                            onChange={() => {
                                              if (
                                                isInItems(choice.id, quiz.id)
                                              ) {
                                                console.log("true");
                                                const newItems = items.filter(
                                                  (item) => {
                                                    return (
                                                      item.choiceId !==
                                                        choice.id ||
                                                      item.quizId !== quiz.id
                                                    );
                                                  }
                                                );
                                                console.log(newItems);
                                                setItems(newItems);
                                              } else {
                                                const newItems = items.filter(
                                                  (item) => {
                                                    return (
                                                      item.quizId !== quiz.id
                                                    );
                                                  }
                                                );
                                                setItems([
                                                  ...newItems,
                                                  {
                                                    itemNumber: quiz.itemNumber,
                                                    choiceId: choice.id,
                                                    quizId: quiz.id,
                                                    answer:
                                                      choice.letterContent,
                                                    quizSetId: quiz.quizSetId,
                                                    answerSetId: +answerSetData?.answerSetId,
                                                  },
                                                ]);
                                              }
                                            }}
                                          >
                                            {`${choice.letterItem}.`}
                                          </Checkbox>
                                          <Text fontWeight={700} ml=".5rem">
                                            {choice.letterContent}
                                          </Text>
                                        </Flex>
                                      </Box>
                                    </>
                                  );
                                })}
                            </Flex>
                          </Flex>
                        </Box>
                      </>
                    );
                  })}
                </>
              ) : (
                ""
              )}
              {isSubmitted && !isDoneSubmitting ? (
                <NextLink
                  href="/answer-set/[id]"
                  as={`/answer-set/{"quizSetId": "${answerSetData.quizSetId}", "answerSetId": "${answerSetData.answerSetId}"}`}
                >
                  <Button
                    position="absolute"
                    m="auto"
                    left="0"
                    right="0"
                    bottom="1rem"
                  >
                    Check Score
                  </Button>
                </NextLink>
              ) : (
                <Button
                  isLoading={isDoneSubmitting}
                  position="absolute"
                  m="auto"
                  left="0"
                  right="0"
                  bottom="1rem"
                  onClick={() => {
                    setIsDoneSubmitting(true);
                    items.map(async (item, index) => {
                      await submitAnswer(item);
                      if (item === items[index]) {
                        refetchScore();
                        refetchAnswers();
                        setIsDoneSubmitting(false);
                        setIsSubmitted(true);
                      }
                    });
                  }}
                >
                  Submit Answer
                </Button>
              )}
            </Box>
          </Wrapper>
        </Layout>
      </MainContainer>
    </>
  );
};

export default withApollo({ ssr: true })(Answer);
