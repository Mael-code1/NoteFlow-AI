import { Navcomponet } from "../components/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <Navcomponet />
      {children}
    </section>
  );
}
