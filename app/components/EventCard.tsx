import { EventWithPrices, Tag } from "@/app/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FiExternalLink } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import "dayjs/locale/ru";

import styles from "./EventCard.module.css";
import { getTagName } from "@/app/utils";
import { Button } from "@mui/material";
import { AccessTime, Business, Person, Telegram } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import { ThreadsIcon } from "@/app/components/ThreadsIcon";
import Link from "next/link";

dayjs.extend(utc);

const languageNames: Record<string, string> = {
  ru: "Русский",
  uk: "Українська",
  cs: "Čeština",
  en: "English",
};

const monthsDative = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const EventCard = ({
  eventItem,
  index,
}: {
  eventItem: EventWithPrices;
  index: number;
}) => {
  // Preserve the database timestamp without applying the server's timezone.
  const date = dayjs.utc(eventItem.date).locale("ru");
  const dayOfWeek = date.format("dddd");
  const prices = [...eventItem.prices].sort((a, b) => a.amount - b.amount);

  let priceMessage = "Неизвестно";

  if (prices.length === 1) {
    priceMessage = !prices[0]?.amount
      ? "Бесплатно"
      : `${prices[0]?.amount} крон`;
  } else if (prices.length > 1) {
    priceMessage =
      "От " +
      (prices[0]?.amount || 0) +
      " до " +
      (prices.at(-1)?.amount || 0) +
      " крон";
  }

  const organizer = eventItem.organization || eventItem.organizer;
  const isOrganization = !!eventItem.organization;

  const time = date.format("HH:mm");

  const openIcon = eventItem.link.includes("//t.me/") ? (
    <Telegram />
  ) : eventItem.link.includes("//www.threads.com/") ? (
    <ThreadsIcon />
  ) : (
    <FiExternalLink />
  );

  return (
    <article
      key={eventItem.title}
      className={styles.ticket}
      style={{ animationDelay: `${0.05 + index * 0.07}s` }}
    >
      <div className={styles.stub}>
        <span className={styles.day}>{date.format("D")}</span>
        <span className={styles.month}>{monthsDative[date.month()]}</span>
        <span className={styles.dayOfWeek}>({dayOfWeek})</span>
      </div>

      <div className={styles.perf} />

      <div className={styles.details}>
        <div className={styles.tags}>
          {eventItem.tags.map((tag) => (
            <span className={styles.tag} key={tag}>
              {getTagName(tag as Tag)}
            </span>
          ))}
        </div>

        <h3 className={styles.detailsTitle}>
          <Link href={`/events/${eventItem.slug}`} className={styles.eventLink}>
            {eventItem.title}
          </Link>
        </h3>
        <span className={styles.meta}>
          <span>
            <FaMapMarkerAlt />
            {eventItem.address}{" "}
          </span>
          <span>
            (
            {isOrganization ? (
              <Business fontSize="inherit" sx={{ marginBottom: "3px" }} />
            ) : (
              <Person fontSize="inherit" sx={{ marginBottom: "3px" }} />
            )}{" "}
            {organizer})
          </span>{" "}
          <AccessTime sx={{ width: 16, height: 16 }} />
          <span>{time}</span>{" "}
          <LanguageIcon sx={{ width: 16, height: 16 }} />
          <span>{languageNames[eventItem.lang] ?? eventItem.lang}</span>
        </span>
        <span className={styles.meta}>
          <FaMoneyBillAlt />
          {priceMessage}
        </span>
      </div>

      <div className={styles.linkSection}>
        <Button
          href={eventItem.link}
          variant="contained"
          target="_blank"
          rel="noopener noreferrer"
          endIcon={openIcon}
        >
          Перейти
        </Button>
      </div>
    </article>
  );
};
