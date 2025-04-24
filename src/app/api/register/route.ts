import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnection } from "@/lib/mongo";
import { createUser } from "@/quaries/users";

export const POST = async (req: Request) => {
  const { name, email, password } = await req.json();
  console.log(name, email, password);

  await dbConnection();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  try {
    await createUser(newUser);
  } catch (err) {
    console.log(err);
    return new NextResponse("User has been not created", { status: 500 });
  }

  return new NextResponse("User has been created", { status: 201 });
};
