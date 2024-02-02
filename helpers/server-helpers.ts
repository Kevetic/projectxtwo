import prisma from "@/lib/db";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    throw new Error("unable to connect");
  }
};
