"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { EventItem } from "@/app/types";
import { getTagName } from "@/app/utils";

import styles from "./Filters.module.css";
import { Select } from "./Select";

export const Filters = ({ events }: { events: EventItem[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activeOrganization = searchParams.get("organization");

  const organizations = [...new Set(events.map((event) => event.organization))]
    .sort((a, b) => a.localeCompare(b))
    .map((org) => ({ value: org, label: org }));

  const categories = events
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
    .sort((a, b) => b.count - a.count)
    .map((cat) => ({
      value: cat.categoryName,
      label: `${getTagName(cat.categoryName)} (${cat.count})`,
    }));

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);

    if (activeCategory === category) {
      return;
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category", category);
    }
    const query = params.toString();

    router.push(query ? `/?${query}` : "/", {
      scroll: false,
    });
  };

  const handleOrganizationChange = (organization: string) => {
    const params = new URLSearchParams(searchParams);

    if (activeOrganization === organization) {
      return;
    }

    if (organization) {
      params.set("organization", organization);
    } else {
      params.delete("organization");
    }

    const query = params.toString();

    router.push(query ? `/?${query}` : "/", {
      scroll: false,
    });
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
    </div>
  );
};
