import { useState, useEffect } from "react";
import {
  Flex,
  Image,
  Text,
  Box,
  LinkBox,
  LinkOverlay,
  Button,
} from "@chakra-ui/react";
import { ButtonProps } from "@chakra-ui/button";
import { useSelector, useDispatch } from "react-redux";
import { UseMutationResult } from "react-query";
import { setStep } from "../src/features/Progress/progressSlice";
import { RootState } from "../src/store";
import ProgressBar from "../src/features/ProgressBar";
import useCreateQuestion from "../src/features/Question/hooks/useCreateQuestion";
import { useRouter } from "next/router";
import axios from "axios";
import { setQuestion } from "../src/features/Question/questionSlice";

interface NowAnswerInterface {
  createQuestion: UseMutationResult;
}

function WhenPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const createQuestion = useCreateQuestion();
  const { question } = useSelector((state: RootState) => state.question);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setStep(1));
  }, []);

  function handleWhenClick(when: string) {
    createQuestion.mutate({ body: question.body, when: when });
  }

  useEffect(()=>{
    if(createQuestion.isSuccess){
      let createdQuestion = createQuestion.data.question;
      // id is actually named surrogate in the response but we want to keep the id name
      createdQuestion = {...createdQuestion, id: createdQuestion.surrogate}
      dispatch(setQuestion(createdQuestion));
      router.push('/results')
    }
  },[createQuestion.data])

  useEffect(()=>{
    if(question.id){
      
    }
  }, [question.id])

  return (
    <>
      <ProgressBar />
      <WhenHeader />
      <Flex mt={5}>
        <TimeButton
          onClick={() => handleWhenClick("now")}
          backgroundColor="#FFD29B"
          _hover={{ bg: "#f5c68c" }}
          _active={{
            bg: "#f7c17e",
            // transform: "scale(0.98)",
            // borderColor: "#bec3c9",
          }}
        >
          <Flex>Now</Flex>
        </TimeButton>
      </Flex>
      {createQuestion.isLoading == false ? (
        <Flex mt={5}>
          <Flex width="100%">
            <TimeButton onClick={() => handleWhenClick("6")}>
              6 hours from now
            </TimeButton>
          </Flex>
          <Flex width="100%">
            <TimeButton onClick={() => handleWhenClick("12")}>
              12 hours from now
            </TimeButton>
          </Flex>
          <Flex width="100%">
            <TimeButton onClick={() => handleWhenClick("24")}>
              24 hours from now
            </TimeButton>
          </Flex>
        </Flex>
      ) : (
        <NowSearch />
      )}
    </>
  );
}

function TimeButton(props: ButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      backgroundColor="#AAF0D1"
      _hover={{ bg: "#91e9c2" }}
      variant="solid"
      borderRadius="50px"
      fontSize="l"
      height="50px"
      width="200px"
      whiteSpace="normal"
      m={2}
      _active={{
        bg: "#f7c17e",
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

function WhenHeader() {
  const { question } = useSelector((state: RootState) => state.question);

  return (
    <Flex
      width="100%"
      height="25%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexFlow="column"
    >
      <Text fontWeight="700" fontSize="3xl" width="100%">
        {question.body}
      </Text>
      <Text mt={20} color="gray">
        I need an answer
      </Text>
    </Flex>
  );
}

function NowSearch() {
  const router = useRouter();
  setTimeout(function () {
    router.push("/results");
  }, 5000);
  return (
    <Flex
      fontSize="2xl"
      color="#555555;"
      marginTop="50px"
      maxW="400px"
      textAlign="center"
    >
      Looking for currently available mentors...
    </Flex>
  );
}

export default WhenPage;
