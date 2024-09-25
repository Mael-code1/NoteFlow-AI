export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>hola mundo</h1>
      <section>{children}</section>
    </div>
  );
}
