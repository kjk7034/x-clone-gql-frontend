"use client";

import { SessionProvider } from "next-auth/react";
import ApolloWrapper from "./ApolloWrapper";
import { Session } from "next-auth";

export default function Providers({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
}>) {
  return (
    <SessionProvider session={session}>
      <ApolloWrapper>{children}</ApolloWrapper>
    </SessionProvider>
  );
}
