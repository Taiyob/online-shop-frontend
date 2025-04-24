import mongoose from "mongoose";

export async function dbConnection() {
  try {
    const conn = await mongoose.connect(String(process.env.DATABASE_URL));
    return conn;
  } catch (err) {
    console.log(err);
    throw new Error("Error connections");
  }
}
