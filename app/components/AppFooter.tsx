import Link from "next/link";
import styles from "@/app/page.module.css";

export const AppFooter = () => {
  return (
    <footer className={styles.footer}>
      <span>Пойдём — афиша русскоязычной Праги</span>
      <nav aria-label="Мероприятия по дням" className={styles.footerNav}>
        <Link href="/today">Сегодня</Link>
        <Link href="/tomorrow">Завтра</Link>
        <Link href="/weekend">На выходных</Link>
      </nav>
      <span>© 2026 Alina Isachanka · Akkush s.r.o.</span>
    </footer>
  );
};
