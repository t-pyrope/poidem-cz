import { eventPageMetadata } from "@/lib/seo";
import {
  EventsPage,
  type EventSearchParams,
} from "@/app/components/EventsPage";

export const metadata = eventPageMetadata(
  "/today",
  "Мероприятия в Праге сегодня — Пойдём",
  "Куда сходить в Праге сегодня? Концерты, выставки, спектакли и встречи. Афиша на сегодня с адресами, временем и ценами.",
);

export default function Page({
  searchParams,
}: {
  searchParams: Promise<EventSearchParams>;
}) {
  return <EventsPage period="today" searchParams={searchParams} />;
}
