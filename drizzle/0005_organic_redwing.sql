CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "organization" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "organizer" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'user' NOT NULL;