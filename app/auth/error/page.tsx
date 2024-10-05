"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component for styling
import Link from "next/link";

export default function AuthErrorPage() {
  const router = useRouter();

  // Navigate back to the home or login page
  const handleGoBack = () => {
    router.push("/login"); // Or navigate to a different route if needed
  };

  return (
    <div className="mb-20 mt-10 flex h-[60vh] flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Authentication Error</h1>
      <div className="flex flex-col items-center justify-center gap-2 p-8">
        <p>Oops! Something went wrong with your login attempt.</p>
        <p className="text-sm text-muted-foreground">
          Please try again or contact support if the issue persists.
        </p>
      </div>
      <Link
        href={`/`}
        className="rounded-lg bg-gradient-to-r from-rose-500 to-[#e3326d] px-8 py-4 text-center text-white hover:bg-zinc-700"
      >
        Go to home page
      </Link>
    </div>
  );
}
