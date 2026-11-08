import React from "react";
import { Braces, Code2, MonitorSmartphone } from "lucide-react";

export type ProjectTagTone = "neutral" | "blue" | "cyan" | "indigo" | "green" | "yellow" | "purple" | "orange";

export interface Project {
  id: string;
  title: string;
  description: string;
  features?: string;
  githubUrl?: string;
  icon: React.ReactNode;
  iconColor: string;
  techStack: Array<{ name: string; tone: ProjectTagTone }>;
}

export const projects: Project[] = [
  {
    id: "discord-botc",
    title: "discord-botc",
    description:
      "An admin server for Blood on the Clocktower operations, with Discord bot integration to coordinate game management and player interactions.",
    features:
      "Automatic game logic resolution, player message coordination, role and game-state management, and multilingual support.",
    githubUrl: "https://github.com/ShuzhaoFeng/discord-botc",
    icon: <Code2 className="w-6 h-6 text-white" aria-hidden="true" />,
    iconColor: "bg-indigo-500",
    techStack: [
      { name: "Next.js", tone: "neutral" },
      { name: "TypeScript", tone: "blue" },
      { name: "Tailwind CSS", tone: "cyan" },
      { name: "discord.js", tone: "indigo" },
      { name: "Express", tone: "neutral" },
    ],
  },
  {
    id: "jsonpathserializer",
    title: "JsonPathSerializer",
    description:
      "A C# class library that helps build JSON objects incrementally using JsonPath expressions. Perfect for automated tests, IoT devices, and web applications that need to construct structured JSON from raw data.",
    features:
      "Property access, array indexing, multiple indexes, index spans. Available on NuGet with comprehensive documentation.",
    githubUrl: "https://github.com/ShuzhaoFeng/JsonPathSerializer",
    icon: <Braces className="w-6 h-6 text-white" aria-hidden="true" />,
    iconColor: "bg-blue-500",
    techStack: [
      { name: "C#", tone: "blue" },
      { name: ".NET", tone: "green" },
      { name: "JsonPath", tone: "yellow" },
      { name: "Newtonsoft.Json", tone: "purple" },
      { name: "NuGet", tone: "orange" },
    ],
  },
  {
    id: "personal-website",
    title: "ShuzhaoFeng.github.io",
    description:
      "Of course I'm making this website! You're looking at it right now. This personal portfolio was built with Next.js.",
    features:
      "Responsive design, dark theme, automated CI/CD deployment, modular components, and GitHub Pages hosting.",
    githubUrl: "https://github.com/ShuzhaoFeng/shuzhaofeng.github.io",
    icon: (
      <MonitorSmartphone className="w-6 h-6 text-white" aria-hidden="true" />
    ),
    iconColor: "bg-green-500",
    techStack: [
      { name: "Next.js", tone: "neutral" },
      { name: "TypeScript", tone: "blue" },
      { name: "Tailwind CSS", tone: "cyan" },
      { name: "GitHub Pages", tone: "purple" },
      { name: "GitHub Actions", tone: "green" },
    ],
  },
];

export default projects;
