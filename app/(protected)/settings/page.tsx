import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const session = await auth();

  const user = session?.user;
  if (!user) {
    redirect("/");
  }

  return <div className="translate-y-28">{JSON.stringify(session)}</div>;
};

export default SettingsPage;
