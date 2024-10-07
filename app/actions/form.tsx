"use server";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecretkey"
);

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new Error("Error al crear usuario");
  }
}

export async function getUser(data: { email: string; password: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    const token = await new SignJWT({ email: user.email, id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secretKey);
    return { user, token };
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw new Error("Credenciales incorrectas");
  }
}
