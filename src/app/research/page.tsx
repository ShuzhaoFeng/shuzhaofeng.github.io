"use client";
import { ResearchPaper } from "../components";

export default function ResearchPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
      {/* Small descriptive message */}
      <div className="w-full max-w-4xl mx-auto mt-4 mb-8">
        <p className="text-center text-lg text-gray-300">
          A collection of my research publications and academic contributions.
        </p>
      </div>

      {/* Research Papers */}
      <div className="w-full max-w-6xl mx-auto space-y-8">
        {/* Real Paper 1 - LLM-based Satisfiability Checking */}
        <ResearchPaper
          title="LLM-based Satisfiability Checking of String Requirements by Consistent Data and Checker Generation"
          image="/research/llm-satisfiability-checking/image.png"
          imageAlt="String requirements satisfiability checking with LLMs"
          authors="Boqi Chen, Aren A. Babikian, Shuzhao Feng, Dániel Varró, Gunter Mussbacher"
          venue="33rd IEEE International Requirements Engineering Conference (RE '25)"
          year={2025}
          abstract="Requirements over strings, commonly represented using natural language (NL), are particularly relevant for software systems due to their heavy reliance on string data manipulation. While individual requirements can usually be analyzed manually, verifying properties (e.g., satisfiability) over sets of NL requirements is particularly challenging. Formal approaches (e.g., SMT solvers) may efficiently verify such properties, but are known to have theoretical limitations. Additionally, the translation of NL requirements into formal constraints typically requires significant manual effort. Recently, large language models (LLMs) have emerged as an alternative approach for formal reasoning tasks, but their effectiveness in verifying requirements over strings is less studied. In this paper, we introduce a hybrid approach that verifies the satisfiability of NL requirements over strings by using LLMs (1) to derive a satisfiability outcome (and a consistent string, if possible), and (2) to generate declarative (i.e., SMT) and imperative (i.e., Python) checkers, used to validate the correctness of (1). In our experiments, we assess the performance of four LLMs. Results show that LLMs effectively translate natural language into checkers, even achieving perfect testing accuracy for Python-based checkers. These checkers substantially help LLMs in generating a consistent string and accurately identifying unsatisfiable requirements, leading to more than doubled generation success rate and F1-score in certain cases compared to baselines without generated checkers."
          paperUrl="https://arxiv.org/abs/2506.16639"
          pdfFile="/research/llm-satisfiability-checking/paper.pdf"
        />

        {/* Coming Soon Card */}
        <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-600 opacity-60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-400">
              More Research Coming Soon
            </h3>
          </div>
          <p className="text-gray-400 mb-4">
            Additional research publications and ongoing work will be featured
            here as they become available.
          </p>
        </div>
      </div>

      <div className="text-center mt-12 mb-8">
        <p className="text-gray-400 italic">
          For the most up-to-date list of publications, please visit my{" "}
          <a
            href="https://scholar.google.com/citations?hl=en&authuser=3&user=shY8hM0AAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Google Scholar profile
          </a>
        </p>
      </div>
    </main>
  );
}
