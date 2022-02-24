import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Provider } from "react-redux";
import Layout from "../src/flat/Layout";
import SplashScreen from "../src/flat/SplashScreen";
import { getUserData } from "../src/features/Authentication/authenticationSlice";
import { RootState, store } from "../src/store";
import theme from '../src/theme';

interface MyAppProps {
  children: JSX.Element;
}

const queryClient = new QueryClient();

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function MyApp({ children }: MyAppProps) {
  const dispatch = useDispatch();
  const {loadingUserData} = useSelector((state: RootState)=>state.authentication);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    // force light mode
    if (colorMode != "light") {
      toggleColorMode();
    }
  }, [colorMode]);

  useEffect(()=>{
    dispatch(getUserData());
  }, [dispatch])

  return loadingUserData ? <SplashScreen/> : children;
}

function AppWrapper({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <ChakraProvider theme={theme}>
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
