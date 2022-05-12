import React from 'react';
import Head from 'next/head';
// components
import Footer from '@components/Footer';

export type AppLayoutProps = {
  title?: string;
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children, title = 'Discover Coffee Stores' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      {/* <div>Header</div> */}
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
