import {
  Flex,
  Image,
  Text,
  Box,
  LinkBox,
  LinkOverlay,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../src/store";
import ProgressBar from "../src/features/ProgressBar";

function WhenPage() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ProgressBar />
      <WhenHeader />
      <NowAnswer loading={loading} setLoading={setLoading} />
      {/* <LaterAnswer /> */}
      {loading == false ? <LaterAnswer /> : <NowSearch />}
    </>
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
        {question}
      </Text>
      <Text mt={20}>
        I need an answer
      </Text>
    </Flex>
  );
}

function NowAnswer({ loading, setLoading }: any) {
  const { question } = useSelector((state: RootState) => state.question);

  const onClick = () => {
    const formData = new FormData();
    formData.append("body", question);

    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/ask_question/`, formData)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <Flex mt={5}>
      <Button
        onClick={onClick}
        backgroundColor="#FFD29B"
        _hover={{ bg: "#f5c68c" }}
        variant="solid"
        borderRadius="50px"
        fontSize="l"
        height="45px"
        width="100px"
        whiteSpace="normal"
        m={2}
        _active={{
          bg: "#f7c17e",
          // transform: "scale(0.98)",
          // borderColor: "#bec3c9",
        }}
      >
        <Flex>Now</Flex>
      </Button>
    </Flex>
  );
}

function LaterAnswer() {
  return (
    <>
      <Flex mt={5}>
        <Flex width="100%">
          <Button
            // onClick={ApiPost}
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
              // transform: "scale(0.98)",
              // borderColor: "#bec3c9",
            }}
          >
            6 hours from now
          </Button>
        </Flex>
        <Flex width="100%">
          <Button
            // onClick={ApiPost}
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
              // transform: "scale(0.98)",
              // borderColor: "#bec3c9",
            }}
          >
            12 hours from now
          </Button>
        </Flex>
        <Flex width="100%">
          <Button
            // onClick={ApiPost}
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
              // transform: "scale(0.98)",
              // borderColor: "#bec3c9",
            }}
          >
            24 hours from now
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

function NowSearch() {
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
