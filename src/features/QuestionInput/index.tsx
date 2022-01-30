import React, { useState, useEffect } from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import { Flex } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestion } from "../Question/questionSlice";
import { RootState } from "../../store";
import styles from "./QuestionInput.module.css";

function QuestionInput() {
  const dispatch = useDispatch();

  // ACCESS TO QUESTION HERE
  const { question } = useSelector((state: RootState) => state.question);

  let questionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setQuestion({ body: event.target.value }));
  };

  return (
    <Flex
      marginTop="90px"
      width="100%"
      maxW="400px"
      fontSize="xl"
      className={question.body.length > 0 ? "" : styles.textareaContainer}
    >
      <Textarea
        variant="unstyled"
        minH="unset"
        overflow="hidden"
        w="100%"
        resize="none"
        minRows={1}
        onChange={questionChange}
        as={ResizeTextarea}
        placeholder={`If I want to maximize tricep development and want to do it with 2 movements in addition to bench and OHP, are dips and overhead cable tricep extension good choices?\n\nWhich global state management can I use with React Query?`}
        // textAlign="center"
        size=""
      />
    </Flex>
  );
}

export default QuestionInput;
