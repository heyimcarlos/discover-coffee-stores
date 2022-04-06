import type { AppPropsWithLayout } from 'next/app';
import { Fragment } from 'react';
import '../styles/globals.css';

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
