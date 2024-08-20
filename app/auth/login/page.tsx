"use client";

import Footer from "@/app/components/footer";
import { LoginDialog } from "@/app/components/form/login-dialog";
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
    <>
      <Dialog>
        <div className="mx-auto mb-7 mt-5 flex max-h-[75%] max-w-[480px] flex-col overflow-hidden p-0">
          <LoginDialog title="Somthing went wrong.." urlError={urlError} />
        </div>
      </Dialog>
    </>
  );
}
