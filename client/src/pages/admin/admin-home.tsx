import React from "react";
import MainContainer from "../../components/MainContainer";
import Layout from "../../components/layout";
import Wrapper from "../../components/wrapper";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

export interface AdminHomeProps {}

const AdminHome: React.FC<AdminHomeProps> = () => {
  const tableTitles = ["Quiz Name", "Quiz Items", "Quiz Subject"];
  const isBorder = (title: string) => {
    if (title === "Quiz Name") {
      return "5px 0px 0px 5px";
    } else if (title === "Quiz Items") {
      return "0px";
    } else {
      return "0px 5px 5px 0px";
    }
  };
  return (
    <>
      <MainContainer>
        <Layout withNav={true}>
          <Box ml="6rem" pt="5rem">
            <Wrapper variant="large">
              <Box>
                <Button>Create Quiz</Button>
              </Box>
              <Flex>
                {tableTitles.map((title) => {
                  return (
                    <Box
                      mr=".1rem"
                      p="1rem"
                      border="1px solid #fff"
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
            </Wrapper>
          </Box>
        </Layout>
      </MainContainer>
    </>
  );
};

export default AdminHome;
