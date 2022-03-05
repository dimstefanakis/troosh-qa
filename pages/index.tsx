import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Flex, Button, Text, Heading } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
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

interface HomeProps {
  seo: any;
}

const Home = ({ seo }: HomeProps) => {
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
      <Head>
        <title>Troosh QA</title>
        <meta
          name="description"
          content="Troosh QA. Find people to debug with you!"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="questions.troosh.app" />
        <meta property="twitter:url" content="https://questions.troosh.app/" />
        <meta name="twitter:title" content={seo.twitterTitle} />
        <meta name="twitter:description" content={seo.twitterDescription} />
        <meta name="twitter:image" content={seo.twitterImage} />

        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      maxWidth="600px"
      height="25%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      {/* <Heading fontSize="3xl">
        Got a question?
        <br /> Get answers from{" "}
        <Popover trigger="hover">
          <PopoverTrigger>
            <Text
              display="inline-block"
              px={3}
              py={2}
              mt={3}
              borderRadius="10px"
              backgroundColor="#FFD29B"
              cursor="pointer"
            >
              mentors
            </Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody fontSize="md" fontWeight="medium">
              We currently support mentors in the following fields:{" "}
              <Text as="b">software development / fitness</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Heading> */}
      <Heading fontSize="3xl">Find people to debug with you</Heading>
    </Flex>
  );
}

function ExploreButton({ questionInputRef }: ExploreButtonProps) {
  const router = useRouter();
  const toast = useToast();
  const { question } = useSelector((state: RootState) => state.question);

  const handleClick = () => {
    if (question.body.length >= 30) {
      router.push("/when");
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

export async function getStaticProps() {
  return {
    props: {
      seo: {
        twitterTitle: "Troosh QA",
        twitterDescription: "Troosh QA. Find people to debug with you!",
        twitterImage: "https://questions.troosh.app/logo_new.png",
      },
    },
  };
}

export default Home;
