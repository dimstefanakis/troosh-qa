import { Flex } from "@chakra-ui/react";

interface LayoutProps {
  children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      flexFlow="column"
    >
      <Flex
        w="100%"
        maxW="600px"
        justifyContent="center"
        alignItems="center"
        flexFlow="column"
      >
        {children}
      </Flex>
    </Flex>
  );
}

export default Layout;
