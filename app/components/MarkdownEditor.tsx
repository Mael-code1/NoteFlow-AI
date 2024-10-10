"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { Createnotas } from "../actions/notas/notas";

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(e.target.value);
  };

  const insertAtCursor = (text: string) => {
    const textarea = document.getElementById(
      "markdown-editor"
    ) as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = markdownText.substring(0, start);
    const after = markdownText.substring(end, markdownText.length);
    setMarkdownText(before + text + after);
    textarea.focus();
    textarea.setSelectionRange(start + text.length, start + text.length);
  };

  const addTitle = () => {
    insertAtCursor("# Título \n");
  };

  const addList = () => {
    insertAtCursor("- Elemento de lista\n");
  };

  const addBold = () => {
    insertAtCursor("**Texto en negrita**");
  };

  const addItalic = () => {
    insertAtCursor("_Texto en cursiva_");
  };

  const addCodeBlock = () => {
    insertAtCursor("\n```\nCódigo aquí\n```\n");
  };

  const addNota = async () => {
    const title = markdownText.split("\n")[0] || "Sin título";
    const content = markdownText;
    const color = "#ffffff";
    const etiquetes = "matematicas";
    const userId = 1;

    try {
      const createNote = await Createnotas({
        title,
        content,
        color,
        etiquetes,
        userId,
      });
      console.log("Nota creada", createNote);
    } catch (error) {
      console.error("Error al crear la nota", error);
    }
  };

  return (
    <div className="flex flex-col h-auto w-full">
      <div className="w-full md:w-1/2 mb-2 space-x-2">
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={addTitle}
        >
          H1
        </button>
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={addList}
        >
          Lista
        </button>
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={addBold}
        >
          Negrita
        </button>
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={addItalic}
        >
          Cursiva
        </button>
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={addCodeBlock}
        >
          Código
        </button>
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={addNota}
        >
          Guardar
        </button>
      </div>
      <div className="flex flex-row gap-4">
        <textarea
          id="markdown-editor"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md text-black"
          value={markdownText}
          onChange={handleInputChange}
          placeholder="Escribe tu Markdown aquí..."
          rows={20}
        />

        <div className="w-full md:w-1/2 p-2 border  rounded-md bg-slate-800 text-white">
          <ReactMarkdown
            children={markdownText}
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-blue-500">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-blue-400">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-medium text-blue-300">
                  {children}
                </h3>
              ),
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
          />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
