import styles from "./page.module.css";
import { db } from "@/lib/db";
import { EventCard } from "@/app/components/EventCard";
import { Filters } from "@/app/components/Filters/Filters";
import dayjs from "dayjs";
import { AppHeader } from "@/app/components/AppHeader";
import { AppFooter } from "@/app/components/AppFooter";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    organization?: string;
    from?: string;
    to?: string;
    lang?: string;
  }>;
}) {
  const params = await searchParams;
  const { category, organization, from, to, lang } = params;

  const events = await db.query.events.findMany({
    orderBy: (events, { asc }) => asc(events.date),
    with: {
      prices: true,
    },
  });

  const eventsToDisplay = events.filter((event) => {
    const eventDate = dayjs(event.date);

    const afterFrom = !from || !eventDate.isBefore(dayjs(from), "day");
    const beforeTo = !to || !eventDate.isAfter(dayjs(to), "day");

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
            <div className={styles.eyebrow}>Прага, каждый день</div>
            <h1 className={styles.h1}>Пойдём — афиша мероприятий в Праге</h1>
            <p className={styles.heroText}>
              Встречи, выставки, концерты, спектакли и многое другое
            </p>
          </div>
        </section>

        <div className={styles.wrap}>
          <Filters events={events} />
          <div className={styles.feed}>
            {eventsToDisplay.map((ev, i) => (
              <EventCard eventItem={ev} index={i} key={ev.title} />
            ))}
            {eventsToDisplay.length === 0 && "Нет событий"}
          </div>

          {/*<div className={styles.digest}>*/}
          {/*  <div>*/}
          {/*    <h2 className={styles.digestTitle}>Дайджест по пятницам</h2>*/}
          {/*    <p className={styles.digestText}>*/}
          {/*      Пять событий на следующую неделю — прямо на почту, без спама и*/}
          {/*      рекламы.*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*  <form className={styles.digestForm}>*/}
          {/*    <input*/}
          {/*      type="email"*/}
          {/*      placeholder="ваш email"*/}
          {/*      aria-label="Email для дайджеста"*/}
          {/*      className={styles.input}*/}
          {/*    />*/}
          {/*    <Button>Подписаться</Button>*/}
          {/*  </form>*/}
          {/*</div>*/}
        </div>
      </main>
      <AppFooter />
    </>
  );
}
