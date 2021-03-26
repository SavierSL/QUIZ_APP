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
import { Form, Formik } from "formik";
import MainContainer from "../../components/MainContainer";
import Wrapper from "../../components/wrapper";
import InputField from "../../components/inputFIeld";
import { MotionBox } from "../../components/motionElements";
import MidBox from "../../components/chakraCustom/MidBox";
import { fadeInMotion } from "../../components/animation";
import {
  MeTeacherDocument,
  MeTeacherQuery,
  useMeTeacherQuery,
  useRegisterTeacherMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { withApollo } from "../../utils/withApollo";
export interface RegisterTeacherProps {}

const RegisterTeacher: React.FC<RegisterTeacherProps> = () => {
  const [registerTeacher] = useRegisterTeacherMutation();
  const router = useRouter();
  const { data: MeData, loading } = useMeTeacherQuery();
  if (MeData?.meTeacher && !loading) {
    router.push("/teacher/teacher-home");
  }
  return (
    <>
      <MainContainer minHeight="100vh">
        <Wrapper variant="large">
          <MidBox>
            <MotionBox
              variants={fadeInMotion}
              animate="animate"
              initial="initial"
              ml="auto"
              mr="auto"
            >
              <Box textAlign="center" pt="5rem">
                <Text fontSize="4.5rem">Sign up for Teachers</Text>
              </Box>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async ({ email, password }) => {
                  const data = await registerTeacher({
                    variables: { email, password },
                    update: (cache, { data }) => {
                      cache.writeQuery<MeTeacherQuery>({
                        query: MeTeacherDocument,
                        data: {
                          __typename: "Query",
                          meTeacher: data.registerTeacher.user,
                        },
                      });
                    },
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Wrapper variant="small">
                      <InputField
                        name="email"
                        placeholder="email"
                        type="text"
                      />
                      <InputField
                        name="password"
                        placeholder="password"
                        type="password"
                      />
                      <Button mt="1rem" width="100%" type="submit">
                        Register
                      </Button>
                    </Wrapper>
                  </Form>
                )}
              </Formik>
            </MotionBox>
          </MidBox>
        </Wrapper>
      </MainContainer>
    </>
  );
};

export default withApollo({ ssr: false })(RegisterTeacher);
