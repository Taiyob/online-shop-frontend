import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
    credentials: "include",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.accessToken;
      console.log(token);
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      //NEXT_PUBLIC_SERVER_URL
      return headers;
    },
  }),
  tagTypes: ["role", "status", "User"],
  endpoints: () => ({}),
});
