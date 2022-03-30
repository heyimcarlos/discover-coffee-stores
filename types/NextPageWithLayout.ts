import type { NextPage } from 'next';
import type { ReactElement, ReactNode, FC } from 'react';

// type extension
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: FC;
};

export default NextPageWithLayout;
