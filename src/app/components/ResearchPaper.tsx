"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface ResearchPaperProps {
  title: string;
  image: StaticImageData | string;
  imageAlt: string;
  abstract: string;
  paperUrl: string;
  pdfFile?: string; // For imported PDF files
  pdfUrl?: string; // For external PDF URLs (fallback)
  slidesFile?: string; // For imported slides files
  slidesUrl?: string; // For external slides URLs (fallback)
  recordingUrl?: string;
  authors?: string;
  venue?: string;
  year?: number;
}

export default function ResearchPaper({
  title,
  image,
  imageAlt,
  abstract,
  paperUrl,
  pdfFile,
  pdfUrl,
  slidesFile,
  slidesUrl,
  recordingUrl,
  authors,
  venue,
  year,
}: ResearchPaperProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle PDF download
  const handlePdfDownload = () => {
    if (pdfFile) {
      // Create a download link for the imported PDF
      const link = document.createElement("a");
      link.href = pdfFile;
      link.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (pdfUrl) {
      // Fallback to external URL
      window.open(pdfUrl, "_blank");
    }
  };

  // Handle slides download
  const handleSlidesDownload = () => {
    if (slidesFile) {
      // Create a download link for the imported slides
      const link = document.createElement("a");
      link.href = slidesFile;
      link.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}_slides.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (slidesUrl) {
      // Fallback to external URL
      window.open(slidesUrl, "_blank");
    }
  };

  // Get the first ~100 characters for the collapsed view
  const getShortAbstract = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
  };

  const shortAbstract = getShortAbstract(abstract);

  return (
    <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-colors">
      {/* Header with Image and Title */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-shrink-0">
          <Image
            src={image}
            alt={imageAlt}
            width={192}
            height={128}
            className="w-full md:w-48 h-32 md:h-32 object-contain rounded-lg border border-gray-600 bg-white p-2"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
            {title}
          </h3>
          {authors && (
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-medium">Authors:</span> {authors}
            </p>
          )}
          {venue && (
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-medium">Venue:</span> {venue}
            </p>
          )}
          {year && (
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-medium">Year:</span> {year}
            </p>
          )}
        </div>
      </div>

      {/* Abstract */}
      <div className="mb-4">
        <h4 className="text-lg font-medium text-gray-200 mb-2">Abstract</h4>
        <div className="text-gray-300 leading-relaxed">
          {isExpanded ? <p>{abstract}</p> : <p>{shortAbstract}</p>}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {/* Paper Link */}
        <a
          href={paperUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          View Paper
        </a>

        {/* Download PDF */}
        {(pdfFile || pdfUrl) && (
          <button
            onClick={handlePdfDownload}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download PDF
          </button>
        )}

        {/* Download Slides (conditional) */}
        {(slidesFile || slidesUrl) && (
          <button
            onClick={handleSlidesDownload}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            Download Slides
          </button>
        )}

        {/* Recording Link (conditional) */}
        {recordingUrl && (
          <a
            href={recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            View Recording
          </a>
        )}
      </div>
    </div>
  );
}
