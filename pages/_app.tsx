import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import Layout from '../src/flat/Layout';

interface MyAppProps {
  children: JSX.Element;
}

function MyApp({ children }: MyAppProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    // force light mode
    if (colorMode != "light") {
      toggleColorMode();
    }
  }, []);

  return children;
}

function AppWrapper({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MyApp>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MyApp>
    </ChakraProvider>
  );
}

export default AppWrapper;
