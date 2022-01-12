import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { chakra, Textarea, TextareaProps } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import styles from "../styles/Home.module.css";
import { Flex, Box, Text, Stack, Input, Button, Image } from "@chakra-ui/react";
// import QuestionInput from "../src/features/QuestionInput";

const Home: NextPage = () => {
  return (
    <>
      <Image src="/logo_new.png" ml="198px" mt="42px" height="50px" borderRadius="100px"/>
      <Flex justifyContent="center">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Header />
          <QuestionInput />
          <SearchButtons />
        </Flex>
      </Flex>
    </>
  );
};

function Header() {
  return (
    <Flex
      fontSize="3xl"
      marginTop="55px"
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

function QuestionInput() {
  return (
    <Flex marginTop="90px" width="100%" maxW="80%" fontSize="xl">
      <Textarea
        variant="unstyled"
        minH="unset"
        overflow="hidden"
        w="100%"
        resize="none"
        minRows={1}
        as={ResizeTextarea}
        placeholder="Is my deadlift form correct? How do I change a light bulb?"
        textAlign="center"
        size=""
      />
    </Flex>
  );
}

function ButtonMatch() {
  return (
    <Button
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

function SearchButtons() {
  return (
    <Flex
      width="100%"
      justifyContent="center"
      // alignItems={"center"}
      height="50%"
      marginTop="100px"
    >
      <ButtonMatch />
      <ButtonViewPeople />
    </Flex>
  );
}

export default Home;
