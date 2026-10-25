"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
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
  // Set by the first toggle, so the abstract and its control ease only on a
  // visitor's change, not when the card first renders.
  const [hasToggled, setHasToggled] = useState(false);
  const abstractRef = useRef<HTMLDivElement>(null);
  // The abstract's rendered height when the visitor toggled it, the start of
  // the height change.
  const fromHeightRef = useRef<number | null>(null);
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

  const toggleAbstract = () => {
    if (abstractRef.current) {
      // Mid-change, this is the height the box has reached, so a second
      // toggle eases on from there instead of jumping.
      fromHeightRef.current = abstractRef.current.getBoundingClientRect().height;
    }
    setHasToggled(true);
    setIsExpanded((expanded) => !expanded);
  };

  // Eases the abstract's box from its old height to the new text's height.
  // The new text is in place from the first frame; the box reveals or trims
  // it as it eases. Measuring in JS and easing between pixel heights works
  // in every current browser, unlike easing to "auto" (interpolate-size).
  // If CSS gives the box no height transition (for example a reduced-motion
  // rule), it takes the new height at once.
  useLayoutEffect(() => {
    const box = abstractRef.current;
    const from = fromHeightRef.current;
    fromHeightRef.current = null;
    if (!box || from === null) return;

    box.style.height = "";
    const to = box.getBoundingClientRect().height;
    if (from === to) return;

    box.style.height = `${from}px`;
    box.getBoundingClientRect(); // commit the start height before easing
    box.style.height = `${to}px`;

    const transition = box
      .getAnimations()
      .find(
        (animation) =>
          animation instanceof CSSTransition &&
          animation.transitionProperty === "height",
      );
    if (!transition) {
      box.style.height = "";
      return;
    }

    // Back to auto height when the change settles, so the box follows the
    // layout (for example a resized window). A later toggle that interrupts
    // this change takes the box over instead.
    let current = true;
    const release = () => {
      if (current) box.style.height = "";
    };
    transition.finished.then(release, release);
    return () => {
      current = false;
    };
  }, [isExpanded]);

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
          {/* The keys remount the text and the label on each toggle, so each
              new one fades up from partly visible (abstract-swap). */}
          <div
            ref={abstractRef}
            className="overflow-hidden transition-[height] duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)]"
          >
            <p
              key={isExpanded ? "full" : "short"}
              className={hasToggled ? "abstract-swap" : undefined}
            >
              {isExpanded ? abstract : shortAbstract}
            </p>
          </div>
          <button
            onClick={toggleAbstract}
            className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors cursor-pointer"
          >
            <span
              key={isExpanded ? "less" : "more"}
              className={hasToggled ? "abstract-swap" : undefined}
            >
              {isExpanded ? t("research.showLess") : t("research.readMore")}
            </span>
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

        {/* Download PDF. Each download button dims while its download starts;
            its transition covers opacity as well as the hover colour, so the
            dim and its restore ease. */}
        {(pdfFile || pdfUrl) && (
          <button
            onClick={handlePdfDownload}
            disabled={isDownloadingPdf}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-[background-color,opacity]"
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-[background-color,opacity]"
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
