"use client";
import { Button } from "@/app/components/button";
import MarkdownEditor from "../../components/MarkdownEditor";
import { jwtVerify } from "jose";

export async function UserID(): promise<number | undefined> {
  const cookies = document.cookie;
  const token = cookies
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];

  if (token) {
    try {
      const secretKey = new TextEncoder().encode(
        process.env.JWT_SECRET || "supersecretkey"
      );
      const { payload } = await jwtVerify(token, secretKey);
      const id = payload.id as number;
      console.log(id);

      return id;

      // return payload.id as number;
    } catch (error) {
      console.error("Error verificando el token:", error);
    }
  } else {
    console.log("Token no encontrado");
  }
}

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Editor de Markdown</h1>
      <Button text="token" onClick={UserID} />
      <MarkdownEditor />
    </div>
  );
}
