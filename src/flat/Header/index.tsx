import { Flex, Box, Text, Stack, Input, Button, Image } from "@chakra-ui/react";

function Header() {
  return (
    <Box position="fixed" top="0" left="0">
      <Image
        src="/logo_new.png"
        ml="198px"
        mt="42px"
        height="50px"
        borderRadius="100px"
        alt=""
      />
    </Box>
  );
}

export default Header;
