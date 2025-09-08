// Research data is English-only; no i18n required.
export interface Research {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  abstract: string;
  paperUrl?: string;
  pdfFile?: string;
  pdfUrl?: string;
  slidesFile?: string;
  slidesUrl?: string;
  recordingUrl?: string;
  authors?: string;
  venue?: string;
  year?: number;
}

export const researchPapers: Research[] = [
  {
    id: "paper1",
    title:
      "LLM-based Satisfiability Checking of String Requirements by Consistent Data and Checker Generation",
    image: "/research/llm-satisfiability-checking/image.png",
    imageAlt: "String requirements satisfiability checking with LLMs",
    authors:
      "Boqi Chen, Aren A. Babikian, Shuzhao Feng, Dániel Varró, Gunter Mussbacher",
    venue:
      "33rd IEEE International Requirements Engineering Conference (RE '25)",
    year: 2025,
    abstract:
      "Requirements over strings, commonly represented using natural language (NL), are particularly relevant for software systems due to their heavy reliance on string data manipulation. While individual requirements can usually be analyzed manually, verifying properties (e.g., satisfiability) over sets of NL requirements is particularly challenging. Formal approaches (e.g., SMT solvers) may efficiently verify such properties, but are known to have theoretical limitations. Additionally, the translation of NL requirements into formal constraints typically requires significant manual effort. Recently, large language models (LLMs) have emerged as an alternative approach for formal reasoning tasks, but their effectiveness in verifying requirements over strings is less studied. In this paper, we introduce a hybrid approach that verifies the satisfiability of NL requirements over strings by using LLMs (1) to derive a satisfiability outcome (and a consistent string, if possible), and (2) to generate declarative (i.e., SMT) and imperative (i.e., Python) checkers, used to validate the correctness of (1). In our experiments, we assess the performance of four LLMs. Results show that LLMs effectively translate natural language into checkers, even achieving perfect testing accuracy for Python-based checkers. These checkers substantially help LLMs in generating a consistent string and accurately identifying unsatisfiable requirements, leading to more than doubled generation success rate and F1-score in certain cases compared to baselines without generated checkers.",
    paperUrl: "https://arxiv.org/abs/2506.16639",
    pdfFile: "/research/llm-satisfiability-checking/paper.pdf",
    slidesFile: "/research/llm-satisfiability-checking/presentation.pdf",
  },
];

export default researchPapers;
