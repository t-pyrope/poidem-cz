import Link from "next/link";
import styles from "./Button.module.css";
import { ReactNode } from "react";

export const Button = ({
  href,
  onClick,
  children,
  variant = "primary",
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: HTMLButtonElement["type"];
}) => {
  const className = variant === "primary" ? styles.btnPrimary : styles.btnGhost;

  return href ? (
    href.startsWith("http") ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    ) : (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  ) : (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};
