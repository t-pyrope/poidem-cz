import type { Metadata } from "next";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://poidem.cz",
);

export function eventPageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Пойдём",
      locale: "ru_RU",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
