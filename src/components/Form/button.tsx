import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from './button.module.css';

type ButtonProps = {
  children: ReactNode;
  type?: string;
  isPending?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, type = 'submit', disabled, isPending, ...props }: ButtonProps) => {
  return (
    <button {...props} type={type} disabled={disabled || isPending} className={styles.wrap}>
      {children}
      {isPending && (
        <svg width="25" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 ml-2">
          <circle cx="15" cy="15" r="15">
            <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="60" cy="15" r="9" fillOpacity="0.3">
            <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="105" cy="15" r="15">
            <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
        </svg>
      )}
    </button>
  )
}