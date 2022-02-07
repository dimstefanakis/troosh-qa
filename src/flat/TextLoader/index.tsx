import { Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

interface TextLoaderProps {
  children: JSX.Element | string;
}

function TextLoader({ children }: TextLoaderProps) {
  return (
    <Flex
      fontSize="2xl"
      color="#555555;"
      textAlign="center"
      flexFlow="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text maxW="80%">{children}</Text>
      <Spinner mt={10} size="xl" />
    </Flex>
  );
}

export default TextLoader;
