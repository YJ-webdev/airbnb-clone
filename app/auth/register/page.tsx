"use client";

import { RegisterDialog } from "@/app/components/form/register-dialog";
import { Dialog } from "@/components/ui/dialog";

export default function AuthLoginPage() {
  return (
    <>
      <Dialog>
        <div className="mx-auto mb-7 mt-5 flex max-h-[75%] max-w-[480px] flex-col overflow-hidden p-0">
          <RegisterDialog className="border-none" />
        </div>
      </Dialog>
    </>
  );
}
