import React, { useEffect } from "react";
import { Flex, Image, Text, Box } from "@chakra-ui/react";
import PrimaryButton from "../../../flat/PrimaryButton";
import SecondaryButton from "../../../flat/SecondaryButton";
import SkeletonLoader from "./SkeletonLoader";
import useGetInvitations from "./hooks/useGetInvitations";
import useRespondToInvitation from "./hooks/useRespondToInvitation";

interface InvitationProps {
  id: string;
  body: string;
  status: string;
  deliveryTime: string;
  answerNeededNow: boolean;
  created: string;
}

function InvitationTab() {
  const query = useGetInvitations();

  if (query.isLoading) {
    return <SkeletonLoader />;
  } else {
    return (
      <Flex flexFlow="column" width="100%">
        {query.data.map((data: any) => {
          return (
            <React.Fragment key={data.id}>
              <Invitation
                id={data.surrogate}
                body={data.question.body}
                status={data.status}
                answerNeededNow={data.question.answer_needed_now}
                created={data.question.created}
                deliveryTime={data.question.initial_delivery_time}
              />
            </React.Fragment>
          );
        })}
      </Flex>
    );
  }
}

function Invitation({
  id,
  body,
  deliveryTime,
  answerNeededNow,
  created,
  status,
}: InvitationProps) {
  const respondMutation = useRespondToInvitation(id);
  const query = useGetInvitations();
  let deliveryDate = new Date(answerNeededNow ? created : deliveryTime);
  const deliveryFormatted =
    ("0" + deliveryDate.getDate()).slice(-2) +
    "-" +
    ("0" + (deliveryDate.getMonth() + 1)).slice(-2) +
    "-" +
    deliveryDate.getFullYear() +
    " " +
    ("0" + deliveryDate.getHours()).slice(-2) +
    ":" +
    ("0" + deliveryDate.getMinutes()).slice(-2);

  function onAccept() {
    respondMutation.mutate({ response: "AC" });
  }

  function onDecline() {
    respondMutation.mutate({ response: "DC" });
  }

  useEffect(() => {
    if (respondMutation.isSuccess) {
      query.refetch();
    }
  }, [respondMutation.isSuccess]);

  return (
    <>
      <Flex mb={10}>
        <Text fontWeight="600" fontSize="lg">
          {body}
        </Text>
      </Flex>
      <Flex marginTop="10px" fontSize="sm">
        {answerNeededNow ? (
          <Flex flexFlow="column">
            <Text>
              Invitation by user sent at <Text as="b">{deliveryFormatted}</Text>
            </Text>
            <Text as="i" color="gray.600">
              Make sure to be available for at least 45 minutes.
            </Text>
          </Flex>
        ) : (
          <Text color="#999999" fontWeight="600">
            Zoom call at <Text as="b">{deliveryFormatted}</Text>
          </Text>
        )}
      </Flex>
      <Flex marginTop="20px" marginBottom="40px">
        {status != "PD" ? (
          <PrimaryButton
            borderRadius="26"
            fontSize="l"
            m="0"
            marginTop="10px"
            fontWeight="600"
            disabled
          >
            {status == "AC" ? "Accepted" : "Declined"}
          </PrimaryButton>
        ) : (
          <>
            <PrimaryButton
              borderRadius="26"
              fontSize="l"
              m="0"
              marginTop="10px"
              fontWeight="600"
              onClick={onAccept}
              isLoading={
                respondMutation.isLoading &&
                respondMutation.variables?.response === "AC"
              }
              disabled={
                respondMutation.isLoading &&
                respondMutation.variables?.response === "DC"
              }
            >
              Accept
            </PrimaryButton>
            <SecondaryButton
              borderRadius="26"
              fontSize="l"
              m="0"
              marginLeft="1"
              marginTop="10px"
              fontWeight="600"
              onClick={onDecline}
              isLoading={
                respondMutation.isLoading &&
                respondMutation.variables?.response === "DC"
              }
              disabled={
                respondMutation.isLoading &&
                respondMutation.variables?.response === "AC"
              }
            >
              Decline
            </SecondaryButton>
          </>
        )}
      </Flex>
    </>
  );
}

export default InvitationTab;
