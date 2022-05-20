import Image from 'next/image';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';
import cls from 'classnames';

import styles from '@style/Card.module.css';

type CardProps = {
  name: string;
  imgUrl: string;
  slug: string;
};

const Card: React.FC<CardProps & { className: string }> = props => {
  return (
    <Link href={`/coffee-store/${encodeURIComponent(props.slug)}`}>
      <a className={styles.cardLink}>
        <div className={cls('glass', styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imgUrl}
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
  name: 'Starbucks NYC',
  slug: 'starbucks-nyc',
  imgUrl: '/static/hero-image.png',
};

export default Card;
