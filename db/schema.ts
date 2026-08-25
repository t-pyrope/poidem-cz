import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  link: text("link").notNull(),
  date: timestamp("date").notNull(),
  tags: text("tag").array().notNull(),
  place: text("place").notNull(),
  price: integer("price").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
