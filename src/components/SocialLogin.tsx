"use client";

import { doSocialLogin } from "@/app/actions";
import { Button } from "@nextui-org/react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <form action={doSocialLogin} className="mt-6 flex flex-col gap-3">
      <Button
        type="submit"
        value="google"
        name="action"
        startContent={<FcGoogle size={20} />}
        className="flex items-center justify-center gap-2 px-4 py-2 backdrop-blur-md text-white bg-white/20 border border-white/50 border-r-white/20 border-b-white/20 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:bg-white/30 transition cursor-pointer"
      >
        Sign In With Google
      </Button>

      <Button
        type="submit"
        value="github"
        name="action"
        startContent={<FaGithub size={20} />}
        className="flex items-center justify-center gap-2 px-4 py-2 backdrop-blur-md text-white bg-white/20 border border-white/50 border-r-white/20 border-b-white/20 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:bg-white/30 transition cursor-pointer"
      >
        Sign In With GitHub
      </Button>
    </form>
  );
};

export default SocialLogin;
