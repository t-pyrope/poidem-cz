"use client";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Выйти</Button>;
};
