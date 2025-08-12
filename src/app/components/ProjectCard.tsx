import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  features?: string;
  githubUrl?: string;
  icon: React.ReactNode;
  iconColor: string;
  techStack: Array<{
    name: string;
    color: string;
  }>;
}

export default function ProjectCard({
  title,
  description,
  features,
  githubUrl,
  icon,
  iconColor,
  techStack,
}: ProjectCardProps) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-cyan-500 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
        <div className="flex items-center justify-between flex-1">
          <h3 className="text-xl font-semibold text-cyan-300">{title}</h3>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="View on GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-gray-400 hover:text-cyan-400"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      {features && (
        <div className="mb-4 text-sm text-gray-400">
          <strong>Features:</strong> {features}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs ${tech.color} rounded`}
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}
