"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { getNoteById,updateNote} from "@/app/actions/notas/notas";
import { UserID } from "../actions/users/users";

const MarkdownEditor = () => {
  const { id } = useParams();
  const [markdownText, setMarkdownText] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [noteId, setNoteId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        setNoteId(parsedId);
        fetchNoteById(parsedId);
      }
    }
  }, [id]);

  const fetchNoteById = async (noteId: number) => {
    try {
      setError(null);
      setIsLoading(true);
      const note = await getNoteById(noteId); // Llama a la función que obtiene la nota desde la base de datos.
      setMarkdownText(note.content || "");
      setTags(note.tags.join(", ")); // Convierte las etiquetas en un string separado por comas.
      setSuccess("Nota cargada exitosamente.");
    } catch (error) {
      console.error("Error al cargar la nota:", error);
      setError("Hubo un problema al cargar la nota.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async () => {
    const title = markdownText.split("\n")[0] || "Sin título";
    const content = markdownText.trim();
    const color = "#ffffff";
    const etiquetes = tags.split(",").map((tag) => tag.trim()); // Convierte el string de etiquetas en un array.
    const userId = await UserID();

    if (!content) {
      setError("El contenido de la nota no puede estar vacío.");
      return;
    }

    if (etiquetes.length === 0) {
      setError("Las etiquetas no pueden estar vacías.");
      return;
    }

    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      setIsLoading(true);

      if (noteId) {
        // Actualiza una nota existente
        await updateNote({
          id: noteId,
          title,
          content,
          color,
          tags: etiquetes,
        });
        setSuccess("Nota actualizada exitosamente.");
      } else {
        // Crea una nueva nota
        const newNote = await Createnotas({
          title,
          content,
          color,
          tags: etiquetes.join(", "),
          userId,
        });
        console.log("Nota creada exitosamente:", newNote);
        setSuccess("Nota creada exitosamente.");
        setMarkdownText("");
        setTags("");
      }
    } catch (error) {
      console.error("Error al guardar la nota:", error);
      setError("Hubo un error al guardar la nota.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-auto w-full">
      <div className="w-full md:w-1/2 mb-2 space-x-2">
        <div className="flex space-x-2 mb-4">
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={() => setMarkdownText((prev) => `${prev}\n# Nuevo Título\n`)}
          >
            H1
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={() => setMarkdownText((prev) => `${prev}\n- Elemento 1\n`)}
          >
            Lista
          </button>
        </div>
        <input
          type="text"
          placeholder="Escribe etiquetas separadas por comas"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full mb-2 text-black"
        />
        <button
          className={`p-2 bg-green-500 text-white rounded-md ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={saveNote}
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
      <div className="flex flex-row gap-4">
        <textarea
          id="markdown-editor"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md text-black"
          value={markdownText}
          onChange={(e) => setMarkdownText(e.target.value)}
          placeholder="Escribe tu Markdown aquí..."
          rows={20}
        />
        <div className="w-full md:w-1/2 p-2 border rounded-md bg-slate-800 text-white">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdownText}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
