import React from "react";
import { Braces, Code2, MonitorSmartphone } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  features?: string;
  githubUrl?: string;
  icon: React.ReactNode;
  iconColor: string;
  techStack: Array<{ name: string; color: string }>;
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
      { name: "Next.js", color: "bg-gray-600/20 text-gray-300" },
      { name: "TypeScript", color: "bg-blue-600/20 text-blue-300" },
      { name: "Tailwind CSS", color: "bg-cyan-600/20 text-cyan-300" },
      { name: "discord.js", color: "bg-indigo-600/20 text-indigo-300" },
      { name: "Express", color: "bg-gray-600/20 text-gray-300" },
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
      { name: "C#", color: "bg-blue-600/20 text-blue-300" },
      { name: ".NET", color: "bg-green-600/20 text-green-300" },
      { name: "JsonPath", color: "bg-yellow-600/20 text-yellow-300" },
      { name: "Newtonsoft.Json", color: "bg-purple-600/20 text-purple-300" },
      { name: "NuGet", color: "bg-orange-600/20 text-orange-300" },
    ],
  },
  {
    id: "personal-website",
    title: "ShuzhaoFeng.github.io",
    description:
      "Of course I'm making this website! You're looking at it right now. This personal portfolio was built with Next.js and created entirely through voice commands to an AI agent.",
    features:
      "Responsive design, dark theme, automated CI/CD deployment, modular components, and GitHub Pages hosting.",
    githubUrl: "https://github.com/ShuzhaoFeng/shuzhaofeng.github.io",
    icon: (
      <MonitorSmartphone className="w-6 h-6 text-white" aria-hidden="true" />
    ),
    iconColor: "bg-green-500",
    techStack: [
      { name: "Next.js", color: "bg-gray-600/20 text-gray-300" },
      { name: "TypeScript", color: "bg-blue-600/20 text-blue-300" },
      { name: "Tailwind CSS", color: "bg-cyan-600/20 text-cyan-300" },
      { name: "GitHub Pages", color: "bg-purple-600/20 text-purple-300" },
      { name: "GitHub Actions", color: "bg-green-600/20 text-green-300" },
    ],
  },
];

export default projects;
