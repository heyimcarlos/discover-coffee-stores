import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import cls from 'classnames';

import styles from '@style/Card.module.css';
// interfaces
import slugify from 'utils/slugify';
import { IPlace } from 'interfaces/IPlace';

type CardProps = {
  entity: IPlace;
};

const Card: React.FC<CardProps & { className: string }> = ({ entity }) => {
  console.log('entity', entity?.categories?.[0]?.icon);
  const categoryIcon = `${entity?.categories?.[0]?.icon?.prefix}120${entity?.categories?.[0]?.icon?.suffix}`;
  return (
    <Link href={`/coffee-store/${encodeURIComponent(slugify(entity?.name))}`}>
      <a className={styles.cardLink}>
        <div className={cls('glass', styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{entity?.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={
                entity?.photos?.length > 0
                  ? `${entity?.photos?.[0]?.prefix}260x160${entity?.photos?.[0]?.suffix}`
                  : 'https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_120.png'
              }
              alt='Coffee Store'
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

// Card.defaultProps = {
//   entity: {
//     name: 'Starbucks NYC',
//     fsq_id: '123',
//     // imgUrl: '/static/hero-image.png',
//   },
// };

export default Card;
