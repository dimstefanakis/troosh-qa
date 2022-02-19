import { useEffect } from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/layout";
import useGetStripeOnboardLink from "../src/features/Settings/Payments/hooks/useGetStripeOnboardLink";
import SplashScreen from "../src/flat/SplashScreen";

function Reauth() {
  const router = useRouter();
  const query = useGetStripeOnboardLink();

  useEffect(() => {
    if (query.isSuccess) {
      // redirect to stripe onboarding screen
      router.push(query.data.url);
    }
  }, [query.data]);

  return (
    <Flex
      w="100vw"
      h="100vh"
      position="fixed"
      top="0"
      left="0"
      bg="white"
      zIndex="12"
    >
      <SplashScreen />
    </Flex>
  );
}

export default Reauth;
