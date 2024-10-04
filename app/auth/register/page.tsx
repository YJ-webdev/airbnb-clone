"use client";

import { RegisterDialog } from "@/app/components/form/register-dialog";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";

export default function AuthLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const handleToggle = () => {
    setIsLogin((prev) => !prev); // Toggle between login and register
  };

  return (
    <>
      <Dialog>
        <div className="mx-auto mb-7 mt-5 flex max-h-[75%] max-w-[480px] flex-col overflow-hidden p-0">
          <RegisterDialog handleToggle={handleToggle} className="border-none" />
        </div>
      </Dialog>
    </>
  );
}
