'use client';

import { useEffect, useState } from "react";
import MarkdownEditor from "../../../components/MarkdownEditor";

export default function Home({ params }: { params: { id: string } }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    // Simulando la resolución de la promesa de `params` para este ejemplo.
    (async () => {
      const resolvedParams = await params; // Si params es una promesa.
      setId(resolvedParams.id);
    })();
  }, [params]);

  if (!id) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Editor de Markdown</h1>
      <MarkdownEditor />
    </div>
  );
}
