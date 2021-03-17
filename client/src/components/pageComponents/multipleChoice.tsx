import { Flex, Text, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../inputFIeld";

export interface MultipleChoiceProps {
  letter: string;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ letter }) => {
  return (
    <>
      <Formik
        initialValues={{ letterItem: "", letterContent: "" }}
        onSubmit={() => console.log("sub")}
      >
        {() => (
          <Form>
            <Flex key={letter} alignItems="center">
              <Text mr="1rem">{`${letter}.`}</Text>
              <InputField
                name="letterContent"
                placeholder="letterContent"
                type="text"
                key={letter}
              />
              <Button>Submit</Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MultipleChoice;
