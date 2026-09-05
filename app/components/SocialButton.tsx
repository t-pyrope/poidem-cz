"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@mui/material";

export const SocialButton = ({ social }: { social: "github" | "google" }) => {
  const buttonClassNames =
    social === "github"
      ? "bg-neutral-800 hover:bg-neutral-700 text-white"
      : "text-neutral-800 border-neutral-300 border-1 hover:bg-neutral-100";

  return (
    <Button
      variant="contained"
      color="inherit"
      disabled={social === "github"}
      className={`${buttonClassNames}`}
      onClick={() => signIn(social)}
    >
      <Image
        src={social === "google" ? "/g.png" : "/github.png"}
        alt="Logo"
        width={24}
        height={24}
      />
      {social === "google" ? "Продолжить с Google" : "Продолжить с GitHub"}
    </Button>
  );
};
