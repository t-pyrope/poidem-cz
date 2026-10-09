import { getEventCounts } from "@/lib/event-counts";
import { FooterLinks } from "@/app/components/FooterLinks";

export const AppFooter = async () => {
  const counts = await getEventCounts();
  return <FooterLinks counts={counts} />;
};
