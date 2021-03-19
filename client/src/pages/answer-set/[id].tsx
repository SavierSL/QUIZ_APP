import { Box, Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import {
  useGetAnswerSetScoreQuery,
  useGetAnswerSetv2Query,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import AnswerSetMultipleChoice from "../../components/pageComponents/answerSetMultipleChoice";
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
      ANSWER SET
      <Box>
        <Text>{GetAnswerSetData?.getAnswerSetv2.subject}</Text>
        <Text>{GetAnswerSetData?.getAnswerSetv2.title}</Text>
      </Box>
      <Box>{<AnswerSetMultipleChoice id={routerId} />}</Box>
    </>
  );
};

export default withApollo({ ssr: true })(AnswerSet);
