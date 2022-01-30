import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Image, Text, Box, LinkBox, LinkOverlay } from "@chakra-ui/react";
import ResultsSkeleton from "../src/flat/ResultsSkeleton";
import ProgressBar from "../src/features/ProgressBar";
import { setStep } from "../src/features/Progress/progressSlice";
import useGetQuestionAvailableMentors from "../src/features/Question/hooks/useGetQuestionAvailableMentors";
import { RootState } from "../src/store";
import axios from "axios";

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
  const {question} = useSelector((state:RootState)=>state.question);
  const query = useQuery(
    ["getQuestionAvailableMentors", question.id],
    async () => {
      if (question.id) {
        try {
          let response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/check_available_coaches_for_question/${question.id}/`
          );
          return response.data.available_coaches;
        } catch (e) {
          console.error(e);
        }
      }
    }
  );

  useEffect(() => {
    dispatch(setStep(1));
  }, []);

  return (
    <Box w="100%">
      <ProgressBar />
      <QuestionChoice />
      {query.isLoading || !query.data ? (
        <ResultsSkeleton />
      ) : (
        query.data.map((mentor: any) => {
          return (
            <React.Fragment key={mentor.surrogate}>
              <Person
                id={mentor.surrogate}
                name={mentor.name}
                expertise={mentor.expertise_field}
                icon={mentor.avatar}
                description={mentor.bio}
              />
            </React.Fragment>
          );
        })
      )}
    </Box>
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
        p={3}
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
  const {question} = useSelector((state: RootState)=>state.question);

  return (
    <Flex>
      <Text
        marginBottom="90px"
        fontWeight="800"
        width="100%"
        fontSize="4xl"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {question.body}
      </Text>
    </Flex>
  );
}

export default Match;
