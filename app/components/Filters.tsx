import styles from "@/app/page.module.css";
import { EventItem } from "@/app/types";
import { getTagName } from "@/app/utils";

export const Filters = ({ events }: { events: EventItem[] }) => {
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

  return (
    <>
      <div className={styles.cats}>
        {categories.map((cat, i) => (
          <span
            key={cat.categoryName}
            className={`${styles.cat} ${i === 0 ? styles.catActive : ""}`}
          >
            {getTagName(cat.categoryName)} ({cat.count})
          </span>
        ))}
      </div>
    </>
  );
};
