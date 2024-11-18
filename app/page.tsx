"use client";
import Features from './components/Features';
import { HeroSection } from './components/HeroSection';
import  {NavHome}  from './components/nav';

const Home = () => {
  return (
    <>
    <NavHome/>
    <main className="px-10 py-5 flex flex-1 justify-center">
          <div className="max-w-[960px] w-full flex flex-col gap-y-60">
            <HeroSection />
            <Features/>
          </div>
        </main>
    </>
  );
};

export default Home;
