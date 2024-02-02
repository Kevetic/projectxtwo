import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, email, image, username, password } = await req.json();
    await connectToDatabase();
    let user: Prisma.UserCreateInput;
    user = {
      name: name,
      email: email,
      image: image,
      username: null,
      password: null,
    };
    const newUser = await prisma.user.create({ data: user });
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "error while registering" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
