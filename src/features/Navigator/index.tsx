import { useRouter } from "next/router";
import { Flex, Text, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { ChevronLeftIcon } from "@chakra-ui/icons";

function Navigator() {
  const router = useRouter();

  let backText = "";
  let previousDestination = "/";

  if (router.pathname.startsWith("/mentor")) {
    backText = "Back to mentor list";
    previousDestination = "/results";
  } else if (router.pathname.startsWith("/when")) {
    backText = "Ask a question";
    previousDestination = "/";
  } else if (router.pathname.startsWith("/results")) {
    backText = "Choose time";
    previousDestination = "/when";
  } else {
    backText = "";
    previousDestination = "/";
  }

  function onClick() {
    if (!previousDestination) {
      router.push(previousDestination);
    } else {
      router.back();
    }
  }

  return (
    <Flex width="100%" opacity={router.pathname === "/" ? 0 : 1} mb={2}>
      <Button
        leftIcon={<ChevronLeftIcon />}
        variant="unstyled"
        display="flex"
        onClick={onClick}
      >
        {backText}
      </Button>
    </Flex>
  );
}

export default Navigator;
