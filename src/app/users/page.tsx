import { fetchClient } from "@/lib/fetch-client";
import { redirect } from "next/navigation";
import React from "react";

interface User {
  id: string;
  user_name: string;
}

interface UsersResponse {
  data: User[];
}

const UsersPage = async () => {
  let users: UsersResponse | null = null;
  try {
    const res = await fetchClient(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      if (res.status === 403) {
        console.log("token expired");
        redirect("/");
      }
      throw new Error("Failed to fetch users");
    }

    users = await res.json();
  } catch (error) {
    console.error(error);
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center flex-col">
      {users?.data.map((user) => (
        <ul key={user.id}>
          <li>
            <h1>{user.user_name}</h1>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default UsersPage;
