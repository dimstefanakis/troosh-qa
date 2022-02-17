import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Flex, Button, Image, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import QuestionInput from "../src/features/QuestionInput";
import ProgressBar from "../src/features/ProgressBar";
import { RootState } from "../src/store";
import { setStep } from "../src/features/Progress/progressSlice";
import getCharactersLeft from "../src/utils/getCharactersLeft";
import styles from "../styles/Home.module.css";
import { useMediaQuery } from "@chakra-ui/react";
import useAcceptInvitationMutation from "../src/hooks/useAcceptInvitationMutation";

interface SearchButtonsProps {
  questionInputRef: React.RefObject<HTMLTextAreaElement>;
}

interface ExploreButtonProps {
  questionInputRef: React.RefObject<HTMLTextAreaElement>;
}

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const { qiid, accept } = router.query;
  const acceptInvitation = useAcceptInvitationMutation(qiid);
  const questionInputRef = useRef<HTMLTextAreaElement>(null);
  const { question } = useSelector((state: RootState) => state.question);

  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");

  useEffect(() => {
    dispatch(setStep(0));
  }, []);

  useEffect(() => {
    if (qiid && accept == "true") {
      acceptInvitation.mutate();
    }
  }, [qiid]);

  useEffect(() => {
    if (qiid && acceptInvitation.isSuccess) {
      toast({
        title: "Invitation accepted!",
        description: 'You will now appear as "available" for this question!',
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [acceptInvitation.isSuccess, qiid]);

  return (
    <>
      {isSmallerThan767 ? "" : <ProgressBar />}
      <Flex justifyContent="center">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <QuestionHeader />
          <QuestionInput questionInputRef={questionInputRef} />
          <SearchButtons questionInputRef={questionInputRef} />
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

function ExploreButton({ questionInputRef }: ExploreButtonProps) {
  const router = useRouter();
  const toast = useToast();
  const { question } = useSelector((state: RootState) => state.question);

  const handleClick = () => {
    if (question.body.length >= 30) {
      router.push("/when?view");
    } else {
      toast({
        description: getCharactersLeft(question),
      });
      questionInputRef.current?.focus();
    }
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
      Explore mentors
    </Button>
  );
}

function SearchButtons({ questionInputRef }: SearchButtonsProps) {
  const { question } = useSelector((state: RootState) => state.question);
  const [directToError, setDirectToError] = useState(false);

  useEffect(() => {
    setDirectToError(question.body.length >= 30);
  }, [question]);

  return (
    <Flex width="100%" height="100%" justifyContent="center" mt="30px">
      <ExploreButton questionInputRef={questionInputRef} />
    </Flex>
  );
}

export default Home;
