"use client";

import smileyImage from "@/public/smiley-o-meter.jpg";
import { $isLandscape, $questions } from "@/stores/pdfOptions";
import { TextQuestion } from "@/templates/TextQuestion";
import { TextQuestionTable } from "@/templates/TextQuestionTable";
import { useStore } from "@nanostores/react";
import { PDFViewer } from "@react-pdf/renderer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

export default function RenderPreview({}: Props) {
  const questions = useStore($questions);
  const isLandscape = useStore($isLandscape);

  return (
    <div className="w-3/5 flex-grow">
      <Tabs defaultValue="table">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="table">Table</TabsTrigger>

          <TabsTrigger value="question-then-smiley">
            Question Then Smiley
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <PDFViewer className="min-h-[80vh] w-full">
            <TextQuestionTable
              heading="List of questions"
              questions={questions}
              smileyImage={smileyImage.src}
              landscape={isLandscape}
            />
          </PDFViewer>
        </TabsContent>

        <TabsContent value="question-then-smiley">
          <PDFViewer className="min-h-[80vh] w-full">
            <TextQuestion
              heading="List of questions"
              questions={questions}
              smileyImage={smileyImage.src}
              landscape={isLandscape}
            />
          </PDFViewer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
