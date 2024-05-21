import { type Session } from "next-auth";
import { type AppType } from "next/app";

import { trpc } from "@/utils/api";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Component {...pageProps} />
  );
};

export default trpc.withTRPC(MyApp);
