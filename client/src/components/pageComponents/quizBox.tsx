import {
  QuizSet,
  Quiz,
  useCreateAnswerSetMutation,
  useGetStudentQuery,
  GetQuizSetDocument,
  GetStudentDocument,
} from "../../generated/graphql";
import { Box, Button, Text, Flex } from "@chakra-ui/react";

export interface QuizBoxProps {
  quizSet: Pick<QuizSet, "title" | "id" | "quizSetCode" | "creatorId"> & {
    quizzes?: ({
      __typename?: "Quiz";
    } & Pick<
      Quiz,
      "id" | "creatorId" | "quizCode" | "itemNumber" | "question"
    >)[];
  };
}
const QuizBox: React.FC<QuizBoxProps> = ({ quizSet }) => {
  const [createAnswerSet] = useCreateAnswerSetMutation();
  return (
    <>
      <Box p="1rem" bg="#1e212d" mt="1rem" borderRadius="5px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{quizSet.title}</Text>
          <Button
            onClick={() => {
              createAnswerSet({
                variables: { quizSetId: quizSet.id },
                refetchQueries: [{ query: GetStudentDocument }],
              });
            }}
          >
            ADD
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default QuizBox;
