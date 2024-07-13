import { createListing } from "@/app/action/create-listing";
import getSession from "@/app/lib/get-session";

export async function getUser() {
  const session = await getSession();
  const user = session?.user;

const createListingWithId = createListing.bind(null, {
  userId: user?.id as string,

  return :  {
    user: User | undefined;
    createListingWithId: any;
}
});
}



