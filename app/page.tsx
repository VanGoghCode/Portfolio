"use client";

import { useState } from "react";
import Header from "./components/header";
import NightSky from "./common/background/Night/nightSky";
import HeroSection from "./components/hero-section";
import Footer from "./components/footer";

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
            id="home"
            className="flex items-end justify-center"
          >
            <Footer />
          </section>
        </main>
      </div>
    </div>
  );
}
