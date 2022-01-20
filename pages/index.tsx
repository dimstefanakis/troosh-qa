import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Flex, Button, Image, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import QuestionInput from "../src/features/QuestionInput";
import ProgressBar from "../src/features/ProgressBar";
import { RootState } from "../src/store";
import { setStep } from "../src/features/Progress/progressSlice";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { question } = useSelector((state: RootState) => state.question);

  useEffect(() => {
    dispatch(setStep(0));
  }, []);

  return (
    <>
      <ProgressBar />
      <Flex justifyContent="center">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <QuestionHeader />
          <QuestionInput />
          <SearchButtons />
        </Flex>
      </Flex>
    </>
  );
};

function QuestionHeader() {
  return (
    <Flex
      fontSize="3xl"
      maxWidth="400px"
      height="25%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      Got a question? Get answers from mentors.
    </Flex>
  );
}

function ButtonMatch() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/when?match");
  };

  return (
    <Button
      onClick={handleClick}
      backgroundColor="#FFD29B"
      _hover={{ bg: "#f5c68c" }}
      variant="solid"
      borderRadius="50px"
      fontSize="xl"
      height="70px"
      width="200px"
      whiteSpace="normal"
      m={2}
      _active={{
        bg: "#f7c17e",
        // transform: "scale(0.98)",
        // borderColor: "#bec3c9",
      }}
    >
      Match me with someone
    </Button>
  );
}

function ButtonViewPeople() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/when?view");
  };
  return (
    <Button
      onClick={handleClick}
      backgroundColor="#AAF0D1"
      _hover={{ bg: "#91e9c2" }}
      variant="solid"
      borderRadius="50px"
      fontSize="xl"
      height="70px"
      width="200px"
      whiteSpace="normal"
      _active={{
        bg: "#7ae7b6",
        // transform: "scale(0.98)",
        // borderColor: "#bec3c9",
      }}
      m={2}
    >
      View all people
    </Button>
  );
}

function SearchButtons() {
  const { question } = useSelector((state: RootState) => state.question);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    setButtonsVisible(question.length > 0);
  }, [question]);

  return (
    <AnimatePresence>
      {buttonsVisible && (
        <motion.div
          style={{ width: "100%", marginTop: 100 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Flex width="100%" height="100%" justifyContent="center">
            <ButtonMatch />
            <ButtonViewPeople />
          </Flex>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Home;
