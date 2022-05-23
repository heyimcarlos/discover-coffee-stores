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
// hooks
import { useRouter } from 'next/router';
// components
import Link from 'next/link';
// layout
import AppLayout from '@component/layouts/AppLayout';

//JSON
import coffeeStoresDummyData from '@data/coffee-stores.json';
import ICoffeeStore from 'interfaces/ICoffeeStore';
import { ParsedUrlQuery } from 'querystring';
import slugify from 'utils/slugify';
import Head from 'next/head';

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
    <div>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      <p>{coffeeStore.name}</p>
      <p>{coffeeStore.address}</p>
      <p>{coffeeStore.neighbourhood}</p>
      <p>{coffeeStore.websiteUrl}</p>
      <Link scroll={false} href='/'>
        <a>
          <button>Back to home</button>
        </a>
      </Link>
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
