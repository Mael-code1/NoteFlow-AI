export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='h-screen w-full flex justify-center items-center'>
      <section className=''>{children}</section>
    </main>
  );
}
