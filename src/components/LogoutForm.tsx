"use client";

import React from "react";
import { doLogout } from "@/app/actions";
import { Button } from "@nextui-org/react";

const LogoutForm = () => {
  return (
    <form action={doLogout}>
      <Button type="submit" className="bg-blue-400 my-2 text-white p-1 rounded">
        Logout
      </Button>
    </form>
  );
};

export default LogoutForm;
