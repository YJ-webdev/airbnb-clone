"use client";

import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog"; // Assuming you're using a Dialog component from Shadcn UI
import { LoginDialog } from "./login-dialog";
import { RegisterDialog } from "./register-dialog";

export const AuthDialog = ({
  title,
  urlError,
}: {
  title?: string;
  urlError?: string;
}) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register dialogs

  const handleToggle = () => {
    setIsLogin((prev) => !prev); // Toggle between login and register
  };

  return (
    <>
      {isLogin ? (
        <LoginDialog
          handleToggle={handleToggle}
          title={title}
          urlError={urlError}
        />
      ) : (
        <RegisterDialog handleToggle={handleToggle} />
      )}
    </>
  );
};
