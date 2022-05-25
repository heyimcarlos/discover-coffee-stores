import React from 'react';
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPageWithLayout,
} from 'next';
import Head from 'next/head';
import slugify from 'utils/slugify';
import Image from 'next/image';
import Link from 'next/link';
// hooks
import { useRouter } from 'next/router';
// layout
import AppLayout from '@component/layouts/AppLayout';
//JSON
import coffeeStoresDummyData from '@data/coffee-stores.json';
// types
import ICoffeeStore from 'interfaces/ICoffeeStore';
// styles
import styles from '@style/coffee-store.module.css';

type Props = {
  coffeeStore: ICoffeeStore;
};

type Params = {
  slug: string;
};

const CoffeeStore: NextPageWithLayout<Props> = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      <div className={styles.col1}>
        <Link href='/'>
          <a className={styles.backToHomeLink}>Back to home</a>
        </Link>
        <p>{coffeeStore.name}</p>
        <Image src={coffeeStore.imgUrl} alt={coffeeStore.name} width={600} height={360} />
      </div>
      <div className={styles.col2}>
        <p>{coffeeStore.address}</p>
        <p>{coffeeStore.neighbourhood}</p>
        <p>{coffeeStore.websiteUrl}</p>
      </div>
      <Link scroll={false} href='/'></Link>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<Props>> => {
  const { slug } = params as Params;

  const coffeeStore = coffeeStoresDummyData.find(
    coffeeStore => slugify(coffeeStore.name) === slug
  ) as ICoffeeStore; // we do the type assertion to avoid the | undefined being inferred and tell typescript to consider the result to be type ICoffeeStore everytime.

  return {
    props: {
      coffeeStore,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async ({}: GetStaticPathsContext): Promise<
  GetStaticPathsResult<Params>
> => {
  const paths = coffeeStoresDummyData.map((coffeeStore: ICoffeeStore) => {
    return {
      params: { slug: slugify(coffeeStore.name) },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

CoffeeStore.layout = AppLayout;

export default CoffeeStore;
