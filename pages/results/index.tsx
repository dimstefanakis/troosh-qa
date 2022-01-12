import { Flex, Image, Text, Box } from "@chakra-ui/react";

function Match({ icon, name, expertise, description }: any) {
  return (
    <>
      <QuestionChoice />
      <People name="Solo Bolo" expertise="heyaasdasd" />
      <People name="Solo Bolo" expertise="heyaasdasd" />
    </>
  );
}

function People({ icon, name, expertise, description }: any) {
  return (
    <>
      <Box
        marginBottom="40px"
        maxWidth="600px"
        height="25%"
        justifyContent="center"
        alignItems="center"
      >
        <Flex>
          <Image
            src="https://i1.sndcdn.com/avatars-jj6SNokXHSlLGjyD-TyGfCg-t500x500.jpg"
            maxW="70px"
            maxH="70px"
            alt=""
            borderRadius="256px"
            marginRight="20px"
          />
          <Flex flexDirection="column">
            <Flex fontSize="18px" color="#565656" fontWeight="normal">
              {name}
            </Flex>
            <Flex fontSize="25px" fontWeight="normal">
              {expertise}
            </Flex>
            <Flex maxW="400px" fontSize="20px" marginTop="10px" color="#565656">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              euismod tellus non consectetur scelerisque.
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

function QuestionChoice() {
  return (
    <Flex>
      <Text
        marginBottom="90px"
        fontWeight="800"
        fontSize="4xl"
        marginTop="170px"
        maxWidth="450px"
        height="25%"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        Can someone show me if my deadlift form is good?
      </Text>
    </Flex>
  );
}

export default Match;
