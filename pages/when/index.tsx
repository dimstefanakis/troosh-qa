import {
  Flex,
  Image,
  Text,
  Box,
  LinkBox,
  LinkOverlay,
  Button,
} from "@chakra-ui/react";

function Page4() {
  return (
    <>
      <WhenHeader />
      <NowAnswer />
      <LaterAnswer />
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

function NowAnswer() {
  return (
    <Flex marginTop="250px">
      <Button
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

export default Page4;
