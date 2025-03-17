"use client";

import { useState } from "react";
import Header from "./components/header";
import NightSky from "./common/background/Night/nightSky";
import HeroSection from "./components/hero-section";


export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen relative">
      {/* NightSky background - fixed position */}
      <NightSky />
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Header */}
        <Header darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        
        {/* Main Content */}
        <main className="container-custom">
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center justify-center">
            <HeroSection />
          </section>
          
          {/* Additional sections would go here */}
        </main>
      </div>
    </div>
  );
}