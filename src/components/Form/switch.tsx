import { Switch } from "@headlessui/react";

import styles from './switch.module.css';
import { Controller } from "react-hook-form";

type SwitchInputProps = {
  name: string;
  label?: string;
  labelWidth?: string;
  [key: string]: any;
};

export const SwitchGroup = ({ value, onChange, label, labelWidth, ...props }: Omit<SwitchInputProps, 'name'>) => {
  return (
    <Switch.Group as="div" className="flex space-x-4">
      {label && <Switch.Label style={{ minWidth: labelWidth }}>{label}</Switch.Label>}
      <Switch {...props} checked={value} onChange={onChange} data-checked={!!value} className={styles.wrapper}>
        <span className={styles.indicator} />
      </Switch>
    </Switch.Group>
  );
};

export const SwitchInput = ({ name, control, label, labelWidth, ...props }: SwitchInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      {...props}
      render={({ field }) => {
        return <SwitchGroup value={field.value} onChange={field.onChange} label={label} labelWidth={labelWidth} {...props} />;
      }}
    />
  );
};
