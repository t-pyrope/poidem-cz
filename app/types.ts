import { InferSelectModel } from "drizzle-orm";
import { eventPrices, events, users } from "@/db/schema";

export type EventItem = InferSelectModel<typeof events>;

export type Price = InferSelectModel<typeof eventPrices>;

export type EventWithPrices = EventItem & {
  prices: Price[];
};

export type User = InferSelectModel<typeof users>;

export type Tag =
  | "festival"
  | "workshop"
  | "film"
  | "performance"
  | "komentovaná prohlídka"
  | "výstava"
  | "diskuze"
  | "charita"
  | "děti";
