import { ChakraProvider } from "@chakra-ui/react";
import Footer from "components/footer";

import { AppProps } from "next/app";

import { Header } from "../components/header";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;
