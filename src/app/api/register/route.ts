import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { name, password, admin } = await request.json();

  await connect();

  const existingUser = await User.findOne({ name });

  if (existingUser) {
    return new NextResponse("Пользователь уже зарегистрирован", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    name,
    password: hashedPassword,
    role: admin? "admin": "user",
  });

  try {
    await newUser.save();
    return new NextResponse("Пользователь зарегистрирован", { status: 200 });
  } catch (err: any) {
    console.log(err)
    return new NextResponse(err, {
      status: 500,
    });
  }
};