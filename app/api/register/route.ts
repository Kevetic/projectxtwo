import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
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
