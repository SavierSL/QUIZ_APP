import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import StudentBox from "../../components/pageComponents/studentBox";
import {
  Quiz,
  useGetQuizSetMutation,
  QuizSet,
  AnswerSet,
  Answer,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

export interface QuizSetContentProps {}
interface QuizSetData {
  getQuizSet?: {
    __typename?: "QuizSet";
  } & Pick<
    QuizSet,
    "quizSetCode" | "id" | "creatorId" | "title" | "subject"
  > & {
      quizzes?: ({
        __typename?: "Quiz";
      } & Pick<
        Quiz,
        "id" | "creatorId" | "quizCode" | "itemNumber" | "question" | "answer"
      >)[];
      answerSet?: ({
        __typename?: "AnswerSet";
      } & Pick<AnswerSet, "id" | "studentId" | "subject" | "title"> & {
          answers?: ({
            __typename?: "Answer";
          } & Pick<Answer, "answer" | "isCorrect" | "itemNumber">)[];
        })[];
    };
}
const QuizSetContent: React.FC<QuizSetContentProps> = () => {
  const router = useRouter();
  const [quizSetData, setQuizSetData] = useState<QuizSetData>();
  const setCode = typeof router.query.id === "string" ? router.query.id : "";
  const [getQuizSet, { data: QuizSetData }] = useGetQuizSetMutation();
  useEffect(() => {
    const quizSet = async () => {
      const data = await getQuizSet({
        variables: { quizSetCode: setCode },
      });
      setQuizSetData({ getQuizSet: data?.data.getQuizSet });
    };
    quizSet();
  }, []);

  return (
    <>
      <Box>
        <Text>{`${
          quizSetData?.getQuizSet ? quizSetData?.getQuizSet?.subject : ""
        }`}</Text>
        <Text>{`${
          quizSetData?.getQuizSet ? quizSetData?.getQuizSet?.title : ""
        }`}</Text>
        <Box>
          {quizSetData?.getQuizSet.quizzes.map((question) => {
            return (
              <Flex>
                <Text>{`${question.itemNumber}. ${question.question}`}</Text>
                <Text ml="1rem">{`correct answer: ${question.answer}`}</Text>
              </Flex>
            );
          })}
        </Box>
        {quizSetData?.getQuizSet ? <Text>Students who answered</Text> : ""}

        <Box>
          {quizSetData?.getQuizSet.answerSet.map((answerSet) => {
            const countScore = answerSet.answers.reduce((score, answer) => {
              answer.isCorrect && score++;
              return score;
            }, 0);

            return (
              <>
                <Flex>
                  <StudentBox studentId={answerSet.studentId} />
                  <Text
                    ml="1rem"
                    fontWeight={700}
                  >{`score: ${countScore}`}</Text>
                </Flex>
              </>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default withApollo({ ssr: true })(QuizSetContent);
