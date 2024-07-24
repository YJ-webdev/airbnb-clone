import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import getSession from "./lib/get-session";
import { FavoritesProvider } from "./context/favorite-context";
import { ProgressProvider } from "./context/progress-context";
import Navbar from "./components/navbar/navbar";
import {
  ContentWidthProvider,
  useContentWidth,
} from "./context/ContentWidthContext";

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
  const initialFavoriteIds = user?.favoriteIds || [];

  return (
    <html lang="en">
      <body className={`${font.className} flex min-h-screen flex-col`}>
        <FavoritesProvider initialFavoriteIds={initialFavoriteIds}>
          <ProgressProvider>
            <ContentWidthProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
            </ContentWidthProvider>
          </ProgressProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
