import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, image } = await req.json();
    await connectToDatabase();
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        image,
      },
    });
    console.log(newUser);
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}