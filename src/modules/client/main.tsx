import type { ReactNode } from 'react';
import { Arvo } from 'next/font/google'
import styles from './client.module.css';

type ClientMainProps = {
  children: ReactNode;
}

const googleFont = Arvo({ weight: '700', subsets: ['latin'] })

export const ClientMain = ({ children }: ClientMainProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1 className={[styles.title, googleFont.className].join(' ')}>Live Reaction Count</h1>
        {children}
      </div>
    </div>
  )
}