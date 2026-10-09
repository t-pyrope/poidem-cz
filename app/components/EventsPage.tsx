import { arrayContains } from "drizzle-orm";
import type { getTagPage } from "@/lib/event-tags";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
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
  tagPage,
}: {
  searchParams: Promise<EventSearchParams>;
  period?: EventPeriod;
  tagPage?: NonNullable<ReturnType<typeof getTagPage>>;
}) {
  const params = await searchParams;

  const { category, organization, from, to, lang } = params;

  const now = new Date();
  const todayStart = getEventPeriod("today", now).start;
  const range = period ? getEventPeriod(period, now) : undefined;

  const events = await db.query.events.findMany({
    where: (events, { and, gte, lt }) =>
      and(
        gte(events.date, todayStart),
        range ? gte(events.date, range.start) : undefined,
        range ? lt(events.date, range.end) : undefined,
        tagPage ? arrayContains(events.tags, [tagPage.tag]) : undefined,
      ),
    orderBy: (events, { asc }) => asc(events.date),
    with: {
      prices: true,
    },
  });
  const today = dayjs.utc(todayStart);

  const eventsToDisplay = events.filter((event) => {
    const eventDate = dayjs.utc(event.date);

    const afterFrom =
      !!range || !eventDate.isBefore(from ? dayjs.utc(from) : today, "day");
    const beforeTo = !!range || !to || !eventDate.isAfter(dayjs.utc(to), "day");

    return (
      (!category || !!tagPage || event.tags.includes(category)) &&
      (!organization || event.organization === organization) &&
      (!lang || event.lang === lang) &&
      afterFrom &&
      beforeTo
    );
  });

  const emptyMessage = tagPage
    ? organization || lang || from || to
      ? "Нет мероприятий по выбранным фильтрам. Попробуйте изменить фильтры."
      : "В этой категории нет мероприятий на сегодня и ближайшие дни. Прошедшие события не показываются."
    : (range?.emptyMessage ?? "Нет событий");

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
            {(tagPage || period) && (
              <div className={styles.backLink}>
                <Button href="/" variant="outlined" startIcon={<ArrowBack />}>
                  На главную
                </Button>
              </div>
            )}
            <div className={styles.eyebrow}>
              {(tagPage ? `Прага · ${tagPage.name}` : undefined) ??
                range?.eyebrow ??
                "Прага, каждый день"}
            </div>
            <h1 className={styles.h1}>
              {tagPage?.title ??
                range?.title ??
                "Пойдём — афиша мероприятий в Праге"}
            </h1>
            <p className={styles.heroText}>
              {tagPage?.description ??
                range?.description ??
                "Встречи, выставки, концерты, спектакли и многое другое"}
            </p>
          </div>
        </section>

        <div className={styles.wrap}>
          <Filters
            events={events}
            showDateFilter={!period}
            showCategoryFilter={!tagPage}
          />
          <div className={styles.feed}>
            {eventsToDisplay.map((ev, i) => (
              <EventCard eventItem={ev} index={i} key={ev.id} />
            ))}
            {eventsToDisplay.length === 0 && emptyMessage}
          </div>
        </div>
      </main>
      <AppFooter />
    </>
  );
}
