import { InferSelectModel } from "drizzle-orm";
import { events } from "@/db/schema";

export type EventItem = InferSelectModel<typeof events>;
