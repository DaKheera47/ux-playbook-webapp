"use server";

import fs from "fs";
import path from "path";
import { TextQuestionTable } from "@/templates/TextQuestionTable";
import { renderToBuffer } from "@react-pdf/renderer";
import archiver from "archiver";

function getBase64Image(ratingType: IRatingType) {
  let fileName;

  switch (ratingType) {
    case "smilies":
      fileName = "smiley-o-meter.jpg";
      break;
    case "thumbs":
      fileName = "thumbs.jpg";
      break;
    case "words":
      fileName = "words.jpg";
      break;
    default:
      throw new Error("Invalid rating type");
  }

  const imagePath = path.resolve(process.cwd(), "public", fileName);
  const imageData = fs.readFileSync(imagePath);
  return `data:image/jpeg;base64,${imageData.toString("base64")}`;
}

function performRandomization<T>(
  array: T[],
  algorithm: IRandomizeAlgorithm,
  i: number
): T[] {
  if (algorithm === "random") {
    return array.sort(() => Math.random() - 0.5);
  }

  if (algorithm === "linear-down") {
    const shiftAmount = i % array.length;
    return [...array.slice(shiftAmount), ...array.slice(0, shiftAmount)];
  }

  throw new Error("Invalid randomization algorithm");
}

interface RequestBody {
  baseQuestions: IQuestion[];
  introductionQuestions: IQuestion[];
  numUsers: number;
  ratingType: IRatingType;
  showIntroduction: boolean;
  layout: "landscape" | "portrait";
  randomizeQuestions: boolean;
  randomizeAlgorithm: IRandomizeAlgorithm;
}

export async function POST(request: Request) {
  // Parse the JSON body
  const body: RequestBody = (await request.json()) as RequestBody;

  const {
    baseQuestions,
    introductionQuestions,
    numUsers,
    ratingType,
    showIntroduction,
    layout,
    randomizeQuestions,
    randomizeAlgorithm,
  } = body;

  console.log(
    baseQuestions,
    introductionQuestions,
    numUsers,
    ratingType,
    showIntroduction,
    layout
  );

  // ensure the rating type is valid
  if (!["smilies", "thumbs", "words"].includes(ratingType)) {
    return new Response("Invalid rating type", { status: 400 });
  }

  // ensure the randomization algorithm is valid
  if (!["random", "linear-down"].includes(randomizeAlgorithm)) {
    return new Response("Invalid randomization algorithm", { status: 400 });
  }

  // ensure the number of users is valid
  if (numUsers < 1) {
    return new Response("Invalid number of users", { status: 400 });
  }

  let base64Image;

  try {
    base64Image = getBase64Image(ratingType);
  } catch (error: any) {
    console.error(error.message);
  }

  const pdfBuffers = [];
  // Cache to store rendered PDF buffers to avoid re-rendering
  const pdfCache = new Map();

  for (let i = 0; i < numUsers; i++) {
    const questions = randomizeQuestions
      ? performRandomization(baseQuestions, randomizeAlgorithm, i)
      : baseQuestions;

    // Serialize the questions for caching
    const questionsKey = JSON.stringify(questions);

    let pdfBuffer;

    if (pdfCache.has(questionsKey)) {
      // Retrieve from cache if possible
      pdfBuffer = pdfCache.get(questionsKey);
    } else {
      pdfBuffer = await renderToBuffer(
        <TextQuestionTable
          heading="List of questions"
          introductionQuestions={introductionQuestions}
          questions={questions}
          smileyImage={base64Image ?? ""}
          landscape={layout === "landscape"}
          showIntroduction={showIntroduction}
        />
      );

      // Store in cache for future use
      pdfCache.set(questionsKey, pdfBuffer);
    }

    pdfBuffers.push(pdfBuffer);
  }

  // Create a zip file
  const zip = archiver("zip", {
    zlib: { level: 9 }, // Set the compression level
  });

  // Create a writable stream for the zip file
  const zipBuffers: Buffer[] = [];
  zip.on("data", (chunk: Buffer) => zipBuffers.push(chunk));

  for (let i = 0; i < pdfBuffers.length; i++) {
    zip.append(pdfBuffers[i], { name: `file${i + 1}.pdf` });
  }

  // Finalize the zip file
  await zip.finalize();

  return new Response(Buffer.concat(zipBuffers), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=documents.zip",
    },
  });
}
