import React from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import { Flex} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface QuestionInputProps {
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
}

function QuestionInput({ setQuestion }: QuestionInputProps) {
  let questionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputQuestion = event.target.value;
    setQuestion(inputQuestion);
  };
  // useEffect(() => {

  //   return () => {

  //   }
  // }, [question])

  return (
    <Flex marginTop="90px" width="100%" maxW="80%" fontSize="xl">
      <Textarea
        variant="unstyled"
        minH="unset"
        overflow="hidden"
        w="100%"
        resize="none"
        minRows={1}
        onChange={questionChange}
        as={ResizeTextarea}
        placeholder="Is my deadlift form correct? How do I change a light bulb?"
        textAlign="center"
        size=""
      />
    </Flex>
  );
}

export default QuestionInput;
