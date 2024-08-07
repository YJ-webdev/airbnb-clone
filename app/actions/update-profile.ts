"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "../lib/db";
import getSession from "../lib/get-session";

import { UpdateProfile, UpdateProfileSchema } from "@/schema/profile";

export async function updateProfile(values: UpdateProfile) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Not logged in");
  }

  const { name, email } = UpdateProfileSchema.parse(values);

  await prisma.user.update({
    where: { id: userId },
    data: { name, email },
  });

  revalidateTag("settings");
  revalidatePath("/settings");
}

// export const updatePassword = async (values: UpdatePassword) => {
//   const session = await getSession();
//   const userId = session?.user?.id;

//   if (!userId) {
//     throw new Error("Not logged in");
//   }

//   const validatedFields = UpdatePasswordSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields" };
//   }

//   const { currentPassword, newPassword, confirmPassword } =
//     validatedFields.data;

//   if (newPassword !== confirmPassword) {
//     return { error: "Passwords do not match!" };
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: { hashedPassword: true },
//     });

//     if (!user) {
//       return { error: "User not found." };
//     }

//     // const passwordMatch = await compare(currentPassword, user.hashedPassword);

//     // if (!passwordMatch) {
//     //   return { error: "Current password is incorrect." };
//     // }

//     const hashedNewPassword = await hash(newPassword, 10);

//     await prisma.user.update({
//       where: { id: userId },
//       data: { hashedPassword: hashedNewPassword },
//     });

//     revalidatePath("/settings");
//     return { success: "Password updated!" };
//   } catch (error) {
//     return { error: "Failed to update password. Please try again." };
//   }
// };
