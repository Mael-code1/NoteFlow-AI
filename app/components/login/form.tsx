'use server'
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function createUser(data: { name: string; email: string; password: string }) {
  const hashepassword = await bcrypt.hash(data.password, 10)
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashepassword
      },
    });
    return user;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new Error("Error al crear usuario");
  } finally{
    redirect('http://localhost:3000/home')
  }
}
