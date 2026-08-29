"use client";

import styles from "./Select.module.css";
import { FiChevronDown } from "react-icons/fi";

type SelectProps = {
  ariaLabel: string;
  emptyOptionLabel: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
};

export const Select = ({
  ariaLabel,
  emptyOptionLabel,
  onChange,
  options,
  value,
}: SelectProps) => (
  <div className={styles.wrapper}>
    <select
      aria-label={ariaLabel}
      className={styles.select}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">{emptyOptionLabel}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <FiChevronDown aria-hidden="true" className={styles.icon} />
  </div>
);
