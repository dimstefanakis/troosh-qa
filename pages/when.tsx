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
import { Spinner } from "@chakra-ui/spinner";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { UseMutationResult } from "react-query";
import { setStep } from "../src/features/Progress/progressSlice";
import { RootState } from "../src/store";
import ProgressBar from "../src/features/ProgressBar";
import TextLoader from "../src/flat/TextLoader";
import useCreateQuestion from "../src/features/Question/hooks/useCreateQuestion";
import { useRouter } from "next/router";
import axios from "axios";
import { setQuestion } from "../src/features/Question/questionSlice";
import { useMediaQuery } from "@chakra-ui/react";

interface NowAnswerInterface {
  createQuestion: UseMutationResult;
}

interface AnimateWhenButtonWrapperProps {
  when: string;
  selectedTime: string;
  children: JSX.Element;
}

interface AnimateStateSwitchProps {
  isVisible: boolean;
  children: JSX.Element;
}

function WhenPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const createQuestion = useCreateQuestion();
  const { question } = useSelector((state: RootState) => state.question);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");

  if (!question.body) {
    router.push("/");
  }

  useEffect(() => {
    dispatch(setStep(1));
  }, []);

  function handleWhenClick(when: string) {
    setSelectedTime(when);
    createQuestion.mutate({ body: question.body, when: when });
  }

  useEffect(() => {
    if (createQuestion.isSuccess) {
      let createdQuestion = createQuestion.data.question;
      // id is actually named surrogate in the response but we want to keep the id name
      createdQuestion = { ...createdQuestion, id: createdQuestion.surrogate };
      dispatch(setQuestion(createdQuestion));
    }
  }, [createQuestion.data]);

  console.log(question);
  // redirect only after redux store is populated with the question
  useEffect(() => {
    if (question.id && createQuestion.isSuccess && createQuestion.data) {
      router.push("/results");
    }
  }, [question.id, createQuestion]);

  return (
    <>
      {isSmallerThan767 ? "" : <ProgressBar />}
      <Flex
        position="relative"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <AnimateStateSwitch isVisible={selectedTime == ""}>
          <Flex flexFlow="column" alignItems="center" width="100%">
            <WhenHeader />
            <Flex mt={5}>
              <TimeButton
                width="200px"
                onClick={() => handleWhenClick("now")}
                _active={{
                  bg: "#f7c17e",
                  // transform: "scale(0.98)",
                  // borderColor: "#bec3c9",
                }}
                borderColor="black"
              >
                <Flex>ASAP</Flex>
              </TimeButton>
            </Flex>
            <Flex>
              <Flex mt={5} justifyContent="center" alignItems="center">
                <Flex>
                  <TimeButton onClick={() => handleWhenClick("6")}>
                    6 hours from now
                  </TimeButton>
                </Flex>
                <Flex>
                  <TimeButton onClick={() => handleWhenClick("12")}>
                    12 hours from now
                  </TimeButton>
                </Flex>
                <Flex>
                  <TimeButton onClick={() => handleWhenClick("24")}>
                    24 hours from now
                  </TimeButton>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </AnimateStateSwitch>
        <AnimateStateSwitch isVisible={selectedTime != ""}>
          <Box mt={20}>
            <TextLoader>Looking for currently available mentors...</TextLoader>
          </Box>
        </AnimateStateSwitch>
      </Flex>
    </>
  );
}

function AnimateStateSwitch({ children, isVisible }: AnimateStateSwitchProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{ height: "100%", width: "100%" }}
          initial={{
            opacity: 0,
            transform: "scale(0.9)",
            position: "absolute",
          }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          exit={{ opacity: 0, transform: "scale(0.9)" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TimeButton(props: ButtonProps) {
  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");

  return (
    <Button
      onClick={props.onClick}
      backgroundColor="#AAF0D1"
      _hover={{ bg: "#91e9c2" }}
      border="2px solid #AAF0D1"
      variant="solid"
      borderRadius="50px"
      fontSize="l"
      height="50px"
      width={isSmallerThan767 ? "150px" : "200px"}
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
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexFlow="column"
    >
      <Text fontWeight="700" fontSize="3xl" width="100%">
        {question.body}
      </Text>
      <Text color="gray" mt={20}>
        Get an answer
      </Text>
    </Flex>
  );
}

export default WhenPage;
