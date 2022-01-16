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
import { RootState } from "../../src/store";


function Page4() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(loading);
  }, [loading]);
  return (
    <>
      <WhenHeader />
      <NowAnswer loading={loading} setLoading={setLoading} />
      {/* <LaterAnswer /> */}
      {loading == false ? <LaterAnswer /> : <NowSearch />}
    </>
  );
}

function WhenHeader() {
  return (
    <Flex
      fontSize="3xl"
      maxWidth="400px"
      height="25%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      fontWeight="700"
    >
      When do you need an answer?
    </Flex>
  );
}

const ApiPost = (quest:any) => {
  
  axios
  .post(
    `${process.env.API_URL}/v1/ask_question/`,
    JSON.stringify({ body: quest })
    )
    .then((res) => {
      console.log(res.data);
    });
};
function NowAnswer({ loading, setLoading }: any) {
  const handleClick = () => {
    // setLoading = "true"? "false" : "false"
    setLoading(!loading);
    // console.log(loading);
  };

  const { question } = useSelector((state: RootState) => state.question);
  const onClick = () => {

    ApiPost(question);
    handleClick();
  };
  return (
    <Flex marginTop="250px">
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
      <Flex marginTop="35px">
        <Flex width="100%">
          <Button
            onClick={ApiPost}
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
            {" "}
            6 hours from now
          </Button>
        </Flex>
        <Flex width="100%">
          <Button
            onClick={ApiPost}
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
            {" "}
            12 hours from now
          </Button>
        </Flex>
        <Flex width="100%">
          <Button
            onClick={ApiPost}
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
            {" "}
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

export default Page4;
