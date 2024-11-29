'use client';

import { SessionProvider } from 'next-auth/react';
import ApolloWrapper from './ApolloWrapper';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ApolloWrapper>{children}</ApolloWrapper>
    </SessionProvider>
  );
}
