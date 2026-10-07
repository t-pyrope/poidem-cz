import type { Tag } from "@/app/types";
import { getTagName } from "@/app/utils";

export const tagSlugs = {
  festival: "festival",
  workshop: "workshop",
  film: "film",
  performance: "performance",
  "komentovaná prohlídka": "commented-tour",
  výstava: "exhibition",
  diskuze: "discussion",
  charita: "charity",
  děti: "kids",
  studenti: "students",
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

export function getTagPage(slug: string) {
  const tag = (Object.keys(tagSlugs) as Tag[]).find(
    (tag) => tagSlugs[tag] === slug,
  );
  if (!tag) return undefined;
  const name = getTagName(tag);
  return {
    tag,
    path: `/events/${tagSlugs[tag]}`,
    name,
    title: `${name} в Праге`,
    description: `${name} в Праге: актуальные мероприятия с датами, адресами, временем и ценами. Выберите событие и спланируйте свой досуг с афишей «Пойдём».`,
  };
}

export function getTagPath(tag: string) {
  return Object.prototype.hasOwnProperty.call(tagSlugs, tag)
    ? `/events/${tagSlugs[tag as Tag]}`
    : undefined;
}
