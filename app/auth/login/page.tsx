"use client";

import { LoginDialog } from "@/app/components/login-dialog/login-dialog";
import { Dialog } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function AuthLoginPage() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  return (
    <Dialog>
      <div className="fle mx-auto mt-5 max-h-[75%] max-w-[480px] flex-col overflow-hidden p-0">
        <LoginDialog title="Somthing went wrong.." urlError={urlError} />
      </div>
    </Dialog>
  );
}
