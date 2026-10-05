import { eventPageMetadata } from "@/lib/seo";
import {
  EventsPage,
  type EventSearchParams,
} from "@/app/components/EventsPage";

export const metadata = eventPageMetadata(
  "/tomorrow",
  "Мероприятия в Праге завтра — Пойдём",
  "Куда сходить в Праге завтра? Концерты, выставки, спектакли и встречи. Планируйте день с афишей, адресами, временем и ценами.",
);

export default function Page({
  searchParams,
}: {
  searchParams: Promise<EventSearchParams>;
}) {
  return <EventsPage period="tomorrow" searchParams={searchParams} />;
}
