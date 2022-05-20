import React from 'react';
// styles
import styles from '@style/Banner.module.css';

interface BannerProps {
  buttonText: string;
  handleOnClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ buttonText, handleOnClick }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.titleOne}>Coffee</span>
        <span className={styles.titleTwo}>Connoisseur</span>
      </h1>

      <p className={styles.subtitle}>Discover your local coffee shops!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
