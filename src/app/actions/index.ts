/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formdata: any) {
  const action = formdata.get("action");
  await signIn(action, { redirectTo: "/home" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response || response.error) {
      return { ok: false, error: response?.error || "Invalid credentials" };
    }

    return { ok: true };
  } catch (error) {
    console.log("doCredentialLogin error:", error);
    return { ok: false, error: "Server error" };
  }
}

// export async function doCredentialLogin(formdata: any) {
//   try {
//     const response = await signIn("credentials", {
//       email: formdata.get("email"),
//       password: formdata.get("password"),
//       redirect: false,
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Server Error: 5000");
//   }
// }
