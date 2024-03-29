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
  MeTeacherDocument,
  MeTeacherQuery,
  useLogInTeacherMutation,
  useMeTeacherQuery,
} from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { toErrorMap } from "../utils/toErrors";
import { useRouter } from "next/dist/client/router";

export interface TeacherProps {}

const Teacher: React.FC<TeacherProps> = () => {
  const router = useRouter(); //NextJS property
  const [logInTeacher] = useLogInTeacherMutation();
  const { data: MeData } = useMeTeacherQuery();
  if (MeData?.meTeacher) {
    router.push("/teacher/teacher-home");
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
                <Text fontSize="4.5rem">Teacher Login</Text>
              </Box>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async ({ email, password }, { setErrors }) => {
                  const data = await logInTeacher({
                    variables: { email, password },
                    update: (cache, { data }) => {
                      cache.writeQuery<MeTeacherQuery>({
                        query: MeTeacherDocument,
                        data: {
                          __typename: "Query",
                          meTeacher: data.logInTeacher.user,
                        },
                      });
                    },
                  });
                  if (data.data?.logInTeacher.errors) {
                    setErrors(toErrorMap(data.data?.logInTeacher.errors));
                  }
                  const newData = toErrorMap(data.data?.logInTeacher.errors);
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

export default withApollo({ ssr: false })(Teacher);
