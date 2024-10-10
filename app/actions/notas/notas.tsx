import { prisma } from "@/app/lib/prisma";

export async function Createnotas(data: {
  title: string;
  tags: string[] | undefined; // Permitir undefined si no estás seguro
  content: string;
  color: string;
  userId: number;
}) {
  try {
    const notas = await prisma.note.create({
      data: { title: data.title, content: data.content , color:},
    });
    return notas;
  } catch (error) {
    console.error("Error al crear la nota: ", error);
    throw error;
  }
}
