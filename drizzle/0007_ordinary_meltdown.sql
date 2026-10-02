ALTER TABLE "events" ADD COLUMN "slug" varchar(8);--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_slug_unique" UNIQUE("slug");