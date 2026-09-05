import { getUser } from "@/lib/auth/user";
import styles from "@/app/page.module.css";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { NewEventForm } from "@/app/add-event/NewEventForm";
import { AppHeader } from "@/app/components/AppHeader";
import { AppFooter } from "@/app/components/AppFooter";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();

  if (!user.session) {
    redirect("/login");
  }

  return (
    <Stack spacing={{ xs: 1, lg: 3 }}>
      <AppHeader />

      <Box
        component="main"
        className={styles.page}
        sx={{ justifyContent: "center", gap: 3 }}
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
              Добавить событие
            </Typography>

            <NewEventForm />
          </Stack>
        </Paper>
      </Box>

      <AppFooter />
    </Stack>
  );
}
