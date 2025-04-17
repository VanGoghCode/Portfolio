"use client";

import React, { useState } from "react";
import type { JSX } from "react";
import { SocialIcons, TechStack } from "../../common/constants/constants";
import Gl from "@/app/common/styling/greenLetters";
import AsuLetters from "@/app/common/styling/goldenLetters";
import Wl from "@/app/common/styling/whiteLetters";
import FlipText from "@/app/common/styling/flipText";
import { motion, AnimatePresence } from "framer-motion";
import { AwsIcon, ChevronDownIcon, GithubIcon } from "@/app/media/icons";
import { 
  HTMLIcon,
  CSSIcon,
  JavaScriptIcon,
  TypeScriptIcon,
  ReactIcon,
  NextJSIcon,
  TailwindIcon,
  PythonIcon,
  NodeJSIcon,
  DatabaseIcon,
  AIIcon,
  DevOpsIcon
} from "@/app/media/icons";

type TechStackKey = keyof typeof TechStack;

const skillColors: { [key: string]: string } = {
  "HTML5": "var(--color-skill-html)",
  "CSS3": "var(--color-skill-css)",
  "JavaScript": "var(--color-skill-javascript)",
  "TypeScript": "var(--color-skill-typescript)",
  "React.js": "var(--color-skill-react)",
  "Next.js": "var(--color-skill-nextjs)",
  "TailwindCSS": "var(--color-skill-tailwind)",
  "Python": "var(--color-skill-python)",
  "Node.js": "var(--color-skill-nodejs)",
  "Express.js": "var(--color-skill-express)",
  "Flask": "var(--color-skill-flask)",
  "PostgreSQL": "var(--color-skill-postgresql)",
  "MySQL": "var(--color-skill-mysql)",
  "MongoDB": "var(--color-skill-mongodb)",
  "VectorDB": "var(--color-skill-vectordb)",
  "NLP": "var(--color-skill-nlp)",
  "LLM API Integration": "var(--color-skill-llm)",
  "RAG model": "var(--color-skill-rag)",
  "AWS Bedrock": "var(--color-skill-aws)",
  "AWS": "var(--color-skill-aws)",
  "Git": "var(--color-skill-git)",
  "GitHub": "var(--glow-github)",
  "G Suite": "var(--color-skill-gsuite)",
  "MS Office Suite": "var(--color-skill-msoffice)",
  "RESTful API Development": "var(--color-skill-rest)",
  "AI Service Integration": "var(--color-skill-ai)",
  "Database Management": "var(--color-skill-database)"
};

const skillIcons: { [key: string]: () => JSX.Element } = {
  "HTML5": HTMLIcon,
  "CSS3": CSSIcon,
  "JavaScript": JavaScriptIcon,
  "TypeScript": TypeScriptIcon,
  "React.js": ReactIcon,
  "Next.js": NextJSIcon,
  "TailwindCSS": TailwindIcon,
  "Python": PythonIcon,
  "Node.js": NodeJSIcon,
  "Express.js": NodeJSIcon,
  "Flask": PythonIcon,
  "PostgreSQL": DatabaseIcon,
  "MySQL": DatabaseIcon,
  "MongoDB": DatabaseIcon,
  "VectorDB": DatabaseIcon,
  "NLP": AIIcon,
  "LLM API Integration": AIIcon,
  "RAG model": AIIcon,
  "AWS Bedrock": AwsIcon,
  "AWS": AwsIcon,
  "Git": DevOpsIcon,
  "GitHub": GithubIcon,
  "G Suite": DevOpsIcon,
  "MS Office Suite": DevOpsIcon,
  "RESTful API Development": NodeJSIcon,
  "AI Service Integration": AIIcon,
  "Database Management": DatabaseIcon
};

const skillIconClasses: { [key: string]: string } = {
  "HTML5": "skill-icon skill-icon-html",
  "CSS3": "skill-icon skill-icon-css",
  "JavaScript": "skill-icon skill-icon-js",
  "TypeScript": "skill-icon skill-icon-ts",
  "React.js": "skill-icon skill-icon-react",
  "Next.js": "skill-icon skill-icon-next",
  "TailwindCSS": "skill-icon skill-icon-tailwind",
  "Python": "skill-icon skill-icon-python",
  "Node.js": "skill-icon skill-icon-node",
  "Express.js": "skill-icon skill-icon-node",
  "Flask": "skill-icon skill-icon-python",
  "PostgreSQL": "skill-icon skill-icon-database",
  "MySQL": "skill-icon skill-icon-database",
  "MongoDB": "skill-icon skill-icon-database",
  "VectorDB": "skill-icon skill-icon-database",
  "NLP": "skill-icon skill-icon-ai",
  "LLM API Integration": "skill-icon skill-icon-ai",
  "RAG model": "skill-icon skill-icon-ai",
  "AWS Bedrock": "skill-icon skill-icon-devops",
  "AWS": "skill-icon skill-icon-devops",
  "Git": "skill-icon skill-icon-github",
  "GitHub": "skill-icon skill-icon-github",
  "AI Service Integration": "skill-icon skill-icon-ai",
};

const About = () => {
  const activityData = [
    {
      title: "Research & Development",
      description: "Exploring new technologies in data visualization and web development frameworks."
    },
    {
      title: "Master's Program",
      description: "Pursuing advanced studies in Information Technology at Arizona State University."
    },
    {
      title: "Open Source Contributions",
      description: "Actively contributing to open-source projects focused on data visualization libraries."
    },
    {
      title: "Personal Projects",
      description: "Building interactive web applications leveraging NextJS and Django."
    },
    {
      title: "Technical Writing",
      description: "Creating tutorials and articles about modern web technologies and visualization techniques."
    },
    {
      title: "Community Mentoring",
      description: "Helping junior developers learn data visualization and full-stack development concepts."
    }
  ];

  const [activeCategory, setActiveCategory] = useState<TechStackKey | null>(null);
  const [showFullAbout, setShowFullAbout] = useState(false);

  return (
    <div className="w-full container-custom py-6 md:py-12 lg:py-16">
      <div className="relative rounded-lg overflow-hidden pt-10">
        {/* Header with name and social links */}
        <div className="p-6 md:p-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold flip-text-container heading-size mb-4">
            <Gl text="Kirtankumar Thummar" />
          </h1>

          <h2 className="text-lg sm:text-xl text-secondary text-gradient animate-fade-in mb-4">
            Full-Stack Developer & Data Visualization Engineer
          </h2>

          <div className="flex space-x-4 justify-center">
            {SocialIcons.map(({ Icon, link, label, className }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={{ color: "var(--color-text-secondary)" }}
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Three Main Sections in Flexbox */}
        <div className="flex flex-col md:flex-column py-6 gap-6">
          {/* About Me Section */}
          <section
            className="p-8"
            style={{
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <h2 className="text-xl font-bold mb-4">
              <span className="flex gap-2 items-center">
                <FlipText
                  className="text-[var(--color-primary)]"
                  text="# About />"
                />{" "}
              </span>
            </h2>
            <div className="text-secondary flex flex-col gap-4 w-full text-justify">
              {/* First paragraph always visible */}
              <span className="block">
                I&apos;m <Gl text="Kirtankumar" /> <Gl text="Thummar," /> pursuing my
                Master&apos;s in Information Technology at{" "}
                <AsuLetters text="Arizona" /> <AsuLetters text="State" />{" "}
                <AsuLetters text="University." /> My background is in building
                websites and applications that solve real problems for
                businesses and their customers, approaching my work with an
                artist&apos;s mindset - crafting digital solutions with the same care
                and attention to detail.
              </span>

              {/* Mobile: Show Read More button, Desktop: Always show full content */}
              <div className={`md:block ${showFullAbout ? 'block' : 'hidden'}`}>
                <span className="block">
                  During my time at <Wl text="Braincuber" />{" "}
                  <Wl text="Technologies," /> I <Wl text="led" /> <Wl text="a" />{" "}
                  <Wl text="team" /> that created digital solutions that helped
                  companies make better decisions using their data. I enjoy taking
                  complex information and presenting it in ways that make sense to
                  everyone, not just technical people.
                </span>
                <span className="block">
                  I&apos;m fascinated by how we can make computers smarter while
                  maintaining <Wl text="human-centric" /> <Wl text="design." /> I
                  want to make data visualization universally accessible and
                  meaningful - not just for boardrooms, but for everyone. This
                  means <Wl text="solving" /> <Wl text="even" /> <Wl text="the" />{" "}
                  <Wl text="smallest," /> <Wl text="often-overlooked" />{" "}
                  <Wl text="problems" /> that people don&apos;t talk about, like making
                  complex patterns understandable to a child or helping rural
                  communities visualize their agricultural data through simple
                  mobile interfaces.
                </span>
                <span className="block">
                  I believe technology should be both functional and beautiful,
                  creating systems that can search through large amounts of
                  information and provide meaningful answers to questions -
                  similar to how a helpful research assistant might work, but with
                  the aesthetic sensibility of a graphic novel.
                </span>
                <span className="block">
                  When I work on projects, I pour my heart into{" "}
                  <Wl text="making" /> <Wl text="them" /> <Wl text="as" />{" "}
                  <Wl text="perfect" /> <Wl text="as" /> <Wl text="possible," />{" "}
                  treating each line of code like brushstrokes on a digital
                  canvas. I&apos;m particularly driven to bridge the gap between
                  technical implementation and human experience, wanting to make
                  every interaction with technology feel as natural and insightful
                  as viewing a masterpiece painting.
                </span>
              </div>

              {/* Read More button - Only visible on mobile */}
              <button
                onClick={() => setShowFullAbout(!showFullAbout)}
                className="md:hidden mt-4 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-secondary transition-all duration-300 hover:border-[var(--color-secondary)]"
              >
                {showFullAbout ? 'Show Less' : 'Read More'}
              </button>
            </div>
          </section>

          {/* What am I doing Section - Updated with 2x3 Grid */}
          <section
            className="p-8"
            style={{
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <h2 className="text-xl font-bold mb-4">
              <span className="flex gap-2 items-center">
                <FlipText
                  className="text-[var(--color-primary)]"
                  text="# Things I am doing />"
                />
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activityData.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-secondary)] transition-all"
                >
                  <span className="mb-2"><Wl text={activity.title} /> </span>
                  <p className="text-secondary">{activity.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills & Expertise Section */}
          <section
            className="p-8"
            style={{
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <h2 className="text-xl font-bold mb-6">
              <span className="flex gap-2 items-center">
                <FlipText
                  className="text-[var(--color-primary)]"
                  text="# Skills & Expertise />"
                />
              </span>
            </h2>
            <div className="space-y-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.keys(TechStack).map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(activeCategory === category ? null : category as TechStackKey)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all cursor-pointer
                      ${activeCategory === category 
                        ? 'bg-[var(--color-secondary)] text-white' 
                        : 'bg-[rgba(255,255,255,0.02)] text-secondary hover:bg-[rgba(255,255,255,0.04)]'
                      } border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-secondary)]`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-2">
                      <Wl text={category} />
                      <motion.span
                        animate={{ rotate: activeCategory === category ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {ChevronDownIcon()}
                      </motion.span>
                    </span>
                  </motion.button>
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                {activeCategory && (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {TechStack[activeCategory].map((skill: string) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="group relative p-2 sm:p-3 rounded-lg border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-secondary)] transition-all bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)]"
                          style={{
                            '--hover-color': skillColors[skill] || '#ffffff'
                          } as React.CSSProperties}
                        >
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative flex items-center gap-2">
                            {skillIcons[skill] && (
                              <div className={`transition-all duration-300 group-hover:text-[var(--hover-color)] ${skillIconClasses[skill] || 'skill-icon'}`}>
                                {skillIcons[skill]()}
                              </div>
                            )}
                            <p className="text-xs sm:text-sm text-secondary transition-all duration-300 group-hover:text-[var(--hover-color)]">{skill}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;