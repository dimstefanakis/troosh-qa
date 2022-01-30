import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";

function SplashScreen() {
  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Image h="50px" w="50px" borderRadius="100px" src="/logo_new.png" />
    </Flex>
  );
}

export default SplashScreen;
