"use client";

import smileyImage from "@/public/smiley-o-meter.jpg";
import thumbsImage from "@/public/thumbs.jpg";
import wordsImage from "@/public/words.jpg";
import {
  $isLandscape,
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
  const questions = useStore($questions);
  const isLandscape = useStore($isLandscape);
  const ratingType = useStore($ratingType);
  const showIntroduction = useStore($showIntroduction);

  const selectedImage = {
    smilies: smileyImage,
    thumbs: thumbsImage,
    words: wordsImage,
  }[ratingType];

  return (
    <div className="w-3/5 flex-grow">
      <Tabs defaultValue="table">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="table">Table View</TabsTrigger>

          <TabsTrigger value="question-then-smiley">
            Question Then Smiley
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <PDFViewer className="min-h-[80vh] w-full">
            <TextQuestionTable
              heading="List of questions"
              questions={questions}
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
              questions={questions}
              smileyImage={selectedImage.src}
              landscape={isLandscape}
            />
          </PDFViewer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
