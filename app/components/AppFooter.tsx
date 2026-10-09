"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Tag } from "@/app/types";
import { getTagName } from "@/app/utils";
import { getTagPath, tagSlugs } from "@/lib/event-tags";
import styles from "@/app/page.module.css";

export const AppFooter = () => {
  const pathname = usePathname();
  const currentPage = (href: string) =>
    pathname === href || pathname === decodeURIComponent(href)
      ? ("page" as const)
      : undefined;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Link
          href="/"
          className={styles.footerBrand}
          aria-current={currentPage("/")}
        >
          Пойдём — афиша русскоязычной Праги
        </Link>
        <nav aria-label="Мероприятия по дням" className={styles.footerNav}>
          <Link href="/today" aria-current={currentPage("/today")}>
            Сегодня
          </Link>
          <Link href="/tomorrow" aria-current={currentPage("/tomorrow")}>
            Завтра
          </Link>
          <Link href="/weekend" aria-current={currentPage("/weekend")}>
            На выходных
          </Link>
        </nav>
        <nav aria-labelledby="footer-categories-title">
          <h2 id="footer-categories-title" className={styles.footerHeading}>
            Категории мероприятий
          </h2>
          <ul className={styles.footerCategories}>
            {(Object.keys(tagSlugs) as Tag[]).map((tag) => (
              <li key={tag}>
                <Link
                  href={getTagPath(tag)!}
                  aria-current={currentPage(getTagPath(tag)!)}
                >
                  {getTagName(tag)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.footerCopyright}>
          © 2026 Alina Isachanka · Akkush s.r.o.
        </div>
      </div>
    </footer>
  );
};
