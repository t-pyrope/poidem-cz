import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  link: text("link").notNull(),
  date: timestamp("date").notNull(),
  tags: text("tags").array().notNull(),
  organization: text("organization").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lang: text("lang").notNull().default("ru"),
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

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: text("email").unique(),
  password: text("password"),
});

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
  },
  (table) => [
    uniqueIndex("accounts_provider_provider_account_id_unique").on(
      table.provider,
      table.providerAccountId,
    ),
  ],
);
