"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { LoginDialog } from "./form/login-dialog";
import { RegisterDialog } from "./form/register-dialog";

export const AuthDialog = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const handleOpenRegister = () => {
    setOpenLoginDialog(false); // Close login dialog
    setOpenRegisterDialog(true); // Open register dialog
  };

  const handleOpenLogin = () => {
    setOpenLoginDialog(true); // Open login dialog
    setOpenRegisterDialog(false); // Close register dialog
  };

  return (
    <>
      <Dialog open={openLoginDialog} onOpenChange={setOpenLoginDialog}>
        <DialogTrigger className="line-clamp-1 hidden cursor-pointer text-nowrap rounded-full py-3 text-center text-[15px] font-semibold transition hover:bg-neutral-100 md:block md:px-4 lg:mr-4">
          Airbnb your home
        </DialogTrigger>

        <LoginDialog onOpenRegister={handleOpenRegister} />
      </Dialog>
      <Dialog open={openRegisterDialog} onOpenChange={setOpenRegisterDialog}>
        <RegisterDialog onOpenLogin={handleOpenLogin} />
      </Dialog>
    </>
  );
};
