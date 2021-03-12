import {
  QuizSet,
  Quiz,
  useCreateAnswerSetMutation,
  useGetStudentQuery,
  AnswerSet,
  Student,
  Answer,
} from "../../generated/graphql";
import { Box, Button, Text, Flex } from "@chakra-ui/react";

export interface StudentQuizBoxProps {
  quiz: ({
    __typename?: "AnswerSet";
  } & Pick<AnswerSet, "id" | "studentId" | "title"> & {
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
          return <Text>{quiz.title}</Text>;
        })}
      </Box>
    </>
  );
};

export default StudentQuizBox;
