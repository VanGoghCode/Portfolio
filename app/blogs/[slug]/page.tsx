// blogs/[slug]/page.tsx

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/home/header";
import NightSky from "../../common/background/Night/nightSky";
import Footer from "../../components/home/footer";
import BlogPost from "../../components/blogs/BlogPost";

export default function BlogPostPage() {
  const [darkMode, setDarkMode] = useState(true);
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="min-h-screen relative">
      <NightSky />
      <div className="relative z-10">
        <Header darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        <main className="container-custom">
          <section
            id="blog-post"
            className="min-h-screen flex items-start justify-center pt-20"
          >
            <BlogPost slug={slug} darkMode={darkMode} />
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
