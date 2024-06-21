"use client";

import smileyImage from "@/public/smiley-o-meter.jpg";
import thumbsImage from "@/public/thumbs.jpg";
import wordsImage from "@/public/words.jpg";
import {
  $introductionQuestions,
  $isLandscape,
  $layout,
  $questions,
  $ratingType,
  $showIntroduction,
} from "@/stores/pdfOptions";
import { TextQuestion } from "@/templates/TextQuestion";
import { TextQuestionTable } from "@/templates/TextQuestionTable";
import { useStore } from "@nanostores/react";
import { PDFViewer } from "@react-pdf/renderer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

export default function RenderPreview({}: Props) {
  const baseQuestions = useStore($questions);
  const introductionQuestions = useStore($introductionQuestions);

  const isLandscape = useStore($isLandscape);
  const ratingType = useStore($ratingType);
  const showIntroduction = useStore($showIntroduction);
  const layout = useStore($layout);

  const selectedImage = {
    smilies: smileyImage,
    thumbs: thumbsImage,
    words: wordsImage,
  }[ratingType];

  return (
    <div className="w-3/5 flex-grow">
      <Tabs value={layout}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="table" onClick={() => $layout.set("table")}>
            Table View
          </TabsTrigger>

          <TabsTrigger
            value="question-then-smiley"
            onClick={() => $layout.set("question-then-smiley")}
          >
            Question Then Smiley
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <PDFViewer className="min-h-[80vh] w-full">
            <TextQuestionTable
              heading="List of questions"
              introductionQuestions={introductionQuestions}
              questions={baseQuestions}
              smileyImage={selectedImage.src}
              landscape={isLandscape}
              showIntroduction={showIntroduction}
            />
          </PDFViewer>
        </TabsContent>

        <TabsContent value="question-then-smiley">
          <PDFViewer className="min-h-[80vh] w-full">
            <TextQuestion
              heading="List of questions"
              questions={baseQuestions}
              introductionQuestions={introductionQuestions}
              showIntroduction={showIntroduction}
              smileyImage={selectedImage.src}
              landscape={isLandscape}
            />
          </PDFViewer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
