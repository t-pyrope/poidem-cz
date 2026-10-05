import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export type EventPeriod = "today" | "tomorrow" | "weekend";

const copy = {
  today: {
    eyebrow: "Прага, сегодня",
    title: "Мероприятия в Праге сегодня",
    description: "Встречи, выставки, концерты и спектакли на сегодня",
    emptyMessage: "На сегодня мероприятий нет",
  },
  tomorrow: {
    eyebrow: "Прага, завтра",
    title: "Мероприятия в Праге завтра",
    description: "Встречи, выставки, концерты и спектакли на завтра",
    emptyMessage: "На завтра мероприятий нет",
  },
  weekend: {
    eyebrow: "Прага, на выходных",
    title: "Мероприятия в Праге на выходных",
    description:
      "Встречи, выставки, концерты и спектакли в субботу и воскресенье",
    emptyMessage: "На эти выходные мероприятий нет",
  },
};

export function getEventPeriod(period: EventPeriod, now = new Date()) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) =>
    parts.find((value) => value.type === type)!.value;
  // Events store local wall-clock timestamps, as displayed by EventCard.
  const today = dayjs.utc(`${part("year")}-${part("month")}-${part("day")}`);
  const mondayOffset = (today.day() + 6) % 7;
  const start =
    period === "today"
      ? today
      : period === "tomorrow"
        ? today.add(1, "day")
        : today.add(5 - mondayOffset, "day");

  return {
    ...copy[period],
    start: start.toDate(),
    end: start.add(period === "weekend" ? 2 : 1, "day").toDate(),
  };
}
