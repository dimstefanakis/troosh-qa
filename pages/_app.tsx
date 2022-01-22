import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Provider } from "react-redux";
import Layout from "../src/flat/Layout";
import { store } from "../src/store";

interface MyAppProps {
  children: JSX.Element;
}

const queryClient = new QueryClient();

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <ChakraProvider>
            <MyApp>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MyApp>
          </ChakraProvider>
        </Elements>
      </Provider>
    </QueryClientProvider>
  );
}

export default AppWrapper;
