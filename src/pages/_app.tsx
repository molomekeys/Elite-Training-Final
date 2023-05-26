import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "~/layouts/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider>
    <SessionProvider session={session}>
    <Provider store={store}>

     <Layout>
      <Component {...pageProps} />
      </Layout>
      </Provider>


    </SessionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
