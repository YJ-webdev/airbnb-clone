import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import getSession from "./lib/get-session";
import { FavoritesProvider } from "./context/favorite-context";
import { ProgressProvider } from "./context/progress-context";
import { SearchProvider } from "./context/search-context";

const font = Nunito_Sans({ subsets: ["latin"] });

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
        <SearchProvider>
          <FavoritesProvider initialFavoriteIds={initialFavoriteIds}>
            <ProgressProvider>
              <main className="flex-1">{children}</main>

              <Toaster />
            </ProgressProvider>
          </FavoritesProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
