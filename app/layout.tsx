import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import getSession from "./lib/get-session";
import { Navbar } from "./components/navbar/Navbar";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session?.user;

  return (
    <html lang="en">
      <body className={`${font.className} flex min-h-screen flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
