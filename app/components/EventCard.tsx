import { EventItem } from "@/app/types";
import dayjs from "dayjs";
import { FiExternalLink } from "react-icons/fi";
import "dayjs/locale/ru";

import styles from "./EventCard.module.css";
import { getTagName } from "@/app/utils";

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
  eventItem: EventItem;
  index: number;
}) => {
  const date = dayjs(eventItem.date).locale("ru");
  const dayOfWeek = date.format("dddd");

  return (
    <article
      key={eventItem.title}
      className={styles.ticket}
      style={{ animationDelay: `${0.05 + index * 0.07}s` }}
    >
      <div className={styles.stub}>
        <span className={styles.day}>{date.format("D")}</span>
        <span className={styles.month}>{monthsDative[date.month()]}</span>
        <span className={styles.dayOfWeek}>{dayOfWeek}</span>
      </div>

      <div className={styles.perf} />

      <div className={styles.details}>
        <div className={styles.tags}>
          {eventItem.tags.map((tag) => (
            <span className={styles.tag} key={tag}>
              {getTagName(tag)}
            </span>
          ))}
        </div>

        <h3 className={styles.detailsTitle}>{eventItem.title}</h3>
        <span className={styles.meta}>{eventItem.organization}</span>
      </div>

      <div className={styles.linkSection}>
        <a
          href={eventItem.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Открыть на сайте <FiExternalLink />
        </a>
      </div>
    </article>
  );
};
