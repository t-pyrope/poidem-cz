import { Button } from "@mui/material";
import { Telegram } from "@mui/icons-material";
import { ThreadsIcon } from "@/app/components/ThreadsIcon";
import { FiExternalLink } from "react-icons/fi";

export const GoToEventButton = ({ link }: { link: string }) => {
  const openIcon = link.includes("//t.me/") ? (
    <Telegram />
  ) : link.includes("//www.threads.com/") ? (
    <ThreadsIcon />
  ) : (
    <FiExternalLink />
  );

  return (
    <Button
      href={link}
      variant="contained"
      target="_blank"
      rel="noopener noreferrer"
      endIcon={openIcon}
    >
      Перейти
    </Button>
  );
};
