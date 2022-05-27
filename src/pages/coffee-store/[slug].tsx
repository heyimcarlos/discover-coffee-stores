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
import cls from 'classnames';
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

const CoffeeStore: NextPageWithLayout<Props> = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpVote = () => {
    console.log('handleUpVote');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{coffeeStore.name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={coffeeStore.imgUrl}
              className={styles.storeImg}
              alt={coffeeStore.name}
              width={600}
              height={360}
            />
          </div>
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/place.svg' alt={coffeeStore.address} width='24' height='24' />
            <p className={styles.text}>{coffeeStore.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/nearMe.svg'
              alt={coffeeStore.neighbourhood}
              width='24'
              height='24'
            />
            <p className={styles.text}>{coffeeStore.neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/star.svg' alt={'rating'} width='24' height='24' />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpVote}>
            Up vote!
          </button>
        </div>
      </div>
      {/* <Link scroll={false} href='/'></Link> */}
    </div>
  );
};

type Params = {
  slug: string;
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
