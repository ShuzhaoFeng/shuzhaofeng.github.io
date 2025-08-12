"use client";
import Profile from "../components/Profile";

export default function MainPage() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl gap-8 py-8">
          <div className="flex items-center justify-center order-1 lg:order-1">
            <Profile />
          </div>
          <div className="flex flex-col justify-center gap-6 order-2 lg:order-2 px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 shiny-text text-center lg:text-left whitespace-nowrap">
              Hello, I&apos;m Shuzhao Feng
            </h1>
            <div className="space-y-4 text-base sm:text-lg">
              <p>
                I&apos;m currently pursuing a master&apos;s degree in Electrical
                and Computer Engineering at McGill University. My main interest
                lies in large generative models, with a particular focus on
                making software creation accessible to everyone, regardless of
                technical background. To this end, I am working on enhancing the
                code generation abilities of large language models. Looking
                ahead, I hope to explore the multimodal capabilities of these
                models to further expand what people can build with AI.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-3xl mt-8 space-y-4 px-2 sm:px-4">
          <p className="text-center text-lg sm:text-xl">
            Visit the{" "}
            <a href="/journey" className="text-cyan-400 hover:underline">
              Journey
            </a>{" "}
            page to see my journey that made me who I am today.
          </p>
          <p className="text-center text-lg sm:text-xl">
            Visit the{" "}
            <a href="/research" className="text-cyan-400 hover:underline">
              Research
            </a>{" "}
            page to see my academic research work and publications.
          </p>
          <p className="text-center text-lg sm:text-xl">
            Visit the{" "}
            <a href="/projects" className="text-cyan-400 hover:underline">
              Projects
            </a>{" "}
            page to see what I am or have been working on with my software
            engineering skills.
          </p>
        </div>
        <p className="mt-12 text-center text-xs text-gray-400">
          Fun fact: This website was created entirely through voice commands to
          an AI agent—no typing or manual coding involved.
        </p>
        <style jsx>{`
          .shiny-text {
            background: linear-gradient(90deg, #fff 0%, #b3b3b3 50%, #fff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            filter: drop-shadow(0 2px 8px #000a);
          }
        `}</style>
      </main>
    </>
  );
}
