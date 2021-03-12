import React from "react";
import MainContainer from "../../components/MainContainer";
import Layout from "../../components/layout";
import Wrapper from "../../components/wrapper";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import InputField from "../../components/inputFIeld";
import NextLink from "next/link";
import { useGetQuizQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

export interface AdminHomeProps {}

const StudentHome: React.FC<AdminHomeProps> = () => {
  const { data } = useGetQuizQuery({ variables: { id: 1 } });
  console.log(data);
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
              <Button>
                <NextLink href="/quiz">ADD QUIZ</NextLink>
              </Button>
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

export default withApollo({ ssr: true })(StudentHome);
