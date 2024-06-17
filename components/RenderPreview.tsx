"use client";

import smileyImage from "@/public/smiley-o-meter.jpg";
import { $isLandscape, $questions } from "@/stores/pdfOptions";
import { TextQuestion } from "@/templates/TextQuestion";
import { useStore } from "@nanostores/react";
import { PDFViewer } from "@react-pdf/renderer";

type Props = {};

export default function RenderPreview({}: Props) {
  const questions = useStore($questions);
  const isLandscape = useStore($isLandscape);

  return (
    <div className="w-3/5 flex-grow">
      <h1>RENDER PREVIEW</h1>

      <PDFViewer className="min-h-[80vh] w-full">
        <TextQuestion
          heading="List of questions"
          questions={questions}
          smileyImage={smileyImage.src}
          landscape={isLandscape}
        />
      </PDFViewer>
    </div>
  );
}
