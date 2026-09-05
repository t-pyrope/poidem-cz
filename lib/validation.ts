import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(4, "Минимум 4 символа ")
    .max(90, "Максимум 90 символов"),
  link: z.string().min(10, "Link is required"),
  date: z.string().min(1, "Date is required"),
  tags: z.array(z.string()),
  organization: z.string(),
  organizer: z.string(),
  address: z.string().min(1, "Address is required"),
  lang: z.string().min(1, "Language is required"),
  minPrice: z.coerce.number().min(0),
  maxPrice: z.coerce.number().min(0),
});

export type EventFormValues = z.infer<typeof eventSchema>;
