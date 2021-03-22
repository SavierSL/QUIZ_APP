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
import { route } from "next/dist/next-server/server/router";
export interface AnswerSetProps {}
interface AnswerSetData {
  quizSetId: number;
  answerSetId: number;
}
const AnswerSet: React.FC<AnswerSetProps> = () => {
  const router = useRouter();
  const routerId = typeof router.query.id === "string" ? router.query.id : "";
  console.log(JSON.parse(routerId));
  const answerSetData: AnswerSetData = JSON.parse(routerId);

  const { data: GetAnswerSetData } = useGetAnswerSetv2Query({
    variables: {
      id: +answerSetData.quizSetId,
      answerSetId: +answerSetData.answerSetId,
    },
  });
  console.log(typeof answerSetData.answerSetId);
  console.log(GetAnswerSetData?.getAnswerSetv2);
  const { data: scoreData } = useGetAnswerSetScoreQuery({
    variables: { id: answerSetData.quizSetId },
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
              <Box>
                {
                  <AnswerSetMultipleChoice
                    answerSetDatas={GetAnswerSetData?.getAnswerSetv2}
                    answerSetId={GetAnswerSetData?.getAnswerSetv2.id}
                  />
                }
              </Box>
            </Box>
          </Wrapper>
        </Layout>
      </MainContainer>
    </>
  );
};

export default withApollo({ ssr: true })(AnswerSet);
