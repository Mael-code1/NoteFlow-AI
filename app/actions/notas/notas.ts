"use server";
import { prisma } from "@/app/lib/prisma";
import { UserID } from "../users/users";

interface notasProps {
  title: string;
  content: string;
  color: string;
  tags: string;
  userId: number;
}

export async function Createnotas({ color, content, tags, title, userId }: notasProps) {
  const existingTag = await prisma.tag.findFirst({
    where: {
      name: tags,
    },
  });
  let tag;
  if (existingTag) {
    tag = existingTag;
  } else {
    tag = await prisma.tag.create({
      data: { name: tags },
    });
  }
  const nota = await prisma.note.create({
    data: {
      title: title,
      content: content,
      color: color,
      userId: userId,
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
  const id = await UserID()
  try {
    const notas = await prisma.note.findMany({
      where: {
        userId: id,
      }
    })
    // console.log(notas);
    return notas

  } catch (e) {
    console.log("error al aser la consulta");
  }
}

interface Notaseditarprops {
  id: number
  title: string
  content: string
}


export async function GetNotasEdit({ id, title, content }: Notaseditarprops) {
  const data = [id,title,content]
  console.log(typeof(data));
  return data
}


