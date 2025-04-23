import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
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
  DevOpsIcon,
  AwsIcon,
  EducationIcon,
} from "@/app/media/icons";
import { JSX } from "react";

export interface TimelineItemProps {
  title: string;
  period: string;
  description: string;
  color: string;
}

export const SocialIcons = [
  {
    Icon: XIcon,
    link: "https://x.com/vangoghcode",
    label: "Twitter/X",
    className: "icon-glow icon-glow-twitter",
  },
  {
    Icon: EducationIcon,
    link: "https://search.asu.edu/profile/5067021",
    label: "ASU",
    className: "icon-glow icon-glow-asu",
  },
  {
    Icon: InstagramIcon,
    link: "https://www.instagram.com/k_.k_thummar/",
    label: "Instagram",
    className: "icon-glow icon-glow-instagram",
  },
  {
    Icon: LinkedinIcon,
    link: "https://www.linkedin.com/in/kirtankumar-thummar/",
    label: "LinkedIn",
    className: "icon-glow icon-glow-linkedin",
  },
  {
    Icon: GithubIcon,
    link: "https://github.com/VanGoghCode",
    label: "Github",
    className: "icon-glow icon-glow-github",
  },
];

export const TimelineItems = [
  {
    title: "Master of Science in Information Technology",
    period: "Expected August 2026",
    description: "Arizona State University - GPA: 4.11/4.00",
    color: "var(--color-star-white)"
  },
  {
    title: "Tech Lead - Full-stack Developer (Cloud and AI technologies)",
    period: "June 2023 - July 2024",
    description: "Braincuber Technologies Pvt. Ltd. - Led technical mentoring, created documentation, conducted code reviews, and developed intuitive interfaces for data visualization.",
    color: "var(--color-star-blue)"
  },
  {
    title: "Full-stack Developer Intern",
    period: "February 2023 - May 2023",
    description: "Braincuber Technologies Pvt. Ltd. - Collaborated on implementing new technologies, created technical guides, and supported troubleshooting in various programming languages.",
    color: "var(--color-star-orange)"
  },
  {
    title: "Bachelor of Engineering in Information Technology",
    period: "May 2023",
    description: "Gujarat Technological University - GPA: 7.76/10.00",
    color: "var(--color-star-purple)"
  }
];

export const TechStack = {
  "Frontend": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "TailwindCSS"],
  "Backend": ["Python", "Node.js", "Express.js", "Flask"],
  "Database": ["PostgreSQL", "MySQL", "MongoDB", "VectorDB"],
  "AI & ML": ["NLP", "LLM API Integration", "RAG model", "AWS Bedrock"],
  "DevOps & Tools": ["AWS", "Git", "GitHub"]
};

export const ANIMATION_CONSTANTS = {
  // Star animation factors
  STAR_SPEED_FACTOR: 1.0,
  STAR_SCROLL_SPEED_MOBILE: 10,
  STAR_SCROLL_SPEED_DESKTOP: 40,

  // Asteroid animation factors
  ASTEROID_SPEED_FACTOR: 1,
  ASTEROID_INITIAL_SPEED_MIN: 15,
  ASTEROID_INITIAL_SPEED_MAX: 4,
  ASTEROID_RESET_SPEED_MIN: 15,
  ASTEROID_RESET_SPEED_MAX: 4,

  // Parallax effect strength
  PARALLAX_FACTOR: 1.0
};

export const ActivityData = [
  {
    title: "Research & Development",
    description: "Exploring new technologies in Artificial intelligence and Cloud Technologies."
  },
  {
    title: "Certifications",
    description: "Preparing for AWS SAA-C03 (Certified Solutions Architect - Associate) certification."
  },
  {
    title: "Master's Program",
    description: "Pursuing advanced studies in Information Technology at Arizona State University."
  },
  {
    title: "Personal Projects",
    description: "Building automation applications using python and interactive web applications using Next.js."
  },
  {
    title: "Technical Writing",
    description: "Creating articles about modern web technologies and visualization techniques."
  },
  {
    title: "Community Mentoring",
    description: "Helping junior developers learn Cloud computing (specifically AWS) and full-stack development concepts."
  }]

export const SkillIconClasses: { [key: string]: string } = {
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


export const SkillIcons: { [key: string]: () => JSX.Element } = {
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

export const SkillColors: { [key: string]: string } = {
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
