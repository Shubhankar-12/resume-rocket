// hooks/usePdfExport.js
import { useState } from "react";

/**
 * Custom hook for exporting a webpage to PDF
 * @returns {Object} - The export functions and state
 */
export const usePdfExport = () => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  /**
   * Export a page to PDF
   * @param {string} pageUrl - URL of the page to convert (e.g., '/report/680e48c3eec8ae5f54416b3a')
   * @param {string} fileName - Name of the PDF file (without extension)
   * @returns {Promise<void>}
   */
  const exportPageToPdf = async (pageUrl: string, fileName: string) => {
    if (!pageUrl) {
      setError("Page URL is required");
      return;
    }

    // Default filename if not provided
    const pdfFileName = fileName || "download";

    try {
      setIsExporting(true);
      setError("");

      // Construct the absolute URL if it's a relative path
      const absoluteUrl = pageUrl.startsWith("http")
        ? pageUrl
        : `${window.location.origin}${pageUrl}`;

      // Call the PDF generation API
      const test = await fetch("/api/generate-pdf", {
        method: "GET",
      });
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: absoluteUrl,
          fileName: pdfFileName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate PDF");
      }

      // Get the PDF blob from the response
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const a = document.createElement("a");
      a.href = url;
      a.download = `${pdfFileName}.pdf`;

      // Append to the document and click to download
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      console.error("Error exporting PDF:", err);
      setError(err.message || "Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportPageToPdf,
    isExporting,
    error,
  };
};

// Usage example component
export const PdfExportButton = ({
  pageUrl,
  fileName,
  buttonText = "Export PDF",
  className = "",
}: {
  pageUrl: string;
  fileName: string;
  buttonText?: string;
  className?: string;
}) => {
  const { exportPageToPdf, isExporting, error } = usePdfExport();

  return (
    <div>
      <button
        onClick={() => exportPageToPdf(pageUrl, fileName)}
        disabled={isExporting}
        className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        {isExporting ? "Processing..." : buttonText}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
