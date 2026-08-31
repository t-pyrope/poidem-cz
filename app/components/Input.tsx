import styles from "./Input.module.css";

export const Input = ({
  type = "text",
  placeholder,
  ariaLabel,
}: {
  type?: HTMLInputElement["type"];
  placeholder: string;
  ariaLabel?: string;
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={styles.input}
    />
  );
};
