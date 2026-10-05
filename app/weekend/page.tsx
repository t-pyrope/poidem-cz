import { eventPageMetadata } from "@/lib/seo";
import {
  EventsPage,
  type EventSearchParams,
} from "@/app/components/EventsPage";

export const metadata = eventPageMetadata(
  "/weekend",
  "Мероприятия в Праге на выходных — Пойдём",
  "Куда сходить в Праге на этих выходных? Концерты, выставки, спектакли и встречи в субботу и воскресенье с адресами, временем и ценами.",
);

export default function Page({
  searchParams,
}: {
  searchParams: Promise<EventSearchParams>;
}) {
  return <EventsPage period="weekend" searchParams={searchParams} />;
}
