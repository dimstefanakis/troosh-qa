import { useRouter } from "next/router";
import { Box, Flex, Text, Heading } from "@chakra-ui/layout";

function Checkout() {
  const router = useRouter();
  const {status} = router.query;

  return (
    <Flex width="100%" justifyContent="center" flexFlow='column' textAlign="center">
      <Heading as="h1">
        {status == "success"
          ? "Thank you for your purchase!"
          : "Your order was canceled"}
      </Heading>
      <Text mt={10}>
        {status == "success"
          ? "You will shortly get an email with your zoom call. Don't forget to check your spam / junk folders!"
          : "Feel free to ask another question or explore other mentors!"}
      </Text>
    </Flex>
  );
}

export default Checkout;
