import { Flex, Box, Text, Stack, Input, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  return (
    <Box position="fixed" top="0" left="0">
      <Image
        src="/logo_new.png"
        ml="198px"
        mt="42px"
        height="50px"
        borderRadius="100px"
        cursor="pointer"
        onClick={()=>router.push('/')}
        alt=""
      />
    </Box>
  );
}

export default Header;
