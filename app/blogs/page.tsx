// blogs/page.tsx

"use client";

import { useState } from "react";
import Header from "../components/home/header";
import NightSky from "../common/background/Night/nightSky";
import Footer from "../components/home/footer";
import BlogsList from "../components/blogs/BlogsList";

export default function BlogsPage() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen relative">
      <NightSky />
      <div className="relative z-10">
        <Header darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        <main className="container-custom">
          <section
            id="blogs"
            className="min-h-screen flex items-center justify-center pt-20"
          >
            <BlogsList darkMode={darkMode} />
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
