"use server";

import fs from "fs";
import path from "path";
import { TextQuestion } from "@/templates/TextQuestion";
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
  baseQuestions: IBaseQuestion[];
  introductionQuestions: IBaseQuestion[];
  numUsers: number;
  showIntroduction: boolean;
  layout: ILayout;
  randomizeQuestions: boolean;
  isLandscape: boolean;
  randomizeAlgorithm: IRandomizeAlgorithm;
}

export async function POST(request: Request) {
  // Parse the JSON body
  const body: RequestBody = (await request.json()) as RequestBody;

  const {
    baseQuestions,
    introductionQuestions,
    numUsers,
    showIntroduction,
    layout,
    randomizeQuestions,
    randomizeAlgorithm,
    isLandscape,
  } = body;

  console.log(
    baseQuestions,
    introductionQuestions,
    numUsers,
    showIntroduction,
    layout
  );

  // ensure the randomization algorithm is valid
  if (!["random", "linear-down"].includes(randomizeAlgorithm)) {
    console.error("Invalid randomization algorithm");
    return new Response("Invalid randomization algorithm", { status: 400 });
  }

  // ensure the number of users is valid
  if (numUsers < 1) {
    console.error("Invalid number of users");
    return new Response("Invalid number of users", { status: 400 });
  }

  const pdfBuffers = [];
  const base64Buffer = {
    smilies: getBase64Image("smilies"),
    thumbs: getBase64Image("thumbs"),
    words: getBase64Image("words"),
  };

  for (let i = 0; i < numUsers; i++) {
    let questions = [...baseQuestions];

    if (randomizeQuestions) {
      const randomizableQuestions = questions.filter((q) => q.randomize);

      const randomizedQuestions = performRandomization(
        randomizableQuestions,
        randomizeAlgorithm,
        i
      );

      // read each question, and replace only the
      // randomized ones, leaving the "locked" ones as is
      questions = questions.map((q) =>
        !q.randomize
          ? q
          : randomizedQuestions.shift() ??
            // this should never happen, but we need to satisfy the type checker
            // because unshift() can return undefined
            ({
              text: "Invalid question",
              ratingType: "smilies",
            } as IBaseQuestion)
      );

      // check if there is any invalid question (should never happen)
      // if so return an error
      for (const q of questions) {
        if (q.text === "Invalid question") {
          console.error("Invalid question event in randomization");

          return new Response("Invalid question", { status: 500 });
        }
      }
    }

    const base64Data = questions.map((question) => {
      return base64Buffer[question.ratingType];
    });

    const Component = layout === "table" ? TextQuestionTable : TextQuestion;

    let pdfBuffer = await renderToBuffer(
      <Component
        heading="List of questions"
        baseQuestions={questions}
        introductionQuestions={introductionQuestions}
        landscape={isLandscape}
        showIntroduction={showIntroduction}
        imageBase64Data={base64Data}
        fileId={`${i + 1}`}
      />
    );

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
