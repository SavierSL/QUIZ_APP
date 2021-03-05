import { error } from "console";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  textarea?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let I: any = Input;
  if (textarea) {
    I = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <>
      <FormControl>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <I
          {...field}
          {...props}
          id={field.name}
          color="white"
          border="2px"
          borderColor="black"
          bg="#0f1123"
          p="1.5rem"
        />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : ""}
      </FormControl>
    </>
  );
};

export default InputField;
