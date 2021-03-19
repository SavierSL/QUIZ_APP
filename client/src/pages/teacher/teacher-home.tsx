import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../../components/layout";
import MainContainer from "../../components/MainContainer";
import CreateQuiz from "../../components/pageComponents/createQuizSet";
import Wrapper from "../../components/wrapper";

export interface TeacherHomeProps {}

const TeacherHome: React.FC<TeacherHomeProps> = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [onCreateQuiz, setCreateQuiz] = useState(false);
  const handleCreateQuiz = () => {
    setCreateQuiz(!onCreateQuiz);
  };
  return (
    <>
      <MainContainer>
        <Layout withNav={true}>
          <Wrapper variant="large">
            <Box pt="5rem">
              <Button onClick={onToggle}>Create Quiz</Button>
            </Box>
            <Collapse in={isOpen} animateOpacity>
              <CreateQuiz />{" "}
            </Collapse>
          </Wrapper>
        </Layout>
      </MainContainer>
    </>
  );
};

export default TeacherHome;
