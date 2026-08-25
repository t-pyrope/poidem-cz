import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import styles from "./page.module.css";
import { EventItem } from "@/app/types";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
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

const events: EventItem[] = [
  {
    date: new Date(1787851800000),
    tags: ["concert"],
    title: "Вечер русского романса",
    place: "Divadlo Kampa · 19:30 · от 350 Kč",
    id: "",
    link: "",
    createdAt: new Date(1787651340000),
    price: 350,
  },
];

const categories = [
  "Все",
  "Концерты",
  "Театр",
  "Выставки",
  "Встречи",
  "Кино",
  "Ярмарки",
];

export default function Home() {
  return (
    <main
      className={`${styles.page} ${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <section className={styles.hero}>
        <span className={`${styles.lampDot} ${styles.dot1}`} />
        <span className={`${styles.lampDot} ${styles.dot2}`} />
        <span className={`${styles.lampDot} ${styles.dot3}`} />
        <span className={`${styles.lampDot} ${styles.dot4}`} />
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>Прага, каждый вечер</div>
          <h1 className={styles.h1}>
            Что происходит в городе, <em>пока ты не смотрел</em>
          </h1>
          <p className={styles.heroText}>
            Концерты, спектакли, встречи и выставки для русскоязычной Праги — в
            одном спокойном месте, без десяти вкладок и групп в телеграме.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.btnPrimary}>Смотреть афишу</button>
            <button className={styles.btnGhost}>Добавить своё событие</button>
          </div>
        </div>
      </section>

      <div className={styles.wrap}>
        <div className={styles.cats}>
          {categories.map((cat, i) => (
            <span
              key={cat}
              className={`${styles.cat} ${i === 0 ? styles.catActive : ""}`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className={styles.feed}>
          {events.map((ev, i) => (
            <div
              key={ev.title}
              className={styles.ticket}
              style={{ animationDelay: `${0.05 + i * 0.07}s` }}
            >
              <div className={styles.stub}>
                <span className={styles.day}>{ev.date.getDate()}</span>
                <span className={styles.month}>{ev.date.getMonth()}</span>
              </div>
              <div className={styles.perf} />
              <div className={styles.details}>
                {ev.tags.map((tag) => (
                  <span className={`${styles.tag}`} key={tag}>
                    {tag}
                  </span>
                ))}
                <h3 className={styles.detailsTitle}>{ev.title}</h3>
                <span className={styles.meta}>{ev.place}</span>
              </div>
            </div>
          ))}
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
            <button className={styles.btnPrimary} type="submit">
              Подписаться
            </button>
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
