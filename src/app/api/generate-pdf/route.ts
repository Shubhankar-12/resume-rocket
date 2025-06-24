import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";

export const maxDuration = 60; // Max execution time in seconds

type RequestPayload = {
  url: string;
  fileName?: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { url, fileName }: RequestPayload = await request.json();

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    const pdfBuffer = await generatePdf(url);
    const processedPdf = await makeTextSelectable(pdfBuffer);

    return new NextResponse(processedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${
          fileName || "download"
        }.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { message: "Error generating PDF", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Generate a PDF from a URL
 */
async function generatePdf(url: string): Promise<Buffer> {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 1024 });

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    await page.evaluate(() => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach((img) => {
        img.setAttribute("loading", "eager");
      });

      document.fonts.ready;

      return new Promise<void>((resolve) => {
        if (document.readyState === "complete") {
          resolve();
        } else {
          window.addEventListener("load", () => resolve());
        }
      });
    });

    const totalHeight = await page.evaluate(() => {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
      preferCSSPageSize: true,
      height: `${totalHeight + 100}px`,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Optional post-processing to ensure text remains selectable
 */
async function makeTextSelectable(pdfBuffer: Buffer): Promise<Buffer> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const processedPdfBytes = await pdfDoc.save();
    return Buffer.from(processedPdfBytes);
  } catch (error) {
    console.error("Error processing PDF:", error);
    return pdfBuffer;
  }
}

// test route
export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
