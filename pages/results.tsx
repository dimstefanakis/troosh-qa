import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Image, Text, Box, LinkBox, LinkOverlay } from "@chakra-ui/react";
import ResultsSkeleton from "../src/flat/ResultsSkeleton";
import ProgressBar from "../src/features/ProgressBar";
import { setStep } from "../src/features/Progress/progressSlice";
import PrimaryButton from "../src/flat/PrimaryButton";
import useGetQuestionAvailableMentors from "../src/features/Question/hooks/useGetQuestionAvailableMentors";
import { RootState } from "../src/store";
import axios from "axios";
import { useMediaQuery } from "@chakra-ui/react";

interface MentorProps {
  icon: string;
  name: string;
  expertise: string;
  description: string;
  id: number;
}

interface NoResultsFoundThisTimeProps {
  availableOnOtherTimes: number;
}

function Results() {
  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");
  const router = useRouter();
  const dispatch = useDispatch();
  const { question } = useSelector((state: RootState) => state.question);

  if (!question.body) {
    router.push("/");
  }

  const query = useQuery(
    ["getQuestionAvailableMentors", question.id],
    async () => {
      if (question.id) {
        try {
          let response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/check_available_coaches_for_question/${question.id}/`
          );
          return response.data;
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
      {isSmallerThan767 ? "" : <ProgressBar />}
      <QuestionHeader />
      {query.isLoading || !query.data ? (
        <ResultsSkeleton />
      ) : (
        <Flex justifyContent="center">
          {query.data.available_coaches.map((mentor: any) => {
            return (
              <React.Fragment key={mentor.surrogate}>
                <Mentor
                  id={mentor.surrogate}
                  name={mentor.name}
                  expertise={mentor.expertise_field}
                  icon={mentor.avatar}
                  description={mentor.bio}
                />
              </React.Fragment>
            );
          })}
          <Flex
            justifyContent="center"
            alignItems="center"
            maxWidth="500px"
            textAlign="center"
            color="gray.600"
            fontSize="xl"
          >
            {query.data.available_on_other_times > 0 &&
            query.data.available_coaches.length == 0 ? (
              <Flex flexFlow="column" alignItems="center">
                <NoResultsFoundThisTime
                  availableOnOtherTimes={query.data.available_on_other_times}
                />
                <ChooseAnotherTime />
              </Flex>
            ) : query.data.status == "error" ? (
              <Flex flexFlow="column" alignItems="center">
                <CouldntProcessQuestion />
                <AskAnotherQuestion />
              </Flex>
            ) : (
              query.data.is_weak && (
                <Flex flexFlow="column" alignItems="center">
                  <WeakResults />
                  <AskAnotherQuestion />
                </Flex>
              )
            )}
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

function Mentor({ icon, name, expertise, description, id }: MentorProps) {
  const router = useRouter();

  function onMentorClick() {
    router.push(`/mentor/${id}`);
  }
  return (
    <>
      <Box
        p={3}
        onClick={onMentorClick}
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

function QuestionHeader() {
  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");

  const { question } = useSelector((state: RootState) => state.question);

  return (
    <Flex>
      <Text
        marginBottom="90px"
        fontWeight="800"
        paddingX={isSmallerThan767 ? "20px" : "0px"}
        width="100%"
        fontSize="2xl"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {question.body}
      </Text>
    </Flex>
  );
}

function ChooseAnotherTime() {
  const router = useRouter();

  function onClick() {
    router.push("/when");
  }
  return (
    <PrimaryButton onClick={onClick} width="max-content" mt={10}>
      Choose another time
    </PrimaryButton>
  );
}

function AskAnotherQuestion() {
  const router = useRouter();

  function onClick() {
    router.push("/");
  }
  return (
    <PrimaryButton onClick={onClick} width="max-content" mt={10}>
      Ask another question
    </PrimaryButton>
  );
}

function WeakResults() {
  return (
    <Flex>
      <Text>
        We couldn't fully process your question, the results might not be what
        you wanted
      </Text>
    </Flex>
  );
}

function CouldntProcessQuestion() {
  return (
    <Flex>
      <Text>We could not process your question. Try rewording it!</Text>
    </Flex>
  );
}

function NoResultsFoundThisTime({
  availableOnOtherTimes,
}: NoResultsFoundThisTimeProps) {
  const { question } = useSelector((state: RootState) => state.question);
  // toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  let date = new Date(question.initial_delivery_time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <Flex>
      <Text>
        Couldn&apos;t find any available mentors at <Text as="b">{date}</Text>
      </Text>
    </Flex>
  );
}

export default Results;
