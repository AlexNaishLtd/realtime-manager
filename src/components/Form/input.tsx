import type { FieldError } from 'react-hook-form';
import type { InputHTMLAttributes, RefObject } from 'react';
import { useId } from 'react';
import { forwardRef } from 'react';

import styles from './input.module.css';

type InputProps = {
  name: string;
  type?: string;
  label?: string;
  help?: string;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef(({ type = 'text', help, label, name, error, ...props }: InputProps, ref) => {
  const id = useId();
  return (
    <div>
      {!!label && (
        <label htmlFor={id} className={`block text-slate-700 ${help ? '' : 'mb-2'}`}>
          {label}
        </label>
      )}
      {!!help && <div className="block text-xs text-slate-600 mb-2">{help}</div>}
      <input
        id={id}
        ref={ref as RefObject<HTMLInputElement>}
        type={type}
        name={name}
        {...props}
        className={`${styles.item} ${props.className ?? ''}`}
      />
      {!!error && <div className="block text-red-600 mt-2">{error.message}</div>}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
