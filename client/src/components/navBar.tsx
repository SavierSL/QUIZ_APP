import { useApolloClient } from "@apollo/client";
import { Flex, Button, Box, Stack, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import Wrapper from "./wrapper";
import { withApollo } from "../utils/withApollo";

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex
        height="100vh"
        position="absolute"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          height="28rem"
          bg={colorMode === "light" ? "#FFF" : "#0f1123"}
          width="20rem"
          borderRadius="100%"
          position="fixed"
          ml="-12rem"
        />
      </Flex>
      <Box position="fixed" ml="1rem">
        <Flex height="100vh" flexDirection="column" justifyContent="center">
          <Stack spacing={8} alignItems="flex-start">
            <Button bg="none">HOME</Button>
            <Button bg="none">PROFILE</Button>
            <Button bg="none">QUIZZES</Button>
            <Button
              bg="none"
              onClick={async () => {
                await logout();
                router.push("/");
                apolloClient.resetStore();
              }}
            >
              Log out
            </Button>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default withApollo({ ssr: false })(NavBar);
