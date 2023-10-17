import styles from './client.module.css';

type ClientStatusProps = {
  status: string;
}

export const ClientStatus = ({ status }: ClientStatusProps) => {
  console.log('status', status);

  return (
    <div className={styles.status} data-status={status}></div>
  )
}