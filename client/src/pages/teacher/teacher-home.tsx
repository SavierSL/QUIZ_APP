import {
  Box,
  Button,
  Collapse,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../../components/layout";
import MainContainer from "../../components/MainContainer";
import CreateQuiz from "../../components/pageComponents/createQuizSet";
import Wrapper from "../../components/wrapper";
import { useGetTeachersQuizSetQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import QuizSetBox from "../../components/pageComponents/quizSetbBox";

export interface TeacherHomeProps {}

const TeacherHome: React.FC<TeacherHomeProps> = () => {
  const { data: TeachersQuizSets } = useGetTeachersQuizSetQuery();
  const { isOpen, onToggle } = useDisclosure();
  const [onCreateQuiz, setCreateQuiz] = useState(false);
  const handleCreateQuiz = () => {
    setCreateQuiz(!onCreateQuiz);
  };
  console.log(TeachersQuizSets?.getTeachersQuizSet);
  const tableTitles = ["Quiz Name", "Quiz Items", "Quiz Subject", "Quiz Code"];

  const isBorder = (title: string) => {
    if (title === "Quiz Name") {
      return "5px 0px 0px 5px";
    } else if (title === "Quiz Items") {
      return "0px";
    } else if (title === "Quiz Code") {
      return "0px 5px 5px 0px";
    } else {
      return "0px";
    }
  };
  return (
    <>
      <MainContainer>
        <Layout withNav={true}>
          <Wrapper variant="large">
            <Box pt="6rem">
              <Button onClick={onToggle}>Create Quiz</Button>
            </Box>
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

            {TeachersQuizSets?.getTeachersQuizSet.map((quizSet) => {
              return <QuizSetBox quizSet={quizSet} />;
            })}
          </Wrapper>
          <Collapse in={isOpen} animateOpacity>
            <Box
              rounded="md"
              pl="10rem"
              pr="10rem"
              position="absolute"
              top="0"
              left="0"
              right="0"
              m="auto"
              bg={isOpen ? "black" : ""}
              minHeight="100%"
            >
              <Collapse in={isOpen} animateOpacity>
                <Box pt="1rem" right="12rem" position="absolute">
                  <Button onClick={onToggle}>Close</Button>
                </Box>
                <Box bg="#fff" p="5rem">
                  <CreateQuiz />
                </Box>
              </Collapse>
            </Box>
          </Collapse>
        </Layout>
      </MainContainer>
    </>
  );
};

export default withApollo({ ssr: true })(TeacherHome);
