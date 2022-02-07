import { Flex } from "@chakra-ui/react";
import Header from "../Header";
import Navigator from '../../features/Navigator';
interface LayoutProps {
  children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Flex
        w="100%"
        justifyContent="center"
        alignItems="center"
        flexFlow="column"
        paddingTop="120px"
        paddingBottom="60px"
        px={3}
      >
        <Flex
          w="100%"
          maxW="660px"
          justifyContent="center"
          alignItems="center"
          flexFlow="column"
        >
          <Navigator/>
          {children}
        </Flex>
      </Flex>
    </>
  );
}

export default Layout;
