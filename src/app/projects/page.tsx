"use client";
import { ProjectCard } from "../components";

export default function ProjectsPage() {
  // JsonPathSerializer project data
  const jsonPathSerializerIcon = (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
    </svg>
  );

  // Personal Website project data
  const websiteIcon = (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm2 2h2v2H6V7zm3 0h9v2H9V7zm-3 3h2v2H6v-2zm3 0h9v2H9v-2zm-3 3h2v2H6v-2zm3 0h5v2H9v-2z" />
    </svg>
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
      {/* Small descriptive message */}
      <div className="w-full max-w-4xl mx-auto mt-4 mb-8">
        <p className="text-center text-lg text-gray-300">
          These are my non-research related software engineering projects and
          applications.
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* JsonPathSerializer */}
          <ProjectCard
            title="JsonPathSerializer"
            description="A C# class library that helps build JSON objects incrementally using JsonPath expressions. Perfect for automated tests, IoT devices, and web applications that need to construct structured JSON from raw data."
            features="Property access, array indexing, multiple indexes, index spans. Available on NuGet with comprehensive documentation."
            githubUrl="https://github.com/ShuzhaoFeng/JsonPathSerializer"
            icon={jsonPathSerializerIcon}
            iconColor="bg-blue-500"
            techStack={[
              { name: "C#", color: "bg-blue-600/20 text-blue-300" },
              { name: ".NET", color: "bg-green-600/20 text-green-300" },
              { name: "JsonPath", color: "bg-yellow-600/20 text-yellow-300" },
              {
                name: "Newtonsoft.Json",
                color: "bg-purple-600/20 text-purple-300",
              },
              { name: "NuGet", color: "bg-orange-600/20 text-orange-300" },
            ]}
          />

          {/* Personal Website - Meta! */}
          <ProjectCard
            title="ShuzhaoFeng.github.io"
            description="Of course I'm making this website! You're looking at it right now. This personal portfolio was built with Next.js and created entirely through voice commands to an AI agent."
            features="Responsive design, dark theme, automated CI/CD deployment, modular components, and GitHub Pages hosting."
            githubUrl="https://github.com/ShuzhaoFeng/shuzhaofeng.github.io"
            icon={websiteIcon}
            iconColor="bg-green-500"
            techStack={[
              { name: "Next.js", color: "bg-gray-600/20 text-gray-300" },
              { name: "TypeScript", color: "bg-blue-600/20 text-blue-300" },
              { name: "Tailwind CSS", color: "bg-cyan-600/20 text-cyan-300" },
              {
                name: "GitHub Pages",
                color: "bg-purple-600/20 text-purple-300",
              },
              {
                name: "GitHub Actions",
                color: "bg-green-600/20 text-green-300",
              },
            ]}
          />

          {/* Placeholder for future projects */}
          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-600 opacity-60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <circle cx="4" cy="10" r="2" />
                  <circle cx="10" cy="10" r="2" />
                  <circle cx="16" cy="10" r="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400">
                More Projects Coming Soon
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Additional projects will be showcased here...
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 italic">
            More projects will be added soon!
          </p>
        </div>
      </div>
    </main>
  );
}
