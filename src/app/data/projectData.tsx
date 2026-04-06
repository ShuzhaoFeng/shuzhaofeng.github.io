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
    id: "discord-botc",
    title: "discord-botc",
    description:
      "An admin server for Blood on the Clocktower operations, with Discord bot integration to coordinate game management and player interactions.",
    features:
      "Automatic game logic resolution, player message coordination, role and game-state management, and multilingual support.",
    githubUrl: "https://github.com/ShuzhaoFeng/discord-botc",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.32 4.37A19.79 19.79 0 0 0 15.49 3a13.85 13.85 0 0 0-.61 1.25 18.27 18.27 0 0 0-5.76 0A13.84 13.84 0 0 0 8.51 3a19.7 19.7 0 0 0-4.84 1.37C.64 8.87-.18 13.26.23 17.57a19.95 19.95 0 0 0 5.95 3 14.61 14.61 0 0 0 1.27-2.05 12.76 12.76 0 0 1-2-.95c.17-.12.33-.25.48-.38a14.3 14.3 0 0 0 12.17 0c.15.13.31.26.48.38a12.66 12.66 0 0 1-2 .95 14.5 14.5 0 0 0 1.27 2.05 19.86 19.86 0 0 0 5.95-3c.49-5-.83-9.34-3.68-13.2zM8.03 14.96c-1.18 0-2.14-1.08-2.14-2.4 0-1.33.95-2.41 2.14-2.41 1.19 0 2.15 1.08 2.14 2.41 0 1.32-.95 2.4-2.14 2.4zm7.94 0c-1.18 0-2.14-1.08-2.14-2.4 0-1.33.95-2.41 2.14-2.41 1.19 0 2.15 1.08 2.14 2.41 0 1.32-.95 2.4-2.14 2.4z" />
      </svg>
    ),
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
