// import { Resend } from "resend";

// const resend = new Resend({
//   apiKey: process.env.RESEND_API_KEY,
//   apiBase: process.env.RESEND_API_BASE,
// });

// export const sendPasswordResetEmail = async (email: string, token: string) => {
//   const confirmLink = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;
//   const emailData = {
//     from: process.env.RESEND_FROM_EMAIL,
//     to: email,
//     subject: "Password Reset",
//     html: `<p>Click the link below to reset your password:</p><a href="${confirmLink}">${confirmLink}</a>`,
//     text: "Click the link below to reset your password:",
//     textAlt: "Reset your password",
//     textLink: confirmLink,
//   };

//   try {
//     await resend.emails.send(emailData);
//   } catch (error) {
//     console.error(error);
//   }
// };
