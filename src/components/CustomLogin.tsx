"use client";

import { doCredentialLogin } from "@/app/actions";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CustomLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      console.log("Formdata:", Object.fromEntries(formData.entries()));

      const response = await doCredentialLogin(formData);
      console.log("Response:", response);

      if (response?.ok) {
        router.refresh();
        router.push("/home");
      } else {
        console.log("Login failed:", response);
        setErr("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Data not found");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
    >
      <div className="my-2">
        <label htmlFor="email">Email Address</label>
        <Input
          className="border mx-2 border-gray-500 rounded"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="my-2">
        <label htmlFor="password">Password</label>
        <Input
          className="border mx-2 border-gray-500 rounded"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {err && <p className="text-red-500">{err}</p>}
      <Button
        type="submit"
        className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
      >
        Credential Login
      </Button>
    </form>
  );
};

export default CustomLogin;
