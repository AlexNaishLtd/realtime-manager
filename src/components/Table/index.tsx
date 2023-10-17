import type { WithChildrenProps } from '@/config/types';
import type { ReactNode } from 'react';

import styles from './table.module.css';

export type Column = {
  value: ReactNode;
  class?: string;
}
type TableProps = {
  columns: Column[];
  children: ReactNode;
  loading?: boolean;
  compact?: boolean;
};

export const Table = ({ columns, loading, compact, children }: TableProps) => {
  return (
    <div className={`${compact ? '' : ' my-4'}`}>
      <table className={styles.wrap}>
        <thead>
          <tr>
            {columns?.map((col, i) => (
              <th
                key={`${col}-${i}`}
                scope="col"
                className={`${styles.heading} ${col.class}`}
              >
                {col.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? Array.from({ length: 8 }).map((_, i) => <RowSkeleton key={i} columns={columns} />) : children}
        </tbody>
      </table>
    </div >
  );
};

type RowSkeletonProps = {
  columns?: Column[];
};

const RowSkeleton = ({ columns }: RowSkeletonProps) => {
  return (
    <tr className={styles.skeleton}>
      {columns?.map((_, i) => {
        return (
          <Cell key={i}>
            <span className="block bg-slate-200 w-full">&nbsp;</span>
          </Cell>
        );
      })}
    </tr>
  );
};

export const Row = ({ children }: WithChildrenProps) => {
  return <tr className={styles.row}>{children}</tr>;
};

type CellProps = {
  colSpan?: number;
  className?: string;
  isActions?: boolean;
  children: ReactNode;
};

export const Cell = ({ colSpan, className, isActions, children }: CellProps) => {
  return (
    <td className={[styles.cell, `${isActions && styles.actions}`, className].filter(Boolean).join(' ')} colSpan={colSpan}>
      {children}
    </td>
  );
};
