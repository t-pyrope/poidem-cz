"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { EventItem } from "@/app/types";
import { getTagName } from "@/app/utils";

import styles from "./Filters.module.css";

export const Filters = ({ events }: { events: EventItem[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");

  const categories: { categoryName: string; count: number }[] = events
    .reduce(
      (acc, next) => {
        const newCategories = next.tags.filter(
          (tag) => !acc.find((oldCategory) => oldCategory.categoryName === tag),
        );

        return [
          ...acc.map((oldCategory) => {
            return next.tags.find((tag) => tag === oldCategory.categoryName)
              ? { ...oldCategory, count: oldCategory.count + 1 }
              : oldCategory;
          }),
          ...newCategories.map((newCategory) => ({
            categoryName: newCategory,
            count: 1,
          })),
        ];
      },
      [] as { categoryName: string; count: number }[],
    )
    .sort((a, b) => b.count - a.count);

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);

    if (activeCategory === category) {
      return;
    }

    params.set("category", category);
    const query = params.toString();

    router.push(query ? `/?${query}` : "/", {
      scroll: false,
    });
  };

  return (
    <div className={styles.cats}>
      <span
        className={`${styles.cat} ${!activeCategory ? styles.catActive : ""}`}
        onClick={() => {
          if (!activeCategory) return;

          router.push("/", {
            scroll: false,
          });
        }}
      >
        Все ({events.length})
      </span>

      {categories.map((cat) => (
        <span
          key={cat.categoryName}
          className={`${styles.cat} ${
            activeCategory === cat.categoryName ? styles.catActive : ""
          }`}
          onClick={() => handleCategoryClick(cat.categoryName)}
        >
          {getTagName(cat.categoryName)} ({cat.count})
        </span>
      ))}
    </div>
  );
};
