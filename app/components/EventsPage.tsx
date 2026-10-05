import styles from "@/app/page.module.css";
import { db } from "@/lib/db";
import { EventCard } from "@/app/components/EventCard";
import { Filters } from "@/app/components/Filters/Filters";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getEventPeriod, type EventPeriod } from "@/lib/event-period";

import { AppHeader } from "@/app/components/AppHeader";
import { AppFooter } from "@/app/components/AppFooter";

dayjs.extend(utc);

export type EventSearchParams = {
  category?: string;
  organization?: string;
  from?: string;
  to?: string;
  lang?: string;
};

export async function EventsPage({
  searchParams,
  period,
}: {
  searchParams: Promise<EventSearchParams>;
  period?: EventPeriod;
}) {
  const params = await searchParams;

  const { category, organization, from, to, lang } = params;

  const range = period ? getEventPeriod(period) : undefined;

  const events = await db.query.events.findMany({
    where: range
      ? (events, { and, gte, lt }) =>
          and(gte(events.date, range.start), lt(events.date, range.end))
      : undefined,
    orderBy: (events, { asc }) => asc(events.date),
    with: {
      prices: true,
    },
  });
  const today = dayjs(new Date());

  const eventsToDisplay = events.filter((event) => {
    const eventDate = dayjs.utc(event.date);

    const afterFrom =
      !!range || !eventDate.isBefore(dayjs(from || today), "day");
    const beforeTo = !!range || !to || !eventDate.isAfter(dayjs(to), "day");

    return (
      (!category || event.tags.includes(category)) &&
      (!organization || event.organization === organization) &&
      (!lang || event.lang === lang) &&
      afterFrom &&
      beforeTo
    );
  });

  return (
    <>
      <AppHeader />
      <main className={styles.page}>
        <section className={styles.hero}>
          <span className={`${styles.lampDot} ${styles.dot1}`} />
          <span className={`${styles.lampDot} ${styles.dot2}`} />
          <span className={`${styles.lampDot} ${styles.dot3}`} />
          <span className={`${styles.lampDot} ${styles.dot4}`} />
          <div className={styles.wrap}>
            <div className={styles.eyebrow}>
              {range?.eyebrow ?? "Прага, каждый день"}
            </div>
            <h1 className={styles.h1}>
              {range?.title ?? "Пойдём — афиша мероприятий в Праге"}
            </h1>
            <p className={styles.heroText}>
              {range?.description ??
                "Встречи, выставки, концерты, спектакли и многое другое"}
            </p>
          </div>
        </section>

        <div className={styles.wrap}>
          <Filters events={events} showDateFilter={!period} />
          <div className={styles.feed}>
            {eventsToDisplay.map((ev, i) => (
              <EventCard eventItem={ev} index={i} key={ev.id} />
            ))}
            {eventsToDisplay.length === 0 &&
              (range?.emptyMessage ?? "Нет событий")}
          </div>
        </div>
      </main>
      <AppFooter />
    </>
  );
}
