import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../button";
import { socialLogIn } from "@/action/login";

export const Social = () => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="relative mb-2">
        <hr />
        <p className="bg-white z-10 text-sm w-10 -translate-y-3 translate-x-52 text-center text-black absolute">
          or
        </p>
      </div>
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => socialLogIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={FaGithub}
        onClick={() => socialLogIn("github")}
      />
    </div>
  );
};
