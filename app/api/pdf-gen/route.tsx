"use server";

import fs from "fs";
import path from "path";
import { TestReactSlider } from "@/templates/TestReactSlider";
import { TextQuestion } from "@/templates/TextQuestion";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  const { questions } = await request.json();

  console.log(questions);

  const { renderToString } = await import("react-dom/server");

  const imagePath = path.resolve(process.cwd(), "public/smiley-o-meter.jpg");
  const imageData = fs.readFileSync(imagePath);
  const base64Image = `data:image/jpeg;base64,${imageData.toString("base64")}`;

  const html = renderToString(
    <TextQuestion
      heading="List of questions"
      questions={questions}
      smileyImage={base64Image}
    />
  );

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Read the generated Tailwind CSS
  const css = fs.readFileSync(
    path.resolve(process.cwd(), "public/tailwind.css"),
    "utf8"
  );

  const completeHtml = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body class="inter">${html}</body>
      </html>
    `;

  fs.writeFileSync("public/test.html", completeHtml);

  await page.setContent(completeHtml, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=test.pdf",
    },
  });
}
