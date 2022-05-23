import React from 'react';
// styles
import styles from '@style/home.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <small>© 2022 All Rights Reserved | Coffee Connoisseur</small>
      <Link href='https://github.com/renzik' target='_blank' rel='noopener noreferrer'>
        <a>
          <div className={styles.footerContent}>
            <span>Powered by</span>
            <span>&nbsp;</span>
            <h3 className={styles.footerLogo}>Renzik</h3>
          </div>
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
