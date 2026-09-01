import { getUser } from "@/lib/auth/user";

export default async function Page() {
  const user = await getUser();

  console.log(user);
  return <></>;
}
