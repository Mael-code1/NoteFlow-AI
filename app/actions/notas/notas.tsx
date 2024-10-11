"use server";
import { prisma } from "@/app/lib/prisma";

export async function Createnotas(data: {
  title: string;
  content: string;
  color: string;
  tags: string[];
  userId: number;
}) {
  try {
    // Procesa cada etiqueta
    const tagRecords = await Promise.all(
      data.tags.map(async tagName => {
        return await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
      })
    );

    // Crear la nota y asociarla con las etiquetas
    const nota = await prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        color: data.color,
        userId: data.userId,
        tags: {
          create: tagRecords.map(tag => ({
            tag: { connect: { id: tag.id } },
          })),
        },
      },
    });

    return nota;
  } catch (error) {
    console.error("Error al crear la nota: ", error);
    throw error;
  }
}
