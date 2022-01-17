import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Flex, Image, Text, Box, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { setStep } from "../src/features/Progress/progressSlice";


interface PersonProps {
  icon: string;
  name: string;
  expertise: string;
  description: string;
  id: number;
}

const mockDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              porttitor enim eget nisi accumsan, ut faucibus massa auctor. Ut a
              pharetra quam, quis pulvinar lacus.`;
const mockImage =
  "https://i1.sndcdn.com/avatars-jj6SNokXHSlLGjyD-TyGfCg-t500x500.jpg";

function Match() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStep(2));
  }, []);

  return (
    <>
      <QuestionChoice />
      <Person
        id={1}
        name="Solo Bolo"
        expertise="heyaasdasd"
        icon={mockImage}
        description={mockDescription}
      />
      <Person
        id={2}
        name="Soloooo Bolo"
        expertise="heyaasdasd"
        icon={mockImage}
        description={mockDescription}
      />
    </>
  );
}

function Person({ icon, name, expertise, description, id }: PersonProps) {
  const router = useRouter();

  function onPersonClick() {
    router.push(`/mentor/${id}`);
  }
  return (
    <>
      <Box
        onClick={onPersonClick}
        marginBottom="40px"
        width="100%"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
      >
        <Flex>
          <Image
            src={icon}
            maxW="70px"
            maxH="70px"
            alt=""
            borderRadius="100px"
            marginRight="20px"
          />
          <Flex flexDirection="column">
            <Flex fontSize="lg" color="#565656" fontWeight="normal">
              {name}
            </Flex>
            <Flex fontSize="2xl" fontWeight="normal">
              {expertise}
            </Flex>
            <Flex fontSize="xl" marginTop={2} color="#565656">
              {description}
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
