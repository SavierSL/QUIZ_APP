import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Quiz, useGetQuizSetMutation, QuizSet } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

export interface QuizSetContentProps {}
interface QuizSetData {
  getQuizSet?: {
    __typename?: "QuizSet";
  } & Pick<
    QuizSet,
    "quizSetCode" | "id" | "creatorId" | "title" | "subject"
  > & {
      quizzes?: ({
        __typename?: "Quiz";
      } & Pick<
        Quiz,
        "id" | "creatorId" | "quizCode" | "itemNumber" | "question"
      >)[];
    };
}
const QuizSetContent: React.FC<QuizSetContentProps> = () => {
  const router = useRouter();
  const [quizSetData, setQuizSetData] = useState<QuizSetData>();
  const setCode = typeof router.query.id === "string" ? router.query.id : "";
  const [getQuizSet, { data: QuizSetData }] = useGetQuizSetMutation();
  useEffect(() => {
    const quizSet = async () => {
      const data = await getQuizSet({
        variables: { quizSetCode: setCode },
      });
      setQuizSetData({ getQuizSet: data?.data.getQuizSet });
    };
    quizSet();
  }, []);
  console.log(setCode);
  console.log(quizSetData);
  return <></>;
};

export default withApollo({ ssr: true })(QuizSetContent);
