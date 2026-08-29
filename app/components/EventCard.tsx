import { EventWithPrices } from "@/app/types";
import dayjs from "dayjs";
import { FiExternalLink } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import "dayjs/locale/ru";

import styles from "./EventCard.module.css";
import { getTagName } from "@/app/utils";
import { Button } from "@/app/components/Button";

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
  const date = dayjs(eventItem.date).locale("ru");
  const dayOfWeek = date.format("dddd");
  const prices = eventItem.prices.sort((a, b) => a.amount - b.amount);

  let priceMessage = "";

  if (prices.length === 1) {
    priceMessage = !prices[0]?.amount
      ? "Бесплатно"
      : `${prices[0]?.amount} крон`;
  } else {
    priceMessage =
      "От " +
      (prices[0]?.amount || 0) +
      " до " +
      (prices.at(-1)?.amount || 0) +
      " крон";
  }

  console.log(prices);

  console.log(eventItem);
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
        <span className={styles.meta}>
          <FaMapMarkerAlt />
          {eventItem.address} ({eventItem.organization})
        </span>
        <span className={styles.meta}>
          <FaMoneyBillAlt />
          {priceMessage}
        </span>
      </div>

      <div className={styles.linkSection}>
        <Button href={eventItem.link}>
          Перейти <FiExternalLink />
        </Button>
      </div>
    </article>
  );
};
