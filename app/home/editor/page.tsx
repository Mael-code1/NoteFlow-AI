"use client";
import MarkdownEditor from "../../components/MarkdownEditor";

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Editor de Markdown</h1>
      <MarkdownEditor />
    </div>
  );
}
