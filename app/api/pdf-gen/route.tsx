"use server"

import fs from "fs"
import path from "path"
import { TestReactSlider } from "@/templates/TestReactSlider"
import puppeteer from "puppeteer"

export async function POST(request: Request) {
  const { text, num } = await request.json()

  const { renderToString } = await import("react-dom/server")

  const html = renderToString(
    <TestReactSlider text={text} numberOfMeters={num} />
  )

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  })
  const page = await browser.newPage()

  // Read the generated Tailwind CSS
  const css = fs.readFileSync(
    path.resolve(process.cwd(), "public/tailwind.css"),
    "utf8"
  )

  const completeHtml = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body class="inter">${html}</body>
      </html>
    `

  fs.writeFileSync("public/test.html", completeHtml)

  await page.setContent(completeHtml, { waitUntil: "networkidle0" })

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  })

  await browser.close()

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=test.pdf",
    },
  })
}
