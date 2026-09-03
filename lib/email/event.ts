import { FROM_EMAIL, getResendClient } from "@/lib/email/client";
import { User } from "@/app/types";
import { EventFromForm } from "@/lib/validation";

export async function sendNewEventEmail(event: EventFromForm, user: User) {
  const resend = getResendClient();

  await resend.emails.send({
    from: FROM_EMAIL,
    to: process.env.TO_EMAIL ?? "",
    subject: "Заявление на добавление мероприятия",
    html: `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f9fafb; padding:40px 20px;">
    <div style="max-width:480px; margin:0 auto; background:#ffffff; padding:32px; border-radius:16px; border:1px solid #e5e7eb;">
      
      <h2 style="margin:0 0 16px; font-size:20px; font-weight:600; color:#111827;">
        Мероприятие
      </h2>

      <p>Пользователь ${user.email} хочет добавить мероприятие</p>
      <p>Название: ${event.title}</p>
      <p>Ссылка: ${event.link}</p>
      <p>Дата: ${event.date}</p>
      <p>Тэги: ${event.tags.join(", ")}</p>
      <p>Организация: ${event.organization}</p>
      <p>Организатор: ${event.organizer}</p>
      <p>Адрес: ${event.address}</p>
      <p>Язык: ${event.lang}</p>
      <p>Минимальная цена: ${event.minPrice}</p>
      <p>Максимальная цена: ${event.maxPrice}</p>
  </div>
`,
  });
}
