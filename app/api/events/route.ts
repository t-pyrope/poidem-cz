import { rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { events, users } from "@/db/schema";
import { eventSchema } from "@/lib/validation";
import { randomUUID } from "node:crypto";
import { sendNewEventEmail } from "@/lib/email/event";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";

    if (!(await rateLimit(`events:${ip}`, 10, 60))) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { session } = await getUser();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const parsed = eventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const data = parsed.data;
    const id = randomUUID();

    if (user.role === "admin") {
      await db.insert(events).values({
        id,
        title: data.title,
        tags: data.tags,
        link: data.link,
        date: new Date(data.date),
        organization: data.organization,
        organizer: data.organizer,
        address: data.address,
        lang: data.lang,
      });
    } else {
      await sendNewEventEmail(data, user);
    }
  } catch (e) {
    console.error(e);
  }
}
