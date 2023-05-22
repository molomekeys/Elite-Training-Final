import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

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
      <main className="flex "> 
      <Layout>  
      <Component {...pageProps} />
      </Layout>
      </main>

    </SessionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
