import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

import { authOptions } from "@/lib/auth/options";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

const SESSION_COOKIE_NAMES = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

async function deleteSession() {
  try {
    const cookieStore = await cookies();

    for (const cookie of cookieStore.getAll()) {
      if (
        SESSION_COOKIE_NAMES.includes(cookie.name) ||
        SESSION_COOKIE_NAMES.some((name) => cookie.name.startsWith(`${name}.`))
      ) {
        cookieStore.delete(cookie.name);
      }
    }
  } catch {
    // Cookie mutation is only available in Route Handlers and Server Actions.
  }
}

export async function getUser() {
  const session = await getServerSession(authOptions);
  let user;

  if (
    session &&
    session.user &&
    "id" in session.user &&
    typeof session.user.id === "string"
  ) {
    user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    });

    if (!user) {
      await deleteSession();
    }
  }

  return {
    session: user ? session : null,
  };
}
