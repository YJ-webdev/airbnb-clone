"use server";

import getSession from "../lib/get-session";

export const getUser = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  const user = session?.user;

  return user;
};
