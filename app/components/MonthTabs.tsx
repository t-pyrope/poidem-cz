"use client";

import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import styles from "./MonthTabs.module.css";

const months = [
  { value: "2026-09", label: "Сентябрь" },
  { value: "2026-10", label: "Октябрь" },
  { value: "2026-11", label: "Ноябрь" },
];

export const MonthTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const monthFromParams = searchParams.get("month");
  const activeMonth =
    monthFromParams && /^\d{4}-(0[1-9]|1[0-2])$/.test(monthFromParams)
      ? monthFromParams
      : dayjs().format("YYYY-MM");

  const handleMonthChange = (month: string) => {
    if (activeMonth === month) return;

    const params = new URLSearchParams(searchParams);
    params.set("month", month);

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.tabsOuter}>
      <nav className={styles.tabs} aria-label="Выбор месяца">
        {months.map((month) => {
          const isActive = activeMonth === month.value;

          return (
            <button
              type="button"
              key={month.value}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              aria-pressed={isActive}
              onClick={() => handleMonthChange(month.value)}
            >
              {month.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
