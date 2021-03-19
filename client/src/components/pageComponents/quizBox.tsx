import {
  QuizSet,
  Quiz,
  useCreateAnswerSetMutation,
  useGetStudentQuery,
  GetQuizSetDocument,
  GetStudentDocument,
  GetAnswerSetDocument,
} from "../../generated/graphql";
import { Box, Button, Text, Flex } from "@chakra-ui/react";

export interface QuizBoxProps {
  added: boolean;
  quizSet: Pick<QuizSet, "title" | "id" | "quizSetCode" | "creatorId"> & {
    quizzes?: ({
      __typename?: "Quiz";
    } & Pick<
      Quiz,
      "id" | "creatorId" | "quizCode" | "itemNumber" | "question"
    >)[];
  };
}
const QuizBox: React.FC<QuizBoxProps> = ({ quizSet, added }) => {
  const [createAnswerSet] = useCreateAnswerSetMutation();
  return (
    <>
      <Box p="1rem" bg="#1e212d" mt="1rem" borderRadius="5px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{quizSet.title}</Text>
          <Button
            isDisabled={added}
            onClick={() => {
              createAnswerSet({
                variables: { quizSetId: quizSet.id },
                refetchQueries: [{ query: GetStudentDocument }],
              });
            }}
          >
            {`${added ? "ADDED" : "ADD"}`}
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default QuizBox;
