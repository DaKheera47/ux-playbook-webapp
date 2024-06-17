"use client";

import { useState } from "react";
import smileyImage from "@/public/smiley-o-meter.jpg";
import { TextQuestion } from "@/templates/TextQuestion";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type Props = {};

export default function SmileyPage({}: Props) {
  const [inputText, setInputText] = useState("");
  const [num, setNum] = useState(3);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const handleGeneratePDF = () => {
    setPdfUrl(null);

    fetch("/api/pdf-gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText, num, questions }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Revoke the previous object URL if it exists
        if (pdfUrl) {
          URL.revokeObjectURL(pdfUrl);
        }
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      });
  };

  return (
    <div className="flex flex-col space-y-12">
      <div className="flex w-96 flex-col justify-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-xl">List of questions</h1>

          <div>
            {questions
              ? questions.map((question, index) => (
                  <div
                    key={index + question.text}
                    className="flex items-center space-x-4"
                  >
                    <div>
                      {index + 1}. {question.text}
                    </div>
                    <div>{question?.description}</div>
                  </div>
                ))
              : null}
          </div>
        </div>

        <div className="space-y-2">
          <h1>Add Questions</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              setQuestions((prev) => {
                return [
                  ...prev,
                  {
                    text: inputText,
                    // description: `Smiley-o-meter: ${num}`,
                  },
                ];
              });
              setInputText("");
            }}
            className="flex space-x-2"
          >
            <Input
              type="text"
              required
              placeholder="Add your questions here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <Button type="submit">Add</Button>
          </form>
        </div>

        <div className="space-y-4">
          <h1>Smiley-o-meters: {num}</h1>
          <Slider
            min={1}
            max={5}
            step={1}
            value={[num]}
            onValueChange={(e) => setNum(Number(e[0]))}
          />
        </div>

        <div className="flex w-full justify-between">
          <Button onClick={handleGeneratePDF}>Generate PDF</Button>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download="generated.pdf"
              className={buttonVariants()}
            >
              Download PDF
            </a>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h1>RENDER PREVIEW</h1>

        <TextQuestion
          heading="List of questions"
          questions={questions}
          smileyImage={smileyImage.src}
        />
      </div>
    </div>
  );
}
