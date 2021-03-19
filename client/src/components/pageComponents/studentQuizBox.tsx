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
import { useGetAnswerSetScoreQuery } from "../../generated/graphql";

export interface StudentQuizBoxProps {
  quizSet: Pick<
    AnswerSet,
    "id" | "studentId" | "quizSetId" | "title" | "totalItems" | "subject"
  >;
}

const StudentQuizBox: React.FC<StudentQuizBoxProps> = ({ quizSet }) => {
  const { data: AnswerSetScoreData } = useGetAnswerSetScoreQuery({
    variables: { id: quizSet.id },
  });
  return (
    <>
      <Flex>
        <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
          <Text>{quizSet.title}</Text>
        </Box>
        <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
          <Text>{quizSet.totalItems}</Text>
        </Box>
        <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
          <Text>{quizSet.subject}</Text>
        </Box>
        <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
          <Flex alignItems="center" justifyContent="center">
            <Text>
              {AnswerSetScoreData
                ? AnswerSetScoreData?.getAnswerSetScore === 0
                  ? "---"
                  : AnswerSetScoreData?.getAnswerSetScore
                : "---"}
            </Text>

            {AnswerSetScoreData?.getAnswerSetScore !== 0 ? (
              <></>
            ) : (
              <Button ml="1rem">
                <NextLink
                  href="/answer/[id]"
                  as={`/answer/${quizSet.quizSetId}`}
                >
                  Answer
                </NextLink>
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default StudentQuizBox;
