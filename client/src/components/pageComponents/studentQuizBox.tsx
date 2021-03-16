import {
  QuizSet,
  Quiz,
  useCreateAnswerSetMutation,
  useGetStudentQuery,
  AnswerSet,
  Student,
  Answer,
} from "../../generated/graphql";
import { Box, Button, Text, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export interface StudentQuizBoxProps {
  quiz: ({
    __typename?: "AnswerSet";
  } & Pick<
    AnswerSet,
    | "title"
    | "id"
    | "studentId"
    | "totalItems"
    | "subject"
    | "score"
    | "quizSetId"
  > & {
      answers?: ({
        __typename?: "Answer";
      } & Pick<
        Answer,
        "answer" | "isCorrect" | "answerSetId" | "itemNumber"
      >)[];
    })[];
}

const StudentQuizBox: React.FC<StudentQuizBoxProps> = ({ quiz }) => {
  return (
    <>
      <Box>
        {quiz.map((quiz) => {
          return (
            //
            <>
              <Flex>
                <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
                  <Text>{quiz.title}</Text>
                </Box>
                <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
                  <Text>{quiz.totalItems}</Text>
                </Box>
                <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
                  <Text>{quiz.subject}</Text>
                </Box>
                <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
                  <Flex alignItems="center" justifyContent="center">
                    <Text>{quiz.score ? quiz.score : "---"}</Text>
                    <Button ml="1rem">
                      <NextLink
                        href="/answer/[id]"
                        as={`/answer/${quiz.quizSetId}`}
                      >
                        Answer
                      </NextLink>
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default StudentQuizBox;
