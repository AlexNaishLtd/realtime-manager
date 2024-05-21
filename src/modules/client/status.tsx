import styles from './client.module.css';

type ClientStatusProps = {
  status: string;
}

export const ClientStatus = ({ status }: ClientStatusProps) => {
  return (
    <div className={styles.status} data-status={status}></div>
  )
}