import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  link: text("link").notNull(),
  date: timestamp("date").notNull(),
  tags: text("tags").array().notNull(),
  organization: text("organization").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const eventPrices = pgTable("event_prices", {
  id: uuid("id").primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  label: text("label").notNull(), // "adult", "student", "senior"
  amount: integer("amount").notNull(),
});

export const eventsRelations = relations(events, ({ many }) => ({
  prices: many(eventPrices),
}));

export const eventPricesRelations = relations(eventPrices, ({ one }) => ({
  event: one(events, {
    fields: [eventPrices.eventId],
    references: [events.id],
  }),
}));
