import {
  EventsPage,
  type EventSearchParams,
} from "@/app/components/EventsPage";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<EventSearchParams>;
}) {
  return <EventsPage searchParams={searchParams} />;
}
