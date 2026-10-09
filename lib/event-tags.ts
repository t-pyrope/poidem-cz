import type { Tag } from "@/app/types";
import { getTagName } from "@/app/utils";

export const tagSlugs = {
  festival: "festival",
  workshop: "workshop",
  film: "film",
  performance: "performance",
  "komentovaná prohlídka": "komentovaná prohlídka",
  výstava: "výstava",
  diskuze: "diskuze",
  charita: "charita",
  děti: "děti",
  studenti: "studenti",
  lecture: "lecture",
  language: "language",
  sport: "sport",
  dance: "dance",
  music: "music",
  networking: "networking",
  meetup: "meetup",
  literature: "literature",
  quiz: "quiz",
  market: "market",
  food: "food",
  tour: "tour",
  conference: "conference",
  party: "party",
} satisfies Record<Tag, string>;

const legacySlugs: Record<string, Tag> = {
  "commented-tour": "komentovaná prohlídka",
  exhibition: "výstava",
  discussion: "diskuze",
  charity: "charita",
  kids: "děti",
  students: "studenti",
};

export function getLegacyTagPath(slug: string) {
  return Object.prototype.hasOwnProperty.call(legacySlugs, slug)
    ? getTagPath(legacySlugs[slug])
    : undefined;
}

export function getTagPage(slug: string) {
  const tag = (Object.keys(tagSlugs) as Tag[]).find(
    (tag) => tagSlugs[tag] === slug,
  );
  if (!tag) return undefined;
  const name = getTagName(tag);
  return {
    tag,
    path: getTagPath(tag)!,
    name,
    title: `${name} в Праге`,
    description: `${name} в Праге: актуальные мероприятия с датами, адресами, временем и ценами. Выберите событие и спланируйте свой досуг с афишей «Пойдём».`,
  };
}

export function getTagPath(tag: string) {
  return Object.prototype.hasOwnProperty.call(tagSlugs, tag)
    ? `/events/${encodeURIComponent(tagSlugs[tag as Tag])}`
    : undefined;
}
