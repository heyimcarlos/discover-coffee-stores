import type React from 'react';
import type { NextPage, NextPageWithLayout } from 'next';
import type { AppProps } from 'next/app';

// These types will get injected to nextjs module. And importable from 'next' and 'next/app'.

// type extension
declare module 'next' {
  // still trying to decide which type is best for our generic types.
  // Record<string, unknown> -> Record type is recommended when we have a union type of keys. Record<gameTimeToday | gameTimeYesterday, number>
  // {[key: string]: unknown} -> Index signatures are recommended for generic types. {[key: string]: string}.
  // Type<T = {}> -> Empty Object type represents any value that's not a primitive value.
  type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    layout: React.FC<{ children: React.ReactNode }>;
  };
}

declare module 'next/app' {
  type AppPropsWithLayout<P = {}> = AppProps<P> & {
    Component: NextPageWithLayout;
  };
}
