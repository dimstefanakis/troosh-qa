import { useState, useEffect } from "react";
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import ProgressBar from "../../src/features/ProgressBar";
import axios from "axios";
import { setStep } from "../../src/features/Progress/progressSlice";
import CheckoutButton from "../../src/features/CheckoutButton";
import MentorProfileSkeleton from "../../src/flat/MentorProfileSkeleton";
import { useMediaQuery } from "@chakra-ui/react";

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

function Profile() {
  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");
  const [isSmallerThan700] = useMediaQuery("(max-width:700px)");

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data } = useQuery(["fetchMentor", id], () =>
    getMentor(id)
  );

  console.log("data", data);

  async function getMentor(id: any) {
    if (id) {
      try {
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/coaches/${id}/`
        );
        return response.data;
      } catch (e) {
        console.error(e);
      }
    }
  }

  useEffect(() => {
    dispatch(setStep(2));
  }, [id]);

  return data ? (
    <>
      {isSmallerThan767 ? "" : <ProgressBar />}
      <Person
        id={data.surrogate}
        name={data.name}
        icon={data.avatar}
        description={data.bio}
      />
      <Box width="100%">
        <CheckoutButton rate={data.qa_session_credit} mentor={data} />
      </Box>
      <Box mt="80px" minW="100%">
        <Expertise expertise={data.expertise_field} />
        <CommonQuestions questions={data.common_questions} />
      </Box>
    </>
  ) : (
    <>
      <ProgressBar />
      <MentorProfileSkeleton />
    </>
  );
}

function Person({ icon, name, description, id }: PersonProps) {
  const [isSmallerThan700] = useMediaQuery("(max-width:767px)");

  return (
    <Box
      marginBottom="40px"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Flex marginLeft={isSmallerThan700 ? "15px" : "0px"}>
        <Image
          src={icon}
          w="70px"
          h="70px"
          alt=""
          borderRadius="100px"
          marginRight="20px"
          border="2px solid black"
        />
        <Flex flexDirection="column">
          <Flex fontSize="xl" color="#565656" fontWeight="700">
            {name}
          </Flex>
          <Flex fontSize="lg" marginTop={2} color="#565656" whiteSpace="pre-wrap">
            {description}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

function Expertise({ expertise }: ExpertiseProps) {
  const [isSmallerThan700] = useMediaQuery("(max-width:767px)");

  return (
    <>
      <Flex width="100%" marginLeft={isSmallerThan700 ? "15px" : "0px"}>
        <Flex fontSize="xl" color="#565656" fontWeight="700">
          Expertise
        </Flex>
      </Flex>

      <Flex width="100%" marginLeft={isSmallerThan700 ? "15px" : "0px"}>
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

function CommonQuestions({ questions }: any) {
  const [isSmallerThan700] = useMediaQuery("(max-width:767px)");

  return (
    <>
      <Flex
        width="100%"
        marginTop="20px"
        marginLeft={isSmallerThan700 ? "15px" : "0px"}
      >
        <Flex fontSize="xl" color="#565656" fontWeight="700">
          Common Questions
        </Flex>
      </Flex>
      <Flex
        flexFlow="row wrap"
        justifyContent="space-between"
        marginLeft={isSmallerThan700 ? "15px" : "0px"}
      >
        {questions.map((item: any, index: number) => {
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
                  {item.body}
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
