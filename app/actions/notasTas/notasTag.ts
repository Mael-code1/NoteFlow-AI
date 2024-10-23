export async function fetchGraphData() {
  const notes = await prisma.note.findMany({
    include: {
      // Usa el nombre correcto de la relación
      noteTags: {
        // O el nombre que corresponda en tu esquema
        include: {
          tag: true, // Incluye los detalles de las etiquetas asociadas
        },
      },
    },
  });

  return notes;
}
