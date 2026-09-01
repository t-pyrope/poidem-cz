import Link from "next/link";
import styles from "./Button.module.css";
import { ReactNode } from "react";
import { Button as MuiButton } from "@mui/material";

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
      <MuiButton href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </MuiButton>
    ) : (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  ) : (
    <MuiButton onClick={onClick} type={type}>
      {children}
    </MuiButton>
  );
};
