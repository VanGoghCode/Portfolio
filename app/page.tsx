// page.tsx

"use client";

import { useState } from "react";
import Header from "./components/home/header";
import NightSky from "./common/background/Night/nightSky";
import HeroSection from "./components/home/hero-section";
import Footer from "./components/home/footer";
import About from "./components/about/about";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen relative">
      <NightSky />
      <div className="relative z-10">
        <Header darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        <main className="container-custom">
          <section
            id="home"
            className="min-h-screen flex items-center justify-center"
          >
            <HeroSection />
          </section>
          <section
            id="about"
            className="min-h-screen flex items-center justify-center"
          >
            <About />
          </section>
          <section
            id="contact"
            className="flex items-end justify-center"
          >
            <Footer />
          </section>
        </main>
      </div>
    </div>
  );
}
