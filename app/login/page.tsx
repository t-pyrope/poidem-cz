import { Box, Paper, Stack, Typography } from "@mui/material";
import { SocialButton } from "@/app/components/SocialButton";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Box
      component="main"
      className={styles.page}
      sx={{ justifyContent: "center" }}
    >
      <Paper
        sx={{ width: "calc(100% - 20px)", maxWidth: 800, p: 3 }}
        elevation={0}
      >
        <Stack direction="column" spacing={6} sx={{ alignItems: "center" }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            <Image src="/icon.png" alt="" width={40} height={40} />
            Войдите, чтобы добавлять события
          </Typography>
          <Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
            <SocialButton social="github" />
            <SocialButton social="google" />
          </Stack>

          <Typography sx={{ textAlign: "center" }}>
            Продолжая, вы принимаете{" "}
            <Link href="/terms" style={{ textDecoration: "underline" }}>
              Условия использования
            </Link>{" "}
            и{" "}
            <Link href="/privacy" style={{ textDecoration: "underline" }}>
              Политику конфиденциальности
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
