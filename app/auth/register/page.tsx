import AuthRegister from "@/app/components/auth-register";
import getSession from "@/app/lib/get-session";
import { redirect } from "next/navigation";

export default async function AuthLoginPage() {
  const session = await getSession();
  const user = session?.user;

  return !user ? <AuthRegister /> : redirect("/");
}
