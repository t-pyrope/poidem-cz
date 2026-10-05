import { notFound } from "next/navigation";
import { Button } from "@mui/material";
import { ArrowBack, OpenInNew } from "@mui/icons-material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ru";
import { db } from "@/lib/db";
import { AppHeader } from "@/app/components/AppHeader";
import { AppFooter } from "@/app/components/AppFooter";
import { getTagName } from "@/app/utils";
import { Tag } from "@/app/types";
import homeStyles from "@/app/page.module.css";
import cardStyles from "@/app/components/EventCard.module.css";
import styles from "./page.module.css";

dayjs.extend(utc);

const languageNames: Record<string, string> = {
  ru: "Русский",
  uk: "Українська",
  cs: "Čeština",
  en: "English",
};

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.slug, slug),
    with: { prices: true },
  });

  if (!event) notFound();

  const date = dayjs.utc(event.date).locale("ru");
  const prices = [...event.prices].sort((a, b) => a.amount - b.amount);

  return (
    <>
      <AppHeader />
      <main className={homeStyles.page}>
        <section className={`${homeStyles.hero} ${styles.hero}`}>
          <div className={homeStyles.wrap}>
            <div className={styles.back}>
              <Button href="/" variant="outlined" startIcon={<ArrowBack />}>
                Назад
              </Button>
            </div>
            <div className={homeStyles.eyebrow}>Мероприятие в Праге</div>
            <div className={cardStyles.tags}>
              {event.tags.map((tag) => (
                <span className={cardStyles.tag} key={tag}>
                  {getTagName(tag as Tag)}
                </span>
              ))}
            </div>
            <h1 className={`${homeStyles.h1} ${styles.title}`}>
              {event.title}
            </h1>
            <p className={homeStyles.heroText}>
              <time dateTime={date.format("YYYY-MM-DDTHH:mm:ss")}>
                {date.format("D MMMM YYYY, dddd · HH:mm")}
              </time>
            </p>
          </div>
        </section>
        <div className={`${homeStyles.wrap} ${styles.content}`}>
          <section aria-labelledby="description-title">
            <h2 id="description-title" className={styles.heading}>
              О мероприятии
            </h2>
            <p className={styles.description}>
              {event.description?.trim() || "Описание пока не добавлено."}
            </p>
          </section>
          <aside className={styles.panel}>
            <dl className={styles.details}>
              <div>
                <dt>Адрес</dt>
                <dd>{event.address}</dd>
              </div>
              {event.organization && (
                <div>
                  <dt>Организация</dt>
                  <dd>{event.organization}</dd>
                </div>
              )}
              {event.organizer && (
                <div>
                  <dt>Организатор</dt>
                  <dd>{event.organizer}</dd>
                </div>
              )}
              <div>
                <dt>Язык</dt>
                <dd>{languageNames[event.lang] ?? event.lang}</dd>
              </div>
              <div>
                <dt>Стоимость</dt>
                <dd>
                  {prices.length ? (
                    <ul className={styles.prices}>
                      {prices.map((price) => (
                        <li key={price.id}>
                          {price.label && `${price.label}: `}
                          {price.amount === 0
                            ? "Бесплатно"
                            : `${price.amount} крон`}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "Неизвестно"
                  )}
                </dd>
              </div>
            </dl>
            <Button
              href={event.link}
              variant="contained"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew />}
            >
              Перейти
            </Button>
          </aside>
        </div>
      </main>
      <AppFooter />
    </>
  );
}
