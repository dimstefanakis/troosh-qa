import React, { useState, useEffect } from "react";
import { Textarea, Text } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import { Flex } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestion } from "../Question/questionSlice";
import { RootState } from "../../store";
import styles from "./QuestionInput.module.css";
import { useMediaQuery } from "@chakra-ui/react";

interface QuestionInputProps{
  questionInputRef: React.RefObject<HTMLTextAreaElement>
}

function QuestionInput({questionInputRef}: QuestionInputProps) {
  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");
  const dispatch = useDispatch();

  const { question } = useSelector((state: RootState) => state.question);

  let questionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setQuestion({ body: event.target.value }));
  };

  return (
    <Flex
      flexFlow="column"
      marginTop="90px"
      marginLeft={isSmallerThan767 ? "50px" : "0px"}
      width="100%"
      maxW="400px"
      fontSize="xl"
      className={question.body.length > 0 ? "" : styles.textareaContainer}
    >
      <Textarea
      layerStyle="selected"
        ref={questionInputRef}
        borderColor="transparent"
        minLength={30}
        padding={4}
        borderRadius="10px"
        minH="unset"
        overflow="hidden"
        w="100%"
        resize="none"
        minRows={1}
        value={question.body}
        onChange={questionChange}
        as={ResizeTextarea}
        placeholder={`If I want to maximize tricep development and want to do it with 2 movements in addition to bench and OHP, are dips and overhead cable tricep extension good choices?\n\nWhich global state management can I use with React Query?`}
        // textAlign="center"
        size=""
      />
      <CharactersLeft />
    </Flex>
  );
}

function CharactersLeft(){
  const { question } = useSelector((state: RootState) => state.question);
  let feedbackText = ''

  if (question.body.length == 0) {
    feedbackText = "";
  } else if (question.body.length < 15) {
    feedbackText = "Your question is too broad";
  } else if (question.body.length < 30) {
    feedbackText = "Try to be a bit more specific, almost there!";
  } else {
    feedbackText = "Ready to go!";
  }

  return(
    <Flex px={4} mt={2}>
      <Text color="gray.600" fontSize="xs">{feedbackText}</Text>
    </Flex>
  )
}

export default QuestionInput;
