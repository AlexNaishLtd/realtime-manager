import type { ReactNode } from 'react';

export type ItemFromArray<T> = T extends (infer U)[] ? U : T;

export type WithChildrenProps = {
  children?: ReactNode;
};
