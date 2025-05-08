"use client";

import React from "react";
import { doLogout } from "@/app/actions";
import { Button } from "@nextui-org/react";

const LogoutForm = () => {
  return (
    <form action={doLogout}>
      <Button type="submit" className="bg-red-400 text-white px-4 py-2 rounded">
        Logout
      </Button>
    </form>
  );
};

export default LogoutForm;
