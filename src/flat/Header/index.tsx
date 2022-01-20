import { Flex, Box, Text, Stack, Input, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useWindowScroll from "../../hooks/useWindowScroll";

function Header() {
  const router = useRouter();
  const scroll = useWindowScroll();

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="80px"
      alignItems="center"
      transition="all 0.2s"
      backgroundColor={scroll > 0 ? "#AAF0D1" : "transparent"}
    >
      <Image
        src="/logo_new.png"
        height="40px"
        borderRadius="100px"
        cursor="pointer"
        ml="60px"
        onClick={() => router.push("/")}
        alt=""
      />
    </Flex>
  );
}

export default Header;
