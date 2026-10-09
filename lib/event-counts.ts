import { cache } from "react";
import { gte } from "drizzle-orm";
import { db } from "@/lib/db";
import { events } from "@/db/schema";
import { getEventPeriod } from "@/lib/event-period";

// Share counts within the render, without caching them across requests.
export const getEventCounts = cache(async () => {
  const now = new Date();
  const periods = {
    today: getEventPeriod("today", now),
    tomorrow: getEventPeriod("tomorrow", now),
    weekend: getEventPeriod("weekend", now),
  };
  const upcoming = await db
    .select({ tags: events.tags, date: events.date })
    .from(events)
    .where(gte(events.date, periods.today.start));
  const counts = {
    tags: {} as Record<string, number>,
    today: 0,
    tomorrow: 0,
    weekend: 0,
  };
  for (const event of upcoming) {
    for (const tag of new Set(event.tags)) {
      counts.tags[tag] = (counts.tags[tag] ?? 0) + 1;
    }
    for (const period of ["today", "tomorrow", "weekend"] as const) {
      if (
        event.date >= periods[period].start &&
        event.date < periods[period].end
      ) {
        counts[period]++;
      }
    }
  }
  return counts;
});
