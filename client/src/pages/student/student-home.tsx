import React from "react";
import MainContainer from "../../components/MainContainer";
import Layout from "../../components/layout";
import Wrapper from "../../components/wrapper";
import {
  Box,
  Button,
  cookieStorageManager,
  Flex,
  Text,
} from "@chakra-ui/react";
import InputField from "../../components/inputFIeld";
import NextLink from "next/link";
import Quiz from "../../components/pageComponents/quiz";
import { withApollo } from "../../utils/withApollo";
import {
  useGetAnswerSetQuery,
  useGetStudentQuery,
} from "../../generated/graphql";
import StudentQuizBox from "../../components/pageComponents/studentQuizBox";

export interface AdminHomeProps {}

const StudentHome: React.FC<AdminHomeProps> = () => {
  const { data: studentData } = useGetStudentQuery();
  const { data: AnswerSetData } = useGetAnswerSetQuery({
    variables: { studentId: studentData?.getStudent?.student?.id },
  });
  console.log(studentData);
  console.log(AnswerSetData);
  const tableTitles = ["Quiz Name", "Quiz Items", "Quiz Subject", "Quiz Score"];

  const isBorder = (title: string) => {
    if (title === "Quiz Name") {
      return "5px 0px 0px 5px";
    } else if (title === "Quiz Items") {
      return "0px";
    } else if (title === "Quiz Score") {
      return "0px 5px 5px 0px";
    } else {
      return "0px";
    }
  };
  return (
    <>
      <MainContainer>
        <Layout withNav={true}>
          <Box ml="5rem" pt="5rem">
            <Wrapper variant="large">
              <Quiz />
              <Flex>
                {tableTitles.map((title) => {
                  return (
                    <Box
                      mr=".1rem"
                      p="1rem"
                      border="1px solid #1687a7"
                      bg="none"
                      width="30%"
                      textAlign="center"
                      mt="1rem"
                      borderRadius={isBorder(title)}
                    >
                      <Text>{title}</Text>
                    </Box>
                  );
                })}
              </Flex>
              {studentData?.getStudent ? (
                <StudentQuizBox quiz={studentData?.getStudent?.answerSets} />
              ) : (
                ""
              )}
            </Wrapper>
          </Box>
        </Layout>
      </MainContainer>
    </>
  );
};

export default withApollo({ ssr: true })(StudentHome);
