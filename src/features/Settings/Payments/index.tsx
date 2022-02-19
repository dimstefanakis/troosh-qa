import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flex, Text, Heading } from "@chakra-ui/layout";
import { Link as ChakraLink } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../flat/PrimaryButton";
import { RootState } from "../../../store";
import useGetStripeOnboardLink from "./hooks/useGetStripeOnboardLink";
import useGetStripeLoginLink from "./hooks/useGetStripeLoginLink";
import useGetStripeBalance from "./hooks/useGetStripeBalance";

function Payments() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.authentication);
  const query = useGetStripeOnboardLink();
  const balanceQuery = useGetStripeBalance(user);
  const stripeLoginQuery = useGetStripeLoginLink(user);

  let text =
    "Troosh uses Stripe to get you paid quickly and keep your personal and payment information secure. Thousands of companies around the world trust Stripe to process payments for their users. Set up a Stripe account to get paid with Troosh.";

  function onSetupClick() {
    if (query.isSuccess) {
      // redirect to stripe onboarding screen
      router.push(query.data.url);
    }
  }

  function onStripeDirectClick() {
    if (stripeLoginQuery.isSuccess) {
      // redirect to stripe balance screen
      router.push(query.data.url);
    }
  }

  return (
    <Flex>
      {user.coach.charges_enabled ? (
        <Flex flexFlow="column">
          <Text>Balance</Text>
          {balanceQuery.data ? (
            <>
              <Heading as="h3" mt={4}>
                {balanceQuery.data.available}€
              </Heading>
              <Text fontSize="sm" color="gray">
                {balanceQuery.data.pending}€ (available in 7 days)
              </Text>
              <Flex mt={6} onClick={onStripeDirectClick}>
                <PrimaryButton>Get paid</PrimaryButton>
              </Flex>
            </>
          ) : null}
        </Flex>
      ) : (
        <Flex flexFlow="column">
          <Text>{text}</Text>
          <PrimaryButton
            isLoading={query.isLoading}
            onClick={onSetupClick}
            margin="20px 0"
          >
            Setup payments
          </PrimaryButton>
        </Flex>
      )}
    </Flex>
  );
}

export default Payments;
