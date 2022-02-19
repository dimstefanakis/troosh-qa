import { Flex, Box, Text, Stack, Input, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import HeaderMenu from "./Menu";
import useWindowScroll from "../../hooks/useWindowScroll";

function Header() {
  const router = useRouter();
  const scroll = useWindowScroll();

  return (
    <Flex
      zIndex="10"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="80px"
      alignItems="center"
      transition="all 0.2s"
      px={{base: '20px', md: '60px'}}
      backgroundColor={scroll > 0 ? "#AAF0D1" : "transparent"}
    >
      <Flex
        onClick={() => router.push("/")}
        alignItems="center"
        cursor="pointer"
      >
        <Image src="/logo_new.png" height="40px" borderRadius="100px" alt="" />
        <Text ml={3} fontWeight="bold" fontSize="xl">
          Troosh QA
        </Text>
      </Flex>
      <Box flex="1"></Box>
      <HeaderMenu/>
    </Flex>
  );
}

export default Header;
