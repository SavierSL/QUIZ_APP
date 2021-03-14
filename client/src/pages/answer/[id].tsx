import { useRouter } from "next/dist/client/router";

export interface AnswerProps {}

const Answer: React.SFC<AnswerProps> = () => {
  const router = useRouter();
  const routerId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  console.log(routerId);
  return <>awit</>;
};

export default Answer;
