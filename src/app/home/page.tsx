import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import LogoutForm from "@/components/LogoutForm";

const HomePage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <div className="max-w-max mx-auto">
      {session?.user?.image && session?.user?.name ? (
        <>
          <h1 className="text-5xl text-center font-bold my-2">
            This is Home page
          </h1>
          <h1>{session?.user?.name}</h1>
          <h3>{session?.user?.email}</h3>
          <Image
            src={session?.user?.image || "none"}
            alt="image"
            height="72"
            width="72"
            className="rounded-full"
          />
        </>
      ) : (
        <>
          <h3>Welcome, {session?.user?.email}</h3>
        </>
      )}
      <LogoutForm></LogoutForm>
    </div>
  );
};

export default HomePage;
