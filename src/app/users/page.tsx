import { fetchClient } from "@/lib/fetch-client";
import { redirect } from "next/navigation";
import React from "react";

interface User {
  _id: string;
  name: string;
}

interface UsersResponse {
  data: User[];
}

const UsersPage = async () => {
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
  }

  const users: UsersResponse = await res.json();
  console.log(users);

  return (
    <div className="flex justify-center items-center flex-col">
      {users?.data.map((user) => (
        <ul key={user._id}>
          <li>
            <h1>{user.name}</h1>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default UsersPage;
