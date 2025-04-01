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

export const TimelineItems: TimelineItemProps[] = [
  {
    title: "Senior Developer @ Nebula Tech",
    period: "2020 - Present",
    description:
      "Leading the stellar frontend team in developing galaxy-scale applications. Orchestrating meteor showers of features across multiple platforms.",
    color: "var(--color-star-blue)",
  },
  {
    title: "Full-Stack Engineer @ Cosmic Systems",
    period: "2017 - 2020",
    description:
      "Engineered gravitational pull for user engagement. Launched and maintained constellation of microservices that process light-years of data.",
    color: "var(--color-star-orange)",
  },
  {
    title: "MSc in Quantum Computing @ Star Academy",
    period: "2015 - 2017",
    description:
      'Graduated with honors, thesis on "Quantum Algorithms for Interstellar Navigation Systems"',
    color: "var(--color-star-white)",
  },
  {
    title: "Frontend Developer @ Galactic Ventures",
    period: "2014 - 2015",
    description:
      "Developed responsive interfaces for interplanetary communication systems. Optimized light-speed data transmission protocols.",
    color: "var(--color-star-purple)",
  },
  {
    title: "BSc in Computer Science @ Celestial University",
    period: "2010 - 2014",
    description:
      "Specialized in distributed systems and planetary-scale databases. Graduated with highest honors.",
    color: "var(--color-star-green)",
  },
];

export const TechStack = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "GraphQL",
  "AWS",
  "Docker",
  "TailwindCSS",
];
