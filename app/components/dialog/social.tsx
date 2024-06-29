import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "./button";
import { signIn } from "next-auth/react";

interface SocialProps {
  disabled?: boolean;
}

export const Social = ({ disabled }: SocialProps) => {
  // State to manage pending status
  const [isGooglePending, setIsGooglePending] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [isGithubPending, setIsGithubPending] = useState(false);

  // Function to handle sign-in
  const handleGoogle = async () => {
    setIsGooglePending(true);
    setDisabled2(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleGithub = async () => {
    setIsGithubPending(true);
    setDisabled2(true);
    try {
      await signIn("github");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="mt-7">
      <div className="mb-2 items-center justify-center">
        <hr />
        <p className="z-10 mx-auto w-10 -translate-y-3 bg-white text-center text-sm text-black">
          or
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Button
          outline
          label="Google"
          icon={FcGoogle}
          onClick={() => handleGoogle()}
          disabled={disabled}
          disabled2={disabled2}
          connecting={isGooglePending}
        />
        <Button
          outline
          label="Github"
          icon={FaGithub}
          onClick={() => handleGithub()}
          disabled={disabled}
          disabled2={disabled2}
          connecting={isGithubPending}
        />
      </div>
    </div>
  );
};
