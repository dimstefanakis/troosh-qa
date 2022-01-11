import { chakra, Textarea } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Flex, Box, Text, Stack, Input, Button, Image } from "@chakra-ui/react";
const Home: NextPage = () => {
  return (
    <>
      <Image src="/logo.png" ml="198px" mt="42px" height="50px"/>
      <Flex height="100vh" justifyContent="center">
        <Flex flexDirection="column" width="33%">
          <Header/>
          <QuestionInput/>
          <Buttons/>
        </Flex>
      </Flex>
    </>
  );
};

function Header(){
  return (
    <Flex
      fontSize="xxx-large"
      marginTop="55px"
      maxWidth="100%"
      height="25%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      Got a question? Get live answers.
    </Flex>
  );
}

function QuestionInput(){
  return (
    <Flex marginTop="90px" width="100%" fontSize="3xl">
      <Textarea
        textAlign="center"
        variant="unstyled"
        placeholder="Is my deadlift form correct? How do I change a light bulb?"
        size=""
      />
    </Flex>
  );
}

function ButtonMatch(){
  return (
    <Button
      backgroundColor="#FFD29B"
      variant="solid"
      borderRadius="256px"
      marginRight="24px"
      width="35%"
      height="15%"
      fontSize="xl"
      whiteSpace="normal"
    >
      Match me with someone
    </Button>
  );
}

function ButtonViewPeople(){
  return (
    <Button
      backgroundColor="#AAF0D1"
      variant="solid"
      borderRadius="256px"
      width="35%"
      height="15%"
      fontSize="xl"
    >
      View all people
    </Button>
  );
}

function Buttons(){
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
