import type { RefObject } from 'react';
import type { FieldError } from 'react-hook-form';
import { forwardRef } from 'react';

import styles from './input.module.css';

type TextareaProps = {
  name: string;
  label?: string;
  error?: FieldError;
  [key: string]: any;
};

export const Textarea = forwardRef(({ label, name, error, ...props }: TextareaProps, ref) => {
  return (
    <div className="text-sm">
      {!!label && <label className="block text-slate-700 mb-2">{label}</label>}
      <textarea ref={ref as RefObject<HTMLTextAreaElement>} style={{ minHeight: 80 }} name={name} {...props} className={styles.item} />
      {!!error && <div className="block text-red-600 mt-2">{error.message}</div>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
