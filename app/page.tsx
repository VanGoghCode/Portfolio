'use client';
import Header from "./components/header";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
    </div>
  );
}
