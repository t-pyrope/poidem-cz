import { Inter, IBM_Plex_Mono, IBM_Plex_Serif } from "next/font/google";
import styles from "./page.module.css";
import { db } from "@/lib/db";
import { EventCard } from "@/app/components/EventCard";
import { Filters } from "@/app/components/Filters";
import { Button } from "@/app/components/Button";
import { MonthTabs } from "@/app/components/MonthTabs";
import dayjs from "dayjs";

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-serif",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    organization?: string;
    month?: string;
  }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const organization = params.organization;
  const month =
    params.month && /^\d{4}-(0[1-9]|1[0-2])$/.test(params.month)
      ? params.month
      : dayjs().format("YYYY-MM");

  const events = await db.query.events.findMany({
    orderBy: (events, { asc }) => asc(events.date),
    with: {
      prices: true,
    },
  });

  const eventsToDisplay = events.filter(
    (event) =>
      (!category || event.tags.includes(category)) &&
      (!organization || event.organization === organization) &&
      dayjs(event.date).format("YYYY-MM") === month,
  );

  return (
    <main
      className={`${styles.page} ${plexSerif.variable} ${inter.variable} ${plexMono.variable}`}
    >
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
        <MonthTabs />

        <div className={styles.feed}>
          {eventsToDisplay.map((ev, i) => (
            <EventCard eventItem={ev} index={i} key={ev.title} />
          ))}
          {eventsToDisplay.length === 0 && "Нет событий"}
        </div>

        <div className={styles.digest}>
          <div>
            <h2 className={styles.digestTitle}>Дайджест по пятницам</h2>
            <p className={styles.digestText}>
              Пять событий на следующую неделю — прямо на почту, без спама и
              рекламы.
            </p>
          </div>
          <form className={styles.digestForm}>
            <input
              type="email"
              placeholder="ваш email"
              aria-label="Email для дайджеста"
              className={styles.input}
            />
            <Button>Подписаться</Button>
          </form>
        </div>

        <footer className={styles.footer}>
          <span>Пойдём — афиша русскоязычной Праги</span>
          <span>Прага, 2026</span>
        </footer>
      </div>
    </main>
  );
}
