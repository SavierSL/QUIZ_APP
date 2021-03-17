import { Flex, Text, Button, Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useCreateMultipleChoiceMutation } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import InputField from "../inputFIeld";

export interface MultipleChoiceProps {
  letter: string;
  quizId: number;
  itemNumber: number;
}
interface LetterType {
  letterT: string;
  letterContetT: string;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  letter,
  quizId,
  itemNumber,
}) => {
  const [letterSet, setLetterSet] = useState<LetterType>();
  const [isSubmit, setIsSubmit] = useState(false);
  const [createMultipleChoice] = useCreateMultipleChoiceMutation();
  const [letterContentInput, setLetterContentInput] = useState<any>({
    letterContent: "",
  });
  const submitMultipleChoice = async () => {
    console.log(letterContentInput.letterContent);
    const letterData = await createMultipleChoice({
      variables: {
        letterItem: letter,
        letterContent: letterContentInput.letterContent,
        quizId,
      },
    });
    setLetterSet({
      letterContetT: letterData.data.createMultipleChoice.letterContent,
      letterT: letterData.data.createMultipleChoice.letterItem,
    });
    setIsSubmit(true);
  };
  const handleLetterContentInput = (e: any) => {
    e.preventDefault();
    setLetterContentInput({ [e.target.name]: e.target.value });
  };
  return (
    <>
      {isSubmit ? (
        <Flex>
          <Text mr="1rem">{letterSet.letterT}</Text>
          <Text>{letterSet.letterContetT}</Text>
        </Flex>
      ) : (
        <Flex key={letter} alignItems="center">
          <Text mr="1rem">{`${letter}.`}</Text>
          <Input
            name="letterContent"
            value={letterContentInput.letterContent}
            onChange={(e) => {
              handleLetterContentInput(e);
            }}
            placeholder="letterContent"
            type="text"
          />
          <Button
            onClick={() => {
              submitMultipleChoice();
            }}
          >
            Submit
          </Button>
        </Flex>
      )}
    </>
  );
};

export default withApollo({ ssr: false })(MultipleChoice);
