import { Switch } from "@headlessui/react";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";

import styles from './switch.module.css';

type SwitchInputProps<T extends FieldValues> = {
  name: Path<T>;
  value?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
  onChange?: (val: boolean) => void;
  label?: string;
  labelWidth?: string;
  control?: Control<T>;
};

export const SwitchGroup = <T extends FieldValues>({ value, onChange, label, labelWidth, ...props }: Omit<SwitchInputProps<T>, 'name'>) => {
  return (
    <Switch.Group as="div" className="flex space-x-4">
      {label && <Switch.Label style={{ minWidth: labelWidth }}>{label}</Switch.Label>}
      <Switch {...props} checked={value} onChange={onChange} data-checked={!!value} className={styles.wrapper}>
        <span className={styles.indicator} />
      </Switch>
    </Switch.Group>
  );
};

export const SwitchInput = <T extends FieldValues>({ name, control, label, labelWidth, ...props }: SwitchInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      // defaultValue=""
      {...props}
      render={({ field }) => {
        return <SwitchGroup {...props} value={field.value} onChange={field.onChange} label={label} labelWidth={labelWidth} />;
      }}
    />
  );
};
