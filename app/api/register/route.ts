import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  try {
    const { name, email, image } = await req.json();
    await connectToDatabase();
    let user: Prisma.UserCreateInput;
    user = {
      name: name,
      email: email,
      image: image,
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
