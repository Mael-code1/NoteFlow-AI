import { prisma } from "../../lib/prisma";

export async function notas(data: {
  title: string;
  etiquetes: string[];
  content: string;
  color: string;
  userId: number;
}) {
  try {
    const notas = await prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        color: data.color,
        userId: data.userId,
        tags: {
          create: data.etiquetes.map(etiquita => ({
            tag: {
              connectOrCreate: {
                where: { name: etiquita },
                create: { name: etiquita },
              },
            },
          })),
        },
      },
      include: { tags: true },
    });
    return notas;
  } catch (error) {
    console.error("Error al crear la nota: ", error);
    throw error;
  }
}
