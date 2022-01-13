import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface PersonProps {
  icon: string;
  name: string;
  description: string;
  id: any;
}

interface ExpertiseProps {
  expertise: string;
}

let askedQuestions = [
  "Can I work out every day? Had an injury x months ago.",
  "Are squats and lunges bad for my knees?",
  "I am 16 yo male, how often should I rest?",
  "I've been to the gym maybe six times now since I applied in december, and I've noticed that my muscles arent sore anymore after the gym the day after, like they use to be when I exercise. Is that normal?",
];

const mockDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              porttitor enim eget nisi accumsan, ut faucibus massa auctor. Ut a
              pharetra quam, quis pulvinar lacus.`;

const mockImage =
  "https://i1.sndcdn.com/avatars-jj6SNokXHSlLGjyD-TyGfCg-t500x500.jpg";

function Profile() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Person
        id={id}
        name="Name"
        icon={mockImage}
        description={mockDescription}
      />
      <Box mt="80px">
        <Expertise expertise="Fitness Expert" />
        <CommonQuestions />
      </Box>
    </>
  );
}

function Person({ icon, name, description, id }: PersonProps) {
  return (
    <Box
      marginBottom="40px"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Flex>
        <Image
          src={icon}
          maxW="100px"
          maxH="100px"
          alt=""
          borderRadius="100px"
          marginRight="20px"
          border="2px solid black"
        />
        <Flex flexDirection="column">
          <Flex fontSize="xl" color="#565656" fontWeight="700">
            {name}
          </Flex>
          <Flex fontSize="lg" marginTop={2} color="#565656">
            {description}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

function Expertise({ expertise }: ExpertiseProps) {
  return (
    <>
      <Flex width="100%">
        <Flex fontSize="xl" color="#565656" fontWeight="700">
          Expertise
        </Flex>
      </Flex>

      <Flex width="100%">
        <Box
          backgroundColor="#FFD29B"
          borderRadius="100px"
          border="2px solid #000000"
          marginTop="16px"
        >
          <Text
            borderRadius="100%"
            paddingY="8px"
            paddingX="20px"
            fontSize="15px"
            fontWeight="600"
          >
            {expertise}
          </Text>
        </Box>
      </Flex>
    </>
  );
}

function CommonQuestions() {
  return (
    <>
      <Flex width="100%" marginTop="20px">
        <Flex fontSize="xl" color="#565656" fontWeight="700">
          Common Questions
        </Flex>
      </Flex>
      <Flex flexFlow="row wrap" justifyContent="space-between">
        {askedQuestions.map((item, index) => {
          return (
            <Flex key={index}>
              <Flex
                backgroundColor="#FFD29B"
                borderRadius="20px"
                marginTop="16px"
                border="2px solid #FFD29B"
              >
                <Text
                  borderRadius="100%"
                  paddingY="8px"
                  paddingX="20px"
                  fontSize="15px"
                  fontWeight="600"
                  width="100%"
                >
                  {item}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
}

export default Profile;
