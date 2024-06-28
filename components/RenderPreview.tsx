"use client";

import {
  $introductionQuestions,
  $isLandscape,
  $layout,
  $baseQuestions,
  $showIntroduction,
} from "@/stores/pdfOptions";
import { TextQuestion } from "@/templates/TextQuestion";
import { TextQuestionTable } from "@/templates/TextQuestionTable";
import { useStore } from "@nanostores/react";
import { PDFViewer } from "@react-pdf/renderer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

export default function RenderPreview({}: Props) {
  const baseQuestions = useStore($baseQuestions);
  const introductionQuestions = useStore($introductionQuestions);
  const isLandscape = useStore($isLandscape);
  const showIntroduction = useStore($showIntroduction);
  const layout = useStore($layout);

  return (
    <div className="flex h-screen w-3/5 flex-grow flex-col space-y-4 overflow-y-scroll px-4 py-12">
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
          <PDFViewer className="h-[calc(100vh-9rem)] w-full rounded">
            <TextQuestionTable
              heading="List of questions"
              introductionQuestions={introductionQuestions}
              baseQuestions={baseQuestions}
              landscape={isLandscape}
              showIntroduction={showIntroduction}
              fileId="1"
            />
          </PDFViewer>
        </TabsContent>

        <TabsContent value="question-then-smiley">
          <PDFViewer className="h-[calc(100vh-9rem)] w-full rounded">
            <TextQuestion
              heading="List of questions"
              baseQuestions={baseQuestions}
              introductionQuestions={introductionQuestions}
              showIntroduction={showIntroduction}
              landscape={isLandscape}
              fileId="1"
            />
          </PDFViewer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
