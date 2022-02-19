import { useRouter } from "next/router";
import { Flex, Text, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const validPathNames = [
  '/mentor',
  '/results',
  '/when'
]

function Navigator() {
  const router = useRouter();

  let backText = "";
  let previousDestination = "/";

  if (router.pathname.startsWith("/mentor")) {
    backText = "Back to mentor list";
    previousDestination = "/results";
  } else if (router.pathname.startsWith("/when")) {
    backText = "Change question";
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

  const shouldShow = validPathNames.some((pathName) =>
    router.pathname.startsWith(pathName)
  );
  return (
    <Flex width="100%" opacity={shouldShow ? 1 : 0} mb={2} height="50px">
      <Button
        leftIcon={<ChevronLeftIcon />}
        variant="unstyled"
        display={shouldShow ? 'flex' : 'none'}
        onClick={onClick}
        disabled={!shouldShow}
      >
        {backText}
      </Button>
    </Flex>
  );
}

export default Navigator;
