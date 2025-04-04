import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/app/media/icons";

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
  "Frontend": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "TailwindCSS", "UI/UX Design"],
  "Backend": ["Python", "Node.js", "Express.js", "Flask", "RESTful API Development", "AI Service Integration"],
  "Database": ["PostgreSQL", "MySQL", "MongoDB", "VectorDB", "Database Management"],
  "AI & ML": ["NLP", "LLM API Integration", "RAG model", "AWS Bedrock"],
  "DevOps & Tools": ["AWS", "Git", "GitHub", "G Suite", "MS Office Suite"]
};