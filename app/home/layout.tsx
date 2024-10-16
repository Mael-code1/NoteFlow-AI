export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="h-7 w-full bg-emerald-700 "></nav>
      {children}
    </section>
  );
}
