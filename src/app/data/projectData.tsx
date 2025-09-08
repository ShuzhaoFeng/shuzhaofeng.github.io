import React from "react";

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
    id: "jsonpathserializer",
    title: "JsonPathSerializer",
    description:
      "A C# class library that helps build JSON objects incrementally using JsonPath expressions. Perfect for automated tests, IoT devices, and web applications that need to construct structured JSON from raw data.",
    features:
      "Property access, array indexing, multiple indexes, index spans. Available on NuGet with comprehensive documentation.",
    githubUrl: "https://github.com/ShuzhaoFeng/JsonPathSerializer",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    ),
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
      <svg
        className="w-6 h-6 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm2 2h2v2H6V7zm3 0h9v2H9V7zm-3 3h2v2H6v-2zm3 0h9v2H9v-2zm-3 3h2v2H6v-2zm3 0h5v2H9v-2z" />
      </svg>
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
