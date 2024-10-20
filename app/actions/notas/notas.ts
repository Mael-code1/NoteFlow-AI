"use server";
import { prisma } from "@/app/lib/prisma";

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
