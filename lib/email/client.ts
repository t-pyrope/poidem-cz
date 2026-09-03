import { Resend } from "resend";

export const APP_NAME = "Poidem.cz";

export const FROM_EMAIL = `${APP_NAME} от Marmalade skies <hello@marmaladeskies.dev>`;

export function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("Missing RESEND_API_KEY");
  }
  return new Resend(key);
}
