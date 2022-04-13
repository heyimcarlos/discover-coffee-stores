import React from 'react';
// styles
import styles from '@styles/Home.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href='https://github.com/renzik' target='_blank' rel='noopener noreferrer'>
        Powered by <h3 className={styles.footerLogo}>Renzik</h3>
      </a>
    </footer>
  );
};

export default Footer;
