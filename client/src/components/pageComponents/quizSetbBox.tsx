import { Flex, Box, Text } from "@chakra-ui/react";
import { QuizSet } from "../../generated/graphql";
import React from "react";

export interface QuizSetBoxProps {
  quizSet: {
    __typename?: "QuizSet";
  } & Pick<
    QuizSet,
    | "id"
    | "quizSetCode"
    | "subject"
    | "title"
    | "creatorId"
    | "totalItems"
    | "createdAt"
  >;
}

const QuizSetBox: React.FC<QuizSetBoxProps> = ({ quizSet }) => {
  const limitText = (string: string) => {
    return string.slice(0, 10);
  };
  console.log(quizSet);
  return (
    <>
      <Flex>
        <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
          <Text>{limitText(quizSet.title)}</Text>
        </Box>
        <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
          <Text>{quizSet.totalItems}</Text>
        </Box>
        <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
          <Text>{limitText(quizSet.subject)}</Text>
        </Box>
        <Box mr=".1rem" p="1rem" width="30%" textAlign="center">
          {quizSet.quizSetCode}
        </Box>
      </Flex>
    </>
  );
};

export default QuizSetBox;
