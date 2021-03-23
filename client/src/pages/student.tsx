import React from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  ColorModeScript,
  useColorMode,
  Stack,
} from "@chakra-ui/react";
import MidBox from "../components/chakraCustom/MidBox";
import Layout from "../components/layout";
import MainContainer from "../components/MainContainer";
import { fadeInMotion } from "../components/animation";
import { MotionBox } from "../components/motionElements";
import InputField from "../components/inputFIeld";
import { Form, Formik } from "formik";
import Wrapper from "../components/wrapper";
import {
  MeDocument,
  MeQuery,
  useLogInStudentMutation,
  useMeQuery,
} from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { toErrorMap } from "../utils/toErrors";
import { useRouter } from "next/dist/client/router";

export interface StudentProps {}

const Student: React.FC<StudentProps> = () => {
  const router = useRouter(); //NextJS property
  const [logInStudent] = useLogInStudentMutation();
  const { data: MeData } = useMeQuery();
  if (MeData?.me) {
    router.push("/student/student-home");
  }
  return (
    <>
      <MainContainer minHeight="100vh">
        <Layout withNav={false}>
          <MidBox>
            <MotionBox
              variants={fadeInMotion}
              animate="animate"
              initial="initial"
              ml="auto"
              mr="auto"
            >
              <Box textAlign="center" pt="5rem">
                <Text fontSize="4.5rem">Student Login</Text>
              </Box>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async ({ email, password }, { setErrors }) => {
                  const data = await logInStudent({
                    variables: { email, password },
                    update: (cache, { data }) => {
                      cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                          __typename: "Query",
                          me: data.logInStudent.user,
                        },
                      });
                    },
                  });
                  if (data.data?.logInStudent.errors) {
                    setErrors(toErrorMap(data.data?.logInStudent.errors));
                  }
                  const newData = toErrorMap(data.data?.logInStudent.errors);
                  console.log(newData);
                }}
              >
                {() => (
                  <Form>
                    <Wrapper variant="small">
                      <InputField
                        name="email"
                        label="Email"
                        type="text"
                        placeholder="email"
                      />
                      <InputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                      />
                      <Button mt="1rem" width="100%" type="submit">
                        Log In
                      </Button>
                    </Wrapper>
                  </Form>
                )}
              </Formik>
            </MotionBox>
          </MidBox>
        </Layout>
      </MainContainer>
    </>
  );
};

export default withApollo({ ssr: false })(Student);
