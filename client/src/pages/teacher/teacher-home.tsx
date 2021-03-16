import { Box, Button } from "@chakra-ui/react";
import React from "react";
import Layout from "../../components/layout";
import MainContainer from "../../components/MainContainer";
import CreateQuiz from "../../components/pageComponents/createQuiz";
import Wrapper from "../../components/wrapper";

export interface TeacherHomeProps {}

const TeacherHome: React.FC<TeacherHomeProps> = () => {
  return (
    <>
      <MainContainer>
        <Layout withNav={true}>
          <Wrapper variant="large">
            <Box pt="5rem">
              <Button>Create Quiz</Button>
            </Box>
            <CreateQuiz />
          </Wrapper>
        </Layout>
      </MainContainer>
    </>
  );
};

export default TeacherHome;
