/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/model/user-model";

export async function createUser(user: any) {
  try {
    await User.create(user);
  } catch (err) {
    console.log(err);
  }
}
