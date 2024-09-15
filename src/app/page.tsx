import Link from 'next/link';
import styles from './style.module.css';

export default function Home() {
  return (
    <div className={styles.element}>
      <div className={styles.div}>
        <div className={styles.overlap}>
          <div className={styles.overlapgroup}>
            <div className={styles.ellipse}></div>
            <div className={styles.group}>
              <div className={styles.textwrapper}>ともんはん</div>
            </div>
          </div>
          <div className={styles.ellipse2}></div>
        </div>
        <div className={styles.ellipse3}></div>
        <div className={styles.ellipse4}></div>
        <div className={styles.ellipse5}></div>
        <div className={styles.ellipse6}></div>
        <div className={styles.ellipse7}></div>
        <div className={styles.ellipse8}></div>
        <Link className={styles.startbutton} href='/home'>
          すたぁと
        </Link>
      </div>
    </div>
  );
}
