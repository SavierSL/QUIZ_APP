import { Box, Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import {
  useGetAnswerSetQuery,
  useGetAnswerSetScoreQuery,
  useGetAnswerSetv2Query,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
export interface AnswerSetMultipleChoiceProps {
  id: number;
}

const AnswerSetMultipleChoice: React.FC<AnswerSetMultipleChoiceProps> = ({
  id,
}) => {
  const { data: GetAnswerSetData } = useGetAnswerSetv2Query({
    variables: { id: id },
  });
  // const { data: AnwerSetData } = useGetAnswerSetQuery();
  // const getAnswerSetSameAsQuizSet = AnwerSetData?.getAnswerSet.filter(
  //   (answerSet) => {
  //     return answerSet.id === id;
  //   }
  // );
  // console.log(getAnswerSetSameAsQuizSet);
  const { data: scoreData } = useGetAnswerSetScoreQuery({
    variables: { id: GetAnswerSetData?.getAnswerSetv2.id },
  });
  //   const quizSets = [];
  //   const sortedChoice = GetAnswerSetData?.getAnswerSetv2.quizSet.quizzes.map(
  //     (quiz) => {
  //       quizSets.push(quiz);
  //     }
  //   );
  //  const newSets = quizSets.map(quiz=>{
  //      quiz.multipleChoice.sort((a,b)=>{
  //        //   var textA = a.letterItem.toUpperCase();
  //        //   var textB = b.letterItem.toUpperCase();
  //        //   return textA < textB ? -1 : textA > textB ? 1 : 0;
  //        return;
  //      })
  //  })

  return (
    <>
      <Text
        fontWeight={500}
      >{`Total Score: ${scoreData?.getAnswerSetScore}`}</Text>
      {GetAnswerSetData?.getAnswerSetv2.quizSet.quizzes.map((question) => {
        const findAnswer = GetAnswerSetData.getAnswerSetv2.answers.find(
          (answer) => {
            return answer.itemNumber === question.itemNumber;
          }
        );
        return (
          <>
            <Box mt="1rem">
              <Text>{`${question.itemNumber}. ${question.question}`}</Text>
              <Flex>
                <Flex>
                  {question.multipleChoices
                    // ERROR Cannot assign to read only property '0' of object '[object Array]'
                    //Because the array is frozen in strict mode, you'll need to copy the array before sorting it: by adding a slice
                    .slice()
                    .sort((a, b) => {
                      var textA = a.letterItem.toUpperCase();
                      var textB = b.letterItem.toUpperCase();
                      return textA < textB ? -1 : textA > textB ? 1 : 0;
                    })
                    .map((choice) => {
                      return (
                        <>
                          <Text
                            mr="1rem"
                            color={
                              findAnswer.answer === choice.letterContent
                                ? "red"
                                : ""
                            }
                          >{`${choice.letterItem}. ${choice.letterContent}`}</Text>
                        </>
                      );
                    })}
                </Flex>
                <Box ml="1rem">
                  <Text fontWeight={700}>
                    {findAnswer?.isCorrect ? "Correct" : "Wrong"}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </>
        );
      })}
    </>
  );
};

export default withApollo({ ssr: false })(AnswerSetMultipleChoice);
