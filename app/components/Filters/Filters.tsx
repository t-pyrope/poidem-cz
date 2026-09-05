"use client";

import { useSearchParams } from "next/navigation";

import { EventItem, Tag } from "@/app/types";
import { getTagName } from "@/app/utils";

import styles from "./Filters.module.css";
import { Select } from "../Select";
import { DateFilter } from "@/app/components/Filters/DateFilter";
import { useUpdateParams } from "@/app/components/Filters/utils";

export const Filters = ({ events }: { events: EventItem[] }) => {
  const searchParams = useSearchParams();
  const { updateParams } = useUpdateParams();

  const activeCategory = searchParams.get("category");
  const activeOrganization = searchParams.get("organization");
  const activeLang = searchParams.get("lang") ?? "";

  const organizations = [
    ...new Set(
      events
        .map((event) => event.organization)
        .filter((org): org is string => !!org),
    ),
  ]
    .sort((a, b) => a.localeCompare(b))
    .map((org) => ({ value: org, label: org }));

  const categories = events
    .reduce(
      (acc, next) => {
        const newCategories = next.tags.filter(
          (tag) => !acc.find((oldCategory) => oldCategory.categoryName === tag),
        );

        return [
          ...acc.map((oldCategory) =>
            next.tags.includes(oldCategory.categoryName)
              ? { ...oldCategory, count: oldCategory.count + 1 }
              : oldCategory,
          ),
          ...newCategories.map((categoryName) => ({
            categoryName,
            count: 1,
          })),
        ];
      },
      [] as { categoryName: string; count: number }[],
    )
    .sort((a, b) => b.count - a.count)
    .map((cat) => ({
      value: cat.categoryName,
      label: `${getTagName(cat.categoryName as Tag)} (${cat.count})`,
    }));

  const handleCategoryChange = (category: string) => {
    updateParams({ category });
  };

  const handleOrganizationChange = (organization: string) => {
    updateParams({ organization });
  };

  const handleLangChange = (lang: string) => {
    updateParams({ lang });
  };

  return (
    <div className={styles.cats}>
      <Select
        ariaLabel="Категория"
        emptyOptionLabel="Все категории"
        value={activeCategory ?? ""}
        options={categories}
        onChange={handleCategoryChange}
      />

      <Select
        ariaLabel="Организатор"
        emptyOptionLabel="Все организаторы"
        value={activeOrganization ?? ""}
        options={organizations}
        onChange={handleOrganizationChange}
      />

      <DateFilter />

      <Select
        ariaLabel="Язык"
        emptyOptionLabel="Все языки"
        onChange={handleLangChange}
        options={[
          { value: "ru", label: "Русский" },
          { value: "cs", label: "Чешский" },
          { value: "en", label: "Английский" },
        ]}
        value={activeLang}
      />
    </div>
  );
};
