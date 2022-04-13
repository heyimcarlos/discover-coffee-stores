import type { AppPropsWithLayout } from 'next/app';
// components
import { Fragment } from 'react';
// styles
import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // if Component.getLayout is different than null | undefined. run.
  // const getLayout = Component.getLayout ?? (page => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <div>
      {/* {getLayout(<Component {...pageProps} />)} */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
