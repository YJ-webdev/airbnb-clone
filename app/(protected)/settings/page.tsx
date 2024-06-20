import { auth } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  return <div className="translate-y-28">{JSON.stringify(session)}</div>;
};

export default SettingsPage;
