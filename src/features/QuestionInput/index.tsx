import React, { useState, useEffect } from "react";
import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import { Flex } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestion } from "../Question/questionSlice";
import {RootState} from '../../store';


function QuestionInput() {
  const dispatch = useDispatch();

  // ACCESS TO QUESTION HERE
  const { question } = useSelector((state: RootState) => state.question);

  let questionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setQuestion(event.target.value));
  };

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
