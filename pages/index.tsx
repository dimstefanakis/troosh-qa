import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Flex, Button, Image, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import QuestionInput from "../src/features/QuestionInput";

interface SearchButtonsProps {
  question: string;
}

interface ButtonMatchProps {
  question: string;
}

const Home: NextPage = () => {
  const [question, setQuestion] = useState("");

  return (
    <>
      <Flex justifyContent="center">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <QuestionHeader />
          <QuestionInput />
          <SearchButtons question={question} />
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
      Got a question? Get live answers.
    </Flex>
  );
}

function ButtonMatch({ question }: ButtonMatchProps) {
  const handleClick = () => {
    console.log(question);
  };

  return (
    <LinkBox>
      <LinkOverlay href="/results">
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
      </LinkOverlay>
    </LinkBox>
  );
}

function ButtonViewPeople() {
  return (
    <Button
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

function SearchButtons({ question }: SearchButtonsProps) {
  return (
    <Flex
      width="100%"
      justifyContent="center"
      // alignItems={"center"}
      height="50%"
      marginTop="100px"
    >
      <ButtonMatch question={question} />
      <ButtonViewPeople />
    </Flex>
  );
}

export default Home;
