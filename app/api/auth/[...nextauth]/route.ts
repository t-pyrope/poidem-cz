import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth/options";
// import { rateLimit } from "@/lib/rate-limit";
// import { NextResponse } from "next/server";

const handler = NextAuth(authOptions);

type NextAuthRouteContext = {
  params: Promise<{ nextauth: string[] }>;
};

export async function POST(req: Request, context: NextAuthRouteContext) {
  // const ip = req.headers.get("x-forwarded-for") ?? "anonymous";

  // const limit = await rateLimit(`login:${ip}`, 10, 60);

  // if (!limit) {
  //   return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  // }

  return handler(req, context);
}

export { handler as GET };
