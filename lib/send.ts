import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@airbnbclone.com",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click </p><a href="${confirmLink}">here</a> to confirm your email`,
    text: "Click the link below to reset your password:",
  });
};
