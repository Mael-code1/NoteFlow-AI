"use server";
import { prisma } from "@/app/lib/prisma";
import { UserID } from "../users/users";

export async function Createnotas(data: {
  title: string;
  content: string;
  color: string;
  tags: string;
  userId: number;
}) {
  const existingTag = await prisma.tag.findFirst({
    where: {
      name: data.tags,
    },
  });
  let tag;
  if (existingTag) {
    tag = existingTag;
  } else {
    tag = await prisma.tag.create({
      data: { name: data.tags },
    });
  }
  const nota = await prisma.note.create({
    data: {
      title: data.title,
      content: data.content,
      color: data.color,
      userId: data.userId,
      tags: {
        create: {
          tagId: tag.id,
        },
      },
    },
  });
  return nota;
}

export async function getNotas() {
  try {
    const notas = await prisma.note.findMany({
      where: { isDeleted: false }, // Filtra las notas no eliminadas
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return notas.map((note) => ({
      id: note.id,
      title: note.title,
      content: note.content,
      color: note.color,
      createdAt: note.createdAt,
      completedAt: note.completedAt,
      isDeleted: note.isDeleted,
      userId: note.userId,
      tags: note.tags.map((tag) => tag.tag.name),
    }));
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes.");
  }
}

interface NoteUpdateProps {
  id: number;
  title: string;
  content: string;
  color?: string;
  tags?: string[]; // Permite múltiples etiquetas opcionales
}

// Obtener una nota por su ID para editar
export async function getNoteById(id: number) {
  try {
    const note = await prisma.note.findUnique({
      where: {id },
      include: {
        tags: {
          include: {
            tag: true, // Incluye el nombre de las etiquetas relacionadas
          },
        },
      },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    // Formateamos los datos para que el editor pueda interpretarlos fácilmente
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      color: note.color,
      tags: note.tags.map((tag) => tag.tag.name), // Lista de nombres de etiquetas
    };
  } catch (error) {
    console.error("Error fetching note:", error);
    throw new Error("Failed to fetch note.");
  }
}

// Actualizar una nota con los cambios del editor
export async function updateNote({ id, title, content, color, tags }: NoteUpdateProps) {
  try {
    // Actualizar datos principales de la nota
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
        color,
      },
    });

    // Manejo de etiquetas
    if (tags && tags.length > 0) {
      // Elimina etiquetas antiguas
      await prisma.noteTag.deleteMany({
        where: { noteId: id },
      });

      // Agrega las nuevas etiquetas
      for (const tagName of tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });



        await prisma.noteTag.create({
          data: {
            noteId: id,
            tagId: tag.id,
          },
        });
      }
    }

    return updatedNote;
  } catch (error) {
    console.error("Error updating note:", error);
    throw new Error("Failed to update note.");
  }
}



export async function formatNoteData(data: {
  id: number;
  title: string;
  content: string;
  color?: string;
  tags?: string[];
}) {
  return await updateNote(data);
}



// Acción para eliminar una nota
export async function deleteNoteById(id: number) {
  try {
    // Eliminar la relación entre la nota y las etiquetas
    await prisma.noteTag.deleteMany({
      where: { noteId: id },
    });

    // Eliminar la nota
    await prisma.note.delete({
      where: { id },
    });

    return { message: "Nota eliminada con éxito" };
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    throw new Error("No se pudo eliminar la nota.");
  }
}
