import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";

export const config = {
  api: {
    responseLimit: "50mb",
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { url, fileName } = req.body as { url: string; fileName?: string };

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const pdfBuffer = await generatePdf(url);
    const processedPdf = await makeTextSelectable(pdfBuffer);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName || "download"}.pdf"`
    );

    return res.send(processedPdf);
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return res
      .status(500)
      .json({ message: "Error generating PDF", error: error.message });
  }
}

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

    await page.evaluate(async () => {
      const images = Array.from(document.querySelectorAll("img"));
      await Promise.all(
        images.map((img) => {
          img.setAttribute("loading", "eager");
          return img.decode().catch(() => {});
        })
      );

      return new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve());
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
      width: "1280px",
      height: `${totalHeight + 100}px`,
      printBackground: true,
      scale: 0.8,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

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
