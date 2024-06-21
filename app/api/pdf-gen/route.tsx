"use server";

import fs from "fs";
import path from "path";
import { TextQuestionTable } from "@/templates/TextQuestionTable";
import { renderToBuffer } from "@react-pdf/renderer";

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

interface RequestBody {
  baseQuestions: IQuestion[];
  introductionQuestions: IQuestion[];
  numUsers: number;
  ratingType: IRatingType;
  showIntroduction: boolean;
  layout: "landscape" | "portrait";
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
  } = body;

  console.log(
    baseQuestions,
    introductionQuestions,
    numUsers,
    ratingType,
    showIntroduction,
    layout
  );

  let base64Image;

  try {
    base64Image = getBase64Image(ratingType);
  } catch (error: any) {
    console.error(error.message);
  }

  const pdfBuffer = await renderToBuffer(
    <TextQuestionTable
      heading="List of questions"
      introductionQuestions={introductionQuestions}
      questions={baseQuestions}
      smileyImage={base64Image ?? ""}
      landscape={layout === "landscape"}
      showIntroduction={showIntroduction}
    />
  );

  // to make a pdf set, we need to make as many pdfs as there are users
  // combine them into a zip file
  // and then download the zip file
  // in each pdf, the pdf number should be displayed
  // the pdf's base questions should be randomized

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=test.pdf",
    },
  });
}
