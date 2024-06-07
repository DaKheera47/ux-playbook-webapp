"use server"

import fs from "fs"
import path from "path"
import { TestReactSlider } from "@/templates/TestReactSlider"
import puppeteer from "puppeteer"

export async function POST(request: Request) {
  const { text } = await request.json()

  const { renderToString } = await import("react-dom/server")

  const html = renderToString(<TestReactSlider text={text} />)

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  })
  const page = await browser.newPage()
  let image: Buffer | string

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

  await page.setContent(completeHtml)

  const content = await page.$("body")
  if (content) {
    image = await content.screenshot({ omitBackground: true })
    if (!Array.isArray(image)) {
      await browser.close()
      return new Response(image, {
        headers: {
          "Content-Type": "image/png",
        },
      })
    } else {
      await browser.close()
      return new Response("Error", {
        status: 500,
      })
    }
  }

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  })
}
