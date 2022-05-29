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
// types
import { IPlace } from 'interfaces/IPlace';
// styles
import styles from '@style/coffee-store.module.css';
import { fetchPlaces } from 'lib/fetch-places';

type Props = {
  entity: IPlace;
};

const CoffeeStore: NextPageWithLayout<Props> = ({ entity }) => {
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
        <title>{entity.name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{entity.name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={
                'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
              }
              className={styles.storeImg}
              alt={entity.name}
              width={600}
              height={360}
            />
          </div>
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/place.svg'
              alt={entity?.location?.address}
              width='24'
              height='24'
            />
            <p className={styles.text}>{entity?.location?.formatted_address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/nearMe.svg'
              alt={entity?.location?.neighborhood}
              width='24'
              height='24'
            />
            <p className={styles.text}>{entity?.location?.neighborhood?.[0]}</p>
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

  const { results } = await fetchPlaces({
    categories: '13032,13033,13034,13035,13063,13036,11126',
    near: 'Santo Domingo',
    limit: 6,
  });

  const entity = results?.find(entity => slugify(entity.name) === slug) as IPlace;

  return {
    props: {
      entity,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async ({}: GetStaticPathsContext): Promise<
  GetStaticPathsResult<Params>
> => {
  const { results } = await fetchPlaces({
    categories: '13032,13033,13034,13035,13063,13036,11126',
    near: 'Santo Domingo',
    limit: 6,
  });

  const paths = results.map((entity: IPlace) => {
    return {
      params: { slug: slugify(entity.name) },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

CoffeeStore.layout = AppLayout;

export default CoffeeStore;
