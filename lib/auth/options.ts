import { compare } from "bcrypt";
import { and, eq } from "drizzle-orm";
import type { Account, NextAuthOptions, Profile, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { accounts, users } from "@/db/schema";
import { db } from "@/lib/db";
import { randomUUID } from "node:crypto";

type GitHubEmail = {
  email?: string;
  primary?: boolean;
  verified?: boolean;
};

function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() || null;
}

function isUniqueViolation(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

async function getVerifiedOAuthEmail(
  account: Account,
  profile?: Profile,
): Promise<string | null> {
  if (account.provider === "google") {
    const googleProfile = profile as Profile & { email_verified?: boolean };

    if (googleProfile.email_verified !== true) {
      return null;
    }

    return normalizeEmail(googleProfile.email);
  }

  if (account.provider === "github") {
    if (!account.access_token) {
      return null;
    }

    const response = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${account.access_token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) {
      return null;
    }

    const emails = (await response.json()) as GitHubEmail[];
    const primaryVerifiedEmail = emails.find(
      (email) => email.primary === true && email.verified === true,
    );

    return normalizeEmail(primaryVerifiedEmail?.email);
  }

  return null;
}

async function resolveOAuthUserId(
  user: User,
  account: Account,
  profile?: Profile,
) {
  if (!account.providerAccountId) {
    return null;
  }

  const linkedAccount = await db.query.accounts.findFirst({
    where: and(
      eq(accounts.provider, account.provider),
      eq(accounts.providerAccountId, account.providerAccountId),
    ),
  });

  if (linkedAccount) {
    const linkedUser = await db.query.users.findFirst({
      where: eq(users.id, linkedAccount.userId),
    });

    user.id = linkedAccount.userId;
    user.email = linkedUser?.email ?? null;
    return linkedAccount.userId;
  }

  const verifiedEmail = await getVerifiedOAuthEmail(account, profile);

  try {
    return await db.transaction(async (tx) => {
      const accountCreatedDuringRace = await tx.query.accounts.findFirst({
        where: and(
          eq(accounts.provider, account.provider),
          eq(accounts.providerAccountId, account.providerAccountId),
        ),
      });

      if (accountCreatedDuringRace) {
        const linkedUser = await tx.query.users.findFirst({
          where: eq(users.id, accountCreatedDuringRace.userId),
        });

        user.id = accountCreatedDuringRace.userId;
        user.email = linkedUser?.email ?? null;
        return accountCreatedDuringRace.userId;
      }

      let linkedUser = verifiedEmail
        ? await tx.query.users.findFirst({
            where: eq(users.email, verifiedEmail),
          })
        : null;

      if (!linkedUser) {
        const [createdUser] = await tx
          .insert(users)
          .values({
            id: randomUUID(),
            email: verifiedEmail,
          })
          .returning({
            id: users.id,
            email: users.email,
            password: users.password,
          });

        linkedUser = createdUser;
      }

      if (!linkedUser) {
        return null;
      }

      await tx.insert(accounts).values({
        userId: linkedUser.id,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      });

      user.id = linkedUser.id;
      user.email = linkedUser.email;

      return linkedUser.id;
    });
  } catch (error) {
    if (!isUniqueViolation(error)) {
      throw error;
    }

    const linkedAccount = await db.query.accounts.findFirst({
      where: and(
        eq(accounts.provider, account.provider),
        eq(accounts.providerAccountId, account.providerAccountId),
      ),
    });

    if (linkedAccount) {
      const linkedUser = await db.query.users.findFirst({
        where: eq(users.id, linkedAccount.userId),
      });

      user.id = linkedAccount.userId;
      user.email = linkedUser?.email ?? null;
      return linkedAccount.userId;
    }

    const existingUser = verifiedEmail
      ? await db.query.users.findFirst({
          where: eq(users.email, verifiedEmail),
        })
      : null;

    if (!existingUser) {
      return null;
    }

    await db.insert(accounts).values({
      userId: existingUser.id,
      provider: account.provider,
      providerAccountId: account.providerAccountId,
    });

    user.id = existingUser.id;
    user.email = existingUser.email;

    return existingUser.id;
  }
}

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.trim().toLowerCase();
      const password = credentials?.password;

      if (!email || !password) {
        return null;
      }

      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user?.password) {
        return null;
      }

      const isValid = await compare(password, user.password);

      if (!isValid) {
        return null;
      }

      return {
        id: String(user.id),
        email: user.email,
      };
    },
  }),
];

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  );
}

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: "read:user user:email" } },
    }),
  );
}

export const authOptions = {
  providers,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider !== "credentials") {
        const linkedUserId = await resolveOAuthUserId(user, account, profile);

        if (!linkedUserId) {
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          id: "",
        },
      };
      if (session.user && token.sub) {
        newSession.user.id = token.sub;
      }

      return newSession;
    },
  },
} satisfies NextAuthOptions;
