import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { getUser } from "@/lib/auth/user";

export const AppHeader = async () => {
  const { session } = await getUser();

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        position="static"
        sx={{ alignItems: "center", display: "flex", width: "100%" }}
      >
        <Toolbar
          sx={{
            py: 1,
            justifyContent: "space-between",
            maxWidth: 1080,
            width: "100%",
          }}
        >
          <Link href="/">
            <Image src="/icon.png" alt="App icon" width={50} height={50} />
          </Link>
          <Stack direction="row" spacing={1}>
            {!session && <Button>Войти</Button>}
            <Button
              variant="contained"
              href={session ? "/add-event" : "/login"}
            >
              Добавить событие
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
