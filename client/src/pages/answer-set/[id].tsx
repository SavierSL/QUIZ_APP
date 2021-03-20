import { Box, Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import {
  useGetAnswerSetQuery,
  useGetAnswerSetScoreQuery,
  useGetAnswerSetv2Query,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import AnswerSetMultipleChoice from "../../components/pageComponents/answerSetMultipleChoice";
import Layout from "../../components/layout";
import Wrapper from "../../components/wrapper";
import MainContainer from "../../components/MainContainer";
export interface AnswerSetProps {}

const AnswerSet: React.FC<AnswerSetProps> = () => {
  const router = useRouter();
  const routerId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data: GetAnswerSetData } = useGetAnswerSetv2Query({
    variables: { id: routerId },
  });
  const { data: scoreData } = useGetAnswerSetScoreQuery({
    variables: { id: routerId },
  });

  return (
    <>
      {" "}
      <MainContainer minHeight="100vh">
        <Layout withNav={true}>
          <Wrapper variant="large">
            <Box minHeight="100vh" bg="blackAlpha.200" p="5rem">
              ANSWER SET
              <Box>
                <Text>{GetAnswerSetData?.getAnswerSetv2.subject}</Text>
                <Text>{GetAnswerSetData?.getAnswerSetv2.title}</Text>
              </Box>
              <Box>{<AnswerSetMultipleChoice id={routerId} />}</Box>
            </Box>
          </Wrapper>
        </Layout>
      </MainContainer>
    </>
  );
};

export default withApollo({ ssr: true })(AnswerSet);
