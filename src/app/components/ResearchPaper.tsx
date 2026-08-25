"use client";
import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { useTranslation } from "react-i18next";
import { Download, ExternalLink, PlayCircle, Presentation } from "lucide-react";

interface ResearchPaperProps {
  title: string;
  image: StaticImageData | string;
  imageAlt: string;
  abstract: string;
  paperUrl?: string;
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
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingSlides, setIsDownloadingSlides] = useState(false);
  const pdfTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const slidesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (pdfTimeoutRef.current) clearTimeout(pdfTimeoutRef.current);
      if (slidesTimeoutRef.current) clearTimeout(slidesTimeoutRef.current);
    };
  }, []);

  // Handle PDF download
  const handlePdfDownload = () => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);

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

    if (pdfTimeoutRef.current) clearTimeout(pdfTimeoutRef.current);
    pdfTimeoutRef.current = setTimeout(() => {
      setIsDownloadingPdf(false);
    }, 500);
  };

  // Handle slides download
  const handleSlidesDownload = () => {
    if (isDownloadingSlides) return;
    setIsDownloadingSlides(true);

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

    if (slidesTimeoutRef.current) clearTimeout(slidesTimeoutRef.current);
    slidesTimeoutRef.current = setTimeout(() => {
      setIsDownloadingSlides(false);
    }, 500);
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
              <span className="font-medium">{t("research.authors")}</span>{" "}
              {authors}
            </p>
          )}
          {venue && (
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-medium">{t("research.venue")}</span> {venue}
            </p>
          )}
          {year && (
            <p className="text-gray-300 text-sm mb-1">
              <span className="font-medium">{t("research.year")}</span> {year}
            </p>
          )}
        </div>
      </div>

      {/* Abstract */}
      <div className="mb-4">
        <h4 className="text-lg font-medium text-gray-200 mb-2">
          {t("research.abstractHeading")}
        </h4>
        <div className="text-gray-300 leading-relaxed">
          {isExpanded ? <p>{abstract}</p> : <p>{shortAbstract}</p>}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors cursor-pointer"
          >
            {isExpanded ? t("research.showLess") : t("research.readMore")}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {/* Paper Link (optional) */}
        {paperUrl && (
          <a
            href={paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            {t("research.viewPaper")}
          </a>
        )}

        {/* Download PDF */}
        {(pdfFile || pdfUrl) && (
          <button
            onClick={handlePdfDownload}
            disabled={isDownloadingPdf}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            {t("research.downloadPdf")}
          </button>
        )}

        {/* Download Slides (conditional) */}
        {(slidesFile || slidesUrl) && (
          <button
            onClick={handleSlidesDownload}
            disabled={isDownloadingSlides}
            aria-label="Download slides"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Presentation className="w-4 h-4" aria-hidden="true" />
            {t("research.downloadSlides")}
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
            <PlayCircle className="w-4 h-4" aria-hidden="true" />
            {t("research.viewRecording")}
          </a>
        )}
      </div>
    </div>
  );
}
