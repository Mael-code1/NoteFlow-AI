'use server'
import { prisma } from "../../lib/prisma"; // Ajusta el path a tu setup

// Server Action
export async function createUser(data: { name: string; email: string; password: string }) {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      },
    });
    return user;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new Error("Error al crear usuario");
  }
}
