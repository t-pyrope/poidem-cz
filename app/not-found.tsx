import { Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { AppHeader } from "@/app/components/AppHeader";
import { AppFooter } from "@/app/components/AppFooter";
import homeStyles from "@/app/page.module.css";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <AppHeader />
      <main className={`${homeStyles.page} ${styles.page}`}>
        <section className={`${homeStyles.hero} ${styles.hero}`}>
          <span
            aria-hidden="true"
            className={`${homeStyles.lampDot} ${homeStyles.dot1}`}
          />
          <span
            aria-hidden="true"
            className={`${homeStyles.lampDot} ${homeStyles.dot2}`}
          />
          <span
            aria-hidden="true"
            className={`${homeStyles.lampDot} ${homeStyles.dot4}`}
          />
          <div className={`${homeStyles.wrap} ${styles.content}`}>
            <div className={homeStyles.eyebrow}>Прага · маршрут не найден</div>
            <h1 className={styles.code} aria-hidden="true">
              404
            </h1>
            <p className={`${homeStyles.heroText} ${styles.description}`}>
              Такой страницы нет. Возможно, ссылка устарела
            </p>
            <div className={homeStyles.heroActions}>
              <Button href="/" variant="contained" startIcon={<ArrowBack />}>
                Вернуться к афише
              </Button>
              <Button
                href="/today"
                variant="outlined"
                endIcon={<ArrowForward />}
              >
                Куда пойти сегодня
              </Button>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
