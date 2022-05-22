import Image from 'next/image';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';
import cls from 'classnames';

import styles from '@style/Card.module.css';
// interfaces
import ICoffeeStore from 'interfaces/ICoffeeStore';
import slugify from 'utils/slugify';

type CardProps = {
  coffeeStore: ICoffeeStore;
};

const Card: React.FC<CardProps & { className: string }> = ({ coffeeStore }) => {
  return (
    <Link href={`/coffee-store/${encodeURIComponent(slugify(coffeeStore?.name))}`}>
      <a className={styles.cardLink}>
        <div className={cls('glass', styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{coffeeStore.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={coffeeStore.imgUrl}
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

Card.defaultProps = {
  coffeeStore: {
    name: 'Starbucks NYC',
    imgUrl: '/static/hero-image.png',
  },
};

export default Card;
