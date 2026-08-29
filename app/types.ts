import { InferSelectModel } from "drizzle-orm";
import { eventPrices, events } from "@/db/schema";

export type EventItem = InferSelectModel<typeof events>;

export type Price = InferSelectModel<typeof eventPrices>;

export type EventWithPrices = EventItem & {
  prices: Price[];
};
