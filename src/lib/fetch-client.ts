/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";

export const fetchClient = async (url: any, options: any) => {
  const session = await auth();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(session && { Authorization: `${session.accessToken}` }),
    },
  });
};

// https://mrpops.ua/en/
