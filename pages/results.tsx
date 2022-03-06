import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Button } from "@chakra-ui/button";
import { Flex, Image, Text, Box, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ResultsSkeleton from "../src/flat/ResultsSkeleton";
import ProgressBar from "../src/features/ProgressBar";
import { setStep } from "../src/features/Progress/progressSlice";
import PrimaryButton from "../src/flat/PrimaryButton";
import TextLoader from "../src/flat/TextLoader";
import { RootState } from "../src/store";
import axios from "axios";
import { useMediaQuery } from "@chakra-ui/react";

interface MentorProps {
  icon: string;
  name: string;
  expertise: string;
  expertiseFields: string[];
  description: string;
  id: number;
}

interface NoResultsFoundThisTimeProps {
  availableOnOtherTimes: number;
}

function Results() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");

  const [status, setStatus] = useState(null);
  const [isWeak, setIsWeak] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(
    null
  );

  const { question } = useSelector((state: RootState) => state.question);
  // question.answer_needed_now
  if (!question.body) {
    router.push("/");
  }

  const query = useQuery(
    ["getQuestionAvailableMentors", question.id, selectedExpertise],
    async () => {
      if (question.id) {
        try {
          let url;
          if (selectedExpertise) {
            url = `${process.env.NEXT_PUBLIC_API_URL}/v1/check_available_coaches_for_question/${question.id}/?expertise=${selectedExpertise}`;
          } else {
            url = `${process.env.NEXT_PUBLIC_API_URL}/v1/check_available_coaches_for_question/${question.id}/`;
          }
          let response = await axios.get(url);
          setIsWeak(response.data.is_weak);
          setStatus(response.data.status);
          return response.data;
        } catch (e) {
          console.error(e);
        }
      }
    },
    {
      // only enable auto refreshing if mentors are dynamically fetched
      // this only happens in the "now" case
      refetchInterval:
        !question.answer_needed_now || isWeak || status == "error" ? 0 : 5000,
    }
  );

  useEffect(() => {
    dispatch(setStep(1));
  }, []);

  console.log("query", query.data);
  return (
    <Box w="100%">
      {isSmallerThan767 ? "" : <ProgressBar />}
      <QuestionHeader
        expertise={query.data?.expertise}
        setSelectedExpertise={setSelectedExpertise}
      />
      {(!query.data || query.data.available_coaches.length == 0) &&
      !isWeak &&
      question.answer_needed_now ? (
        <Flex mt="90px" justifyContent="center" alignItems="center">
          <TextLoader>
            Looking for immediately available mentors. This might take a few
            minutes...
          </TextLoader>
        </Flex>
      ) : (
        question.answer_needed_now &&
        query.data?.is_weak && (
          <Flex flexFlow="column" alignItems="center" mt="90px">
            <WeakResults />
            <AskAnotherQuestion />
          </Flex>
        )
      )}
      {(query.isLoading || !query.data) && !question.answer_needed_now ? (
        <Flex
          width="100%"
          justifyContent="center"
          alignItems="center"
          mt="90px"
        >
          <ResultsSkeleton />
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" flexFlow="column">
          <Flex
            justifyContent="center"
            alignItems="center"
            maxWidth="500px"
            textAlign="center"
            color="gray.600"
            fontSize="xl"
            mb={20}
          >
            {!question.answer_needed_now ? (
              query.data.available_on_other_times > 0 &&
              query.data.available_coaches.length == 0 ? (
                <Flex flexFlow="column" alignItems="center" mt="90px">
                  <NoResultsFoundThisTime
                    availableOnOtherTimes={query.data.available_on_other_times}
                  />
                  <ChooseAnotherTime />
                </Flex>
              ) : query.data.status == "error" ? (
                <Flex flexFlow="column" alignItems="center" mt="90px">
                  <CouldntProcessQuestion />
                  <AskAnotherQuestion />
                </Flex>
              ) : query.data.is_weak ? (
                <Flex flexFlow="column" alignItems="center" mt="90px">
                  <WeakResults />
                  <TryDifferentWording />
                </Flex>
              ) : /*query.data.available_coaches.length == 0 &&
                query.data.available_on_other_times == 0 ? (
                <Flex flexFlow="column" alignItems="center" mt="90px">
                  <CouldntFindAvailableMentors />
                  <ChooseAnotherTime />
                </Flex>
              ) :*/ null
            ) : null}
          </Flex>
          <Flex flexFlow="column" width="100%">
            {query.data?.available_coaches &&
              query.data?.available_coaches.length > 0 && (
                <Text textAlign="center" fontSize="xl" mb={10}>
                  Mentors found
                </Text>
              )}
            {query.data?.available_coaches.map((mentor: any) => {
              return (
                <React.Fragment key={mentor.surrogate}>
                  <Mentor
                    id={mentor.surrogate}
                    name={mentor.name}
                    expertise={mentor.expertise_field}
                    expertiseFields={mentor.expertise_fields}
                    icon={mentor.avatar}
                    description={mentor.bio}
                  />
                </React.Fragment>
              );
            })}
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

function Mentor({
  icon,
  name,
  expertise,
  expertiseFields,
  description,
  id,
}: MentorProps) {
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
            <Flex color="#565656" fontWeight="bold">
              <Text fontSize="xl">{name}</Text>
            </Flex>
            <HStack mb={4} mt={1}>
              {expertiseFields.map((expertiseField, i) => {
                return (
                  <Tag
                    size="lg"
                    fontWeight="bold"
                    backgroundColor="#AAF0D1"
                    color="black"
                    key={i}
                    borderRadius="full"
                    variant="solid"
                  >
                    {expertiseField}
                  </Tag>
                );
              })}
            </HStack>
            <Flex
              fontSize="md"
              marginTop={2}
              color="#565656"
              whiteSpace="pre-wrap"
            >
              {description}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

interface QuestionHeaderProps {
  expertise: string;
  setSelectedExpertise: React.Dispatch<React.SetStateAction<string | null>>;
}

function QuestionHeader({
  expertise,
  setSelectedExpertise,
}: QuestionHeaderProps) {
  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");
  const { question } = useSelector((state: RootState) => state.question);

  console.log("expertise", expertise);
  return (
    <Flex>
      <Text
        fontWeight="800"
        paddingX={isSmallerThan767 ? "20px" : "0px"}
        width="100%"
        fontSize="2xl"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        display="flex"
        flexFlow="row wrap"
      >
        We think your question is about{" "}
        {expertise ? (
          <Box display="inline-block">
            <Menu>
              <MenuButton
                as={Button}
                fontWeight="800"
                backgroundColor="#FFD29B"
                _hover={{ bg: "#f5c68c" }}
                variant="solid"
                fontSize="xl"
                whiteSpace="normal"
                m={2}
                _active={{
                  bg: "#f7c17e",
                }}
                rightIcon={<ChevronDownIcon />}
              >
                {expertise}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setSelectedExpertise("react")}>
                  React
                </MenuItem>
                <MenuItem onClick={() => setSelectedExpertise("django")}>
                  Django
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        ) : (
          // <Text p={3} borderRadius="10px" bg="#FFD29B" display="inline-block">
          //   {expertise}
          // </Text>
          "..."
        )}
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

function TryDifferentWording() {
  const router = useRouter();

  function onClick() {
    router.push("/");
  }
  return (
    <PrimaryButton onClick={onClick} width="max-content" mt={10}>
      Maybe try different wording
    </PrimaryButton>
  );
}

function WeakResults() {
  return (
    <Flex>
      <Text fontSize="xl" maxW="400px" textAlign="center">
        We couldn&apos;t fully process your question, the results might not be
        what you wanted
      </Text>
    </Flex>
  );
}

function CouldntProcessQuestion() {
  return (
    <Flex>
      <Text fontSize="xl" maxW="400px" textAlign="center">
        We could not process your question. Try rewording it!
      </Text>
    </Flex>
  );
}

function CouldntFindAvailableMentors() {
  return (
    <Flex>
      <Text fontSize="xl" maxW="400px" textAlign="center">
        We could not find any available mentors during this time!
      </Text>
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
