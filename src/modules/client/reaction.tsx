import type { CSSProperties, ReactNode } from 'react';
import styles from './client.module.css';

export interface CustomCSS extends CSSProperties {
  '--size'?: number;
}

type ClientReactionProps = {
  type: string;
  style: CustomCSS;
}

const getEmoji = (type: string) => {
  switch (type) {
    case 'love':
      return '🥰';
    case 'like':
      return '👍';
    case 'hate':
      return '😡';
    default:
      return '😕';
  }
}

export const ClientReaction = ({ type, style = {} }: ClientReactionProps) => {
  return (
    <div style={style} className={styles.item}>{getEmoji(type)}</div>
  )
}